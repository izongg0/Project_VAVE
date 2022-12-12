from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import sys
sys.path.append("../model")
import raw_to_fourier as fr

import pandas as pd
# import raw_to_fourier as fr

app = FastAPI()

class Data(BaseModel):
    data: List[float] 
    

@app.post("/data/")
async def create_item(data: Data):
    dt = data.data

    all_dataset = dt
    index_list = list(range(0, 80001, 1250))
    dataset_list = []
    for idx in range(1, len(index_list)):
        dataset_list.append(
            all_dataset[index_list[idx-1]: index_list[idx]]
        )

    fr_dataset = []
    for dataset in dataset_list:
        freq = fr.fs_to_freq(n=1250, fs=1000)
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
    all_df

    print(all_df)



    #with open("pca_tsne.pkl", "rb") as fr:
    #    a = pickle.load(fr)
    #    print(data)
    return {"Hello": "World"}