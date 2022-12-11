<<<<<<< HEAD
def visualization(data):
<<<<<<< HEAD
  data['target'] = 'Normal'
  data['target'].iloc[int(len(data)/2):] = 'Abnormal'
  
  fig = plt.figure(figsize = (8, 8))
  ax = fig.add_subplot(1, 1, 1)
  ax.set_xlabel('Component 1', fontsize = 15)
  ax.set_ylabel('Component 2', fontsize = 15)
  ax.set_title('2 component', fontsize=20)

  targets = ['Normal', 'Abnormal']
  colors = ['r', 'b']

  for target, color in zip(targets,colors):
      indicesToKeep = data['target'] == target
      ax.scatter(data.loc[indicesToKeep, 'component1']
                , data.loc[indicesToKeep, 'component2']
                , c = color
                , s = 50)

  ax.legend(targets)
  ax.grid()
=======
=======
import matplotlib.pyplot as plt


def visualization(fig, data):
>>>>>>> f514b382ca4787aed938743803cc3f94e622bae0
    data['target'] = 'Normal'
    data['target'].iloc[int(len(data)/2):] = 'Abnormal'

    ax = fig.add_subplot(1, 1, 1)
    ax.set_xlabel('Component 1', fontsize=15)
    ax.set_ylabel('Component 2', fontsize=15)
    ax.set_title('2 component', fontsize=20)

    targets = ['Normal', 'Abnormal']
    colors = ['r', 'b']

    for target, color in zip(targets, colors):
        indicesToKeep = data['target'] == target
        ax.scatter(data.loc[indicesToKeep, 'component1'],
                   data.loc[indicesToKeep, 'component2'], c=color, s=50)

    ax.legend(targets)
    ax.grid()
>>>>>>> e3f54686e56b62711c38d5f4c64d4563c49ad80b
