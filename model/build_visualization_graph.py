from tensorflow import layers
import warnings

from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
import argparse
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

import convert_data_transform_to_pca_vector as pca
import tsne as ts
import visualization as vi
import raw_to_fourier as fr
import data_window_size as cut
import warnings

from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.preprocessing import StandardScaler

from tensorflow import keras


warnings.simplefilter(
    action='ignore', category=FutureWarning)  # FutureWarning 제거

parser = argparse.ArgumentParser(
    description='raw data를 입력시 푸리에변환을 거친 PCA와 t-sne 결과를 보여주는 모듈')
parser.add_argument('raw_data_path', help='raw data path(.csv)')
parser.add_argument('fs', help='sampling frequency (hz unit)')

args = parser.parse_args()
# df = pd.read_csv(args.raw_data_path)
all_dataset = np.loadtxt(args.raw_data_path, delimiter=',')
# all_dataset 만개씩 짤라서 8개의 데이터셋을 list에 저장함
index_list = list(range(0, 80001, 1250))
dataset_list = []
for idx in range(1, len(index_list)):
    dataset_list.appen(
        all_dataset[index_list[idx-1]: index_list[idx]]
    )

fr_dataset = []
for dataset in dataset_list:
    normal_dataset = dataset[:, 0]
    abnormal_dataset = dataset[:, 1]
    freq = fr.fs_to_freq(n=1250, fs=args.fs)
    fr_normal = fr.raw_to_fourier(normal_dataset)
    fr_abnormal = fr.raw_to_fourier(abnormal_dataset)
    fr_dataset.append([fr_normal, fr_abnormal])
fr_dataset = np.array(fr_dataset)


fr_normal_dataset = fr_dataset[:, 0, :]
fr_abnormal_dataset = fr_dataset[:, 1, :]

range_list = list(range(0, 65, 8))
normal_dataset = []
abnormal_dataset = []
for idx in range(1, len(range_list)):
    start = range_list[idx-1]
    end = range_list[idx]
    normal_dataset_instances = fr_normal_dataset[start:end, :]
    abnormal_dataset_instances = fr_abnormal_dataset[start:end, :]

    normal_dataset.append(normal_dataset_instances)
    abnormal_dataset.append(abnormal_dataset_instances)

normal_dataset = np.concatenate(normal_dataset, axis=1)
abnormal_dataset = np.concatenate(abnormal_dataset, axis=1)

print(normal_dataset.shape)
print(abnormal_dataset.shape)
all_dataset = np.concatenate(
    [normal_dataset, abnormal_dataset], axis=1)

all_df = pd.DataFrame(all_dataset.T, columns=list(range(0, 8)))
all_df["label"] = 0
all_df["label"][5000:] = 1


# MLP solution
# x_train_all, x_test, y_train_all, y_test = \
#     train_test_split(all_df.iloc[:, 0: 8], all_df["label"], test_size=0.2,
#                      random_state=42)  # 훈련 데이터와 테스트 데이터 분류

# scaler = StandardScaler()   # 객체 만들기
# scaler.fit(x_train_all)     # 변환 규칙을 익히기
# x_train_scaled = scaler.transform(x_train_all)  # 데이터를 표준화 전처리
# x_test_scaled = scaler.transform(x_test)

# mlp = MLPClassifier(hidden_layer_sizes=(10, 128, 256,), activation='logistic',
#                     solver='sgd', alpha=0.01, batch_size=32,
#                     learning_rate_init=0.1, max_iter=500)  # 객체 생성

# mlp.fit(x_train_scaled, y_train_all)    # 훈련하기
# print(mlp.score(x_test_scaled, y_test))      # 정확도 평가

# pca = PCA(n_components=2)  # 주성분을 몇개로 할지 결정
# pca_features = pca.fit_transform(all_df.iloc[:, 0: 8])
# pca_df = pd.DataFrame(data=pca_features, columns=[
#     'component1', 'component2'])
# pca_df["label"] = all_df["label"]
# print(pca_df)


# Autoencoder solution


x_train_all, x_test, y_train_all, y_test = \
    train_test_split(all_df.iloc[:, 0: 8], all_df["label"], test_size=0.2,
                     random_state=42)  # 훈련 데이터와 테스트 데이터 분류

# 32 floats -> compression of factor 24.5, assuming the input is 784 floats
encoding_dim = 32

input_img = keras.Input(shape=(8,))
encoded = layers.Dense(encoding_dim, activation='relu')(input_img)
decoded = layers.Dense(8, activation='sigmoid')(encoded)
autoencoder = keras.Model(input_img, decoded)

encoder = keras.Model(input_img, encoded)

encoded_input = keras.Input(shape=(encoding_dim,))
# Retrieve the last layer of the autoencoder model
decoder_layer = autoencoder.layers[-1]
# Create the decoder model
decoder = keras.Model(encoded_input, decoder_layer(encoded_input))

autoencoder.compile(optimizer='adam', loss='binary_crossentropy')

autoencoder.fit(x_train_all, x_train_all,
                epochs=50,
                batch_size=256,
                shuffle=True,
                validation_data=(x_test, x_test))

encoded_x_train = encoder.predict(x_train_all)
decoded_x_train = decoder.predict(encoded_x_train)

encoded_x_test = encoder.predict(x_test)

mlp = MLPClassifier(hidden_layer_sizes=(64, 128, 256, 64), activation='logistic',
                    solver='sgd', alpha=0.01, batch_size=32,
                    learning_rate_init=0.1, max_iter=500)  # 객체 생성

mlp.fit(encoded_x_train, y_train_all)    # 훈련하기
print(mlp.predict(encoded_x_test))
print(mlp.score(encoded_x_test, y_test))      # 정확도 평가

# 2차원 t-SNE 임베딩
# viz_features = TSNE(n_components=2).fit_transform(all_df.iloc[:, 0: 8])
# viz_df = pd.DataFrame(data=viz_features, columns=[
#     'component1', 'component2'])
# viz_df["label"] = all_df["label"]
# sns.set_style('whitegrid')
# ax = sns.scatterplot(data=viz_df, x='component1', y='component2', hue='label')
# plt.show()

# # --- tsne visualization ---
# fig = plt.figure(figsize=(8, 8))
# tsts = ts.tsne(inpca, components=2)
# vi.visualization(fig, tsts)
