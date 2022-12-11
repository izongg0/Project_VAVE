from sklearn.manifold import TSNE
import pandas as pd


def tsne(data, components=2):
    tsne = TSNE(n_components=components)
    tsne = tsne.fit_transform(data)
    tsne_df = pd.DataFrame(data=tsne, columns=[
                           'component' + str(i+1)for i in range(components)])
    return tsne_df
