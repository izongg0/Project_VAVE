from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import sys
sys.path.append("../model")

from .database import engine

import raw_to_fourier as fr
import pandas as pd

from tensorflow.keras import layers
from tensorflow import keras

from pathlib import Path

from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

from scipy.stats import mode

import pickle

import tensorflow as tf

import warnings
warnings.simplefilter(
    action='ignore', category=FutureWarning)  # FutureWarning 제거

app = FastAPI()

@app.post('/')
def load_model(model_path):
    target_file = Path(model_path)
    loaded_model = pickle.load(open(target_file, 'rb'))
    return loaded_model

def get_result_of_pca(all_df):
    pca_tsne = load_model("pickle_model/pca_t-sne_model.pkl")

    # PCA solution
    pca = PCA(n_components=3)  # 주성분을 몇개로 할지 결정
    pca_features = pca.fit_transform(all_df.iloc[:, 0: 8])
    pca_df = pd.DataFrame(data=pca_features, columns=[
        'component1', 'component2', 'component3'])

    # 2차원 t-SNE 임베딩
    viz_features = TSNE(n_components=2).fit_transform(pca_df.iloc[:, 0: 3])
    viz_df = pd.DataFrame(data=viz_features, columns=[
        'component1', 'component2'])

    pca_y = pca_tsne.predict(viz_df)

    return pca_y

def get_result_of_auto(all_df):
    auto_model = load_model("pickle_model/auto_mlp.pkl")
    MODEL = tf.keras.models.load_model('pickle_model/auto_encoder')
    encoded_x_train = MODEL.predict(all_df)

    auto_y = auto_model.predict(encoded_x_train)

    return auto_y

class Data(BaseModel):
  data: List[float]

@app.post("/data/")

async def create_item(data: Data):
    dt = data.data
    all_dataset = dt

    fr_data_return = fr.raw_to_fourier(all_dataset)
    fr_data_list = fr_data_return.tolist()
    freq = fr.fs_to_freq(n=80000, fs=1000)
    freq = freq.tolist()

    index_list = list(range(0, 80001, 1250))
    dataset_list = []
    for idx in range(1, len(index_list)):
        dataset_list.append(
            all_dataset[index_list[idx-1]: index_list[idx]]
        )

    fr_dataset = []
    for dataset in dataset_list:
        fr_data = fr.raw_to_fourier(dataset)
        fr_dataset.append(fr_data)

    fr_dataset = np.array(fr_dataset)

    range_list = list(range(0, 65, 8))
    dataset = []
    for idx in range(1, len(range_list)):
        start = range_list[idx-1]
        end = range_list[idx]
        dataset_instances = fr_dataset[start:end, :]
        dataset.append(dataset_instances)
    dataset = np.concatenate(dataset, axis=1)

    all_df = pd.DataFrame(dataset.T, columns=list(range(0, 8)))
    pca_result = get_result_of_pca(all_df)
    if mode(pca_result).mode == 1:
      pca_result = "abnormal"
    else:
      pca_result = "normal"

    auto_result = get_result_of_auto(all_df)
    if mode(auto_result).mode == 1:
      auto_result = "abnormal"
    else:
      auto_result = "normal"

    fourier_freq_data = []

    for i in range(len(fr_data_list)):
      fourier_freq_data.append((freq[i], fr_data_list[i]))

    return {"pca":pca_result, "auto":auto_result, "fourier_freq":fourier_freq_data}