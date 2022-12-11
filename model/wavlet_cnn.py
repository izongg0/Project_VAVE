import pywt
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import tensorflow as tf
import argparse

from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.layers import Conv2D, MaxPooling2D

parser = argparse.ArgumentParser(
    description='raw data를 입력시 웨이블릿 변환을 거쳐 cnn결과를 보여주는 모듈')
parser.add_argument('raw_data_path', help='raw data path(.csv)')
parser.add_argument('wavlet_img_dirname', help='wavlet img directory name')
parser.add_argument('wavlet_type', help='wavlet type ex) morl,gaus ')

parser.add_argument('split_size', help='split size') # 위에서 받은 데이터가 10000개고, split_size를 1250으로 받으면 사진 노말8개 앱노말 8개 나옴.
#사이즈 나누는 자동화함수 쓸거면 뭔가 없어도 될거같기도 ?


args = parser.parse_args()

data = pd.read_csv(args.raw_data_path)
df = data.dropna()

train_data = df[:60000] # 이거 자동화? 나중에 수정
test_data = df[60000:80000]

def wavelet(data,n,wavelet_type):
    coefs_list=[]
    coefs_ab_list=[]
    num_steps = len(data)

    for i in range(0,num_steps,n):
        y = np.array(data['Normal'])[i:i+n]
        y_ab = np.array(data['Abnormal'])[i:i+n]

        scales = np.arange(1,n+1)

        coefs, freqs = pywt.cwt(y, scales, wavelet_type)
        coefs_ab, freqs_ab = pywt.cwt(y_ab, scales, wavelet_type)

        coefs_list.append(coefs)
        coefs_ab_list.append(coefs_ab)

    return coefs_list, coefs_ab_list


train_nor_coef , train_abnor_coef = wavelet(train_data,args.split_size,args.wavlet_type)
test_nor_coef , test_abnor_coef = wavelet(test_data,args.split_size,args.wavlet_type)


def create_directory(create_dir_name): # 이미지 저장할 폴더 이름 입력받으면 폴더 생성해줌. 그리고 그 폴더 안에 train,test폴더 만들고 각각에 nor,abnor 폴더 만듬.
    base_dir = f'./wavlet_img/{create_dir_name}'

    train_nor_dir = f'{base_dir}/train/nor'
    train_abnor_dir = f'{base_dir}/train/abnor'
    test_nor_dir = f'{base_dir}/test/nor'
    test_abnor_dir = f'{base_dir}/test/abnor'
    print(test_nor_dir)
    try:
        if not os.path.exists(train_nor_dir): # 이미 폴더가 존재하는지 안하는지 확인해줌
            os.makedirs(train_nor_dir)
            os.makedirs(train_abnor_dir)
            os.makedirs(test_nor_dir)
            os.makedirs(test_abnor_dir)

    except OSError:
        print ('Error: Creating directory. ' +  train_nor_dir)

create_directory(args.wavlet_img_dirname)

def show_plot(nor, abnor):
    n = len(nor)

    for i in range(0,n):
        plt.matshow(nor[i])
        plt.title("Normal")
        plt.savefig(f'./wavlet_img/{args.wavlet_img_dirname}/train/nor/train_wav_nor'+str(i+1)+'.jpg')
        plt.show()
        plt.matshow(abnor[i])
        plt.title("Abnormal")
        plt.savefig(f'./wavlet_img/{args.wavlet_img_dirname}/train/abnor/train_wav_abnor'+str(i+1)+'.jpg')
        plt.show()

def test_show_plot(nor, abnor): # train데이터랑 test 데이터일때 각각 사진 저장하는 폴더가 달라야해서.. 일단.. 그냥 하나 더 만들어봄..
    n = len(nor)

    for i in range(0,n):
        plt.matshow(nor[i])
        plt.title("Normal")
        plt.savefig(f'./wavlet_img/{args.wavlet_img_dirname}/test/nor/train_wav_nor'+str(i+1)+'.jpg')
        plt.show()
        plt.matshow(abnor[i])
        plt.title("Abnormal")
        plt.savefig(f'./wavlet_img/{args.wavlet_img_dirname}/test/abnor/train_wav_abnor'+str(i+1)+'.jpg')
        plt.show()

show_plot(train_nor_coef, train_abnor_coef)
test_show_plot(test_nor_coef,test_abnor_coef)

# 웨이블릿 후 사진저장까지 끝
# CNN 시작

# 각각 경로들 변수에 넣어놓기
base_dir = f'./wavlet_img/{args.wavlet_img_dirname}'

train_dir = os.path.join(base_dir, 'train')
test_dir = os.path.join(base_dir, 'test')

train_nor_dir = os.path.join(train_dir, 'nor')
train_abnor_dir = os.path.join(train_dir, 'abnor')
print(train_nor_dir)
print(train_abnor_dir)

test_nor_dir = os.path.join(test_dir, 'nor')
test_abnor_dir = os.path.join(test_dir, 'abnor')
print(test_nor_dir)
print(test_abnor_dir)

# 각각 폴더안에 있는 이미지 이름 리스트 생성 후 개수 세기.
train_nor_name = os.listdir(train_nor_dir)
train_abnor_name = os.listdir(train_abnor_dir)
print(train_nor_name)
print(train_abnor_name)
print("정상 데이터 개수 : ",len(train_nor_name))
print("비정상 데이터 개수 : " ,len(train_abnor_name))

# 모델 구성하기
model = tf.keras.models.Sequential([
  tf.keras.layers.Conv2D(16, (3,3), activation='relu', input_shape=(150, 150, 3)),
  tf.keras.layers.MaxPooling2D(2,2),
  tf.keras.layers.Conv2D(32, (3,3), activation='relu'),
  tf.keras.layers.MaxPooling2D(2,2),
  tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
  tf.keras.layers.MaxPooling2D(2,2),
  tf.keras.layers.Flatten(),
  tf.keras.layers.Dense(512, activation='relu'),
  tf.keras.layers.Dense(1, activation='sigmoid')
])

model.summary()

# 모델 컴파일
model.compile(optimizer=RMSprop(lr=0.001),
            loss='binary_crossentropy',
            metrics = ['accuracy'])

# 이미지 데이터 전처리
train_datagen = ImageDataGenerator( rescale = 1.0/255. )
test_datagen  = ImageDataGenerator( rescale = 1.0/255. )

train_generator = train_datagen.flow_from_directory(train_dir,batch_size=16,
                                                      class_mode='binary', target_size=(150, 150))
test_generator =  test_datagen.flow_from_directory(test_dir,batch_size=16,
                                                      class_mode  = 'binary',target_size = (150, 150))

# 학습 시키기
# history = model.fit(train_generator,
#                     validation_data=test_generator,
#                     steps_per_epoch=16,
#                     epochs=50,
#                     validation_steps=50,
#                     verbose=2)
history = model.fit(train_generator,
                    validation_data=test_generator,
                    epochs=50)

# 손실과 정확도 시각화
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

epochs = range(len(acc))

plt.plot(epochs, acc, 'bo', label='Training accuracy')
plt.plot(epochs, val_acc, 'b', label='Validation accuracy')
plt.title('Training and validation accuracy')
plt.legend()

plt.figure()

plt.plot(epochs, loss, 'go', label='Training Loss')
plt.plot(epochs, val_loss, 'g', label='Validation Loss')
plt.title('Training and validation loss')
plt.legend()

plt.show()

