import pandas as pd


def generate_data_features(data, window_size):
    result = pd.DataFrame()

    for i in range(int(len(data)/window_size)):
        temp = pd.DataFrame(
            data[window_size*i:window_size*(i+1)]).reset_index(drop=True)
        result = pd.concat([result, temp], axis=1).rename(
            columns={data.name: 'f' + str(i)})

    return result


def merge_ndarray_to_DF(list_data, axis=1):
    result = pd.DataFrame()

    for array in list_data:
        temp = pd.DataFrame(array)
        result = pd.concat([temp, result], axis=axis)

    return result
