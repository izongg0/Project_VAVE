def generate_data_features(data, window_size):
    result = pd.DataFrame()

    for i in range(int(len(data)/window_size)):
        temp = pd.DataFrame(
            data[window_size*i:window_size*(i+1)]).reset_index(drop=True)
        result = pd.concat([result, temp], axis=1).rename(
            columns={data.name: 'f' + str(i)})

    return result


def merge_data(top_data, bottom_data):
    result = pd.concat([top_data, bottom_data], axis=0).reset_index(drop=True)
    return result
