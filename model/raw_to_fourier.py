import numpy as np


def fs_to_freq(n, fs):
<<<<<<< HEAD
=======

>>>>>>> b9a63e57993ac14b4e666c332455aef270c63cad
    k = np.arange(n)
    Fs = int(fs)
    T = n/Fs
    freq = k/T
    freq = freq[range(int(n/2))]

    return freq


def raw_to_fourier(wav_np):
    signal = np.fft.fft(wav_np) / len(wav_np)
    signal = signal[range(int(len(signal)/2))]
    signal = abs(signal) ** 2

    # fft_lst = []

    # iter = len(df.columns)
    # n = len(df)

    # for i in range(iter):

    #     df_col = df.iloc[:, [i]]
    #     Y = np.fft.fft(df_col)/n
    #     Y = Y[range(int(n/2))]
    #     abs_Y = abs(Y) ** 2
    #     fft_lst.append(abs_Y)

    return signal
<<<<<<< HEAD
=======

>>>>>>> b9a63e57993ac14b4e666c332455aef270c63cad
