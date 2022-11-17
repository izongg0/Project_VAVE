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
warnings.simplefilter(
    action='ignore', category=FutureWarning)  # FutureWarning 제거

parser = argparse.ArgumentParser(
    description='raw data를 입력시 푸리에변환을 거친 PCA와 t-sne 결과를 보여주는 모듈')
parser.add_argument('raw_data_path', help='raw data path(.csv)')
parser.add_argument('fs', help='sampling frequency (hz unit)')

args = parser.parse_args()
data = pd.read_csv(args.raw_data_path)
df = data.dropna()


# 데이터 자르는 개수 (10000, 1250), train/test 데이터 개수 결정 필요

# for i in df.columns:
#   print(i)
noraks = cut.generate_data_features(df['Normal'], 10000)
fn = noraks["f0"]  # 총 80000개로 돌리는 코드 작성 필요
abnoraks = cut.generate_data_features(df['Abnormal'], 10000)
fa = abnoraks["f0"]

testnor = cut.generate_data_features(fn, 1250)
testab = cut.generate_data_features(fa, 1250)
# 기존 데이터, 그래프 시각화 함수 출력 필요

# --- Fourier ---
freq = fr.fs_to_freq(n=len(testnor), fs=args.fs)

res = fr.raw_to_fourier(testnor)
abres = fr.raw_to_fourier(testab)
# # 푸리에변환 이후, 그래프 시각화 함수 출력 필요

no_result = cut.merge_ndarray_to_DF(res)
ab_result = cut.merge_ndarray_to_DF(abres)

inpca = pd.concat([no_result, ab_result], axis=0).reset_index(drop=True)
total_sum = inpca.sum(axis=0).sum(axis=0)
inpca = inpca/(2*total_sum)

# # --- PCA visualization ---
fig = plt.figure(figsize=(8, 8))
asb = pca.pca(inpca)
vi.visualization(fig, asb)

# --- tsne visualization ---
fig = plt.figure(figsize=(8, 8))
tsts = ts.tsne(inpca, components=2)
vi.visualization(fig, tsts)
