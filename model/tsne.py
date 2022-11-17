def tsne(data,components = 2):
    tsne = TSNE(components = components)# 주성분을 몇개로 할지 결정
    tsne = tsne.fit_transform(data)
    for i in range(components):
        tsne_df = pd.DataFrame(tsne, columns = ['component' + str(i)])
    return tsne_df
    