# Two stage imbalance medical image classification
## Summary
This repository is based on this [repo](https://github.com/agaldran/balanced_mixup)
and it contains the code accompanying the paper:
```
Balanced-MixUp for Highly Imbalanced Medical Image Classification
Adrian Galdran, Gustavo Carneiro, Miguel A. González Ballester
MICCAI 2021
```
Link: [https://arxiv.org/abs/2109.09850](https://arxiv.org/abs/2109.09850)

Balanced MixUp is a relatively simple approach to perform classification on imbalanced data scenarios. It combines MixUp with conventional data sampling techniques. Briefly speaking, the idea is to sample a training data batch with minority class oversampling, another one without it, and then mix them up, normally giving more weight to the non-oversampled batch to avoid overfitting. In the paper we show that this approach improves performance for retinal image grading and endoscopic image classification.

The above idea has been implemented in this repository in Pytorch; the logic for data loading in the way described above can be found in `utils/get_loaders.py`, lines 90-178, and if you want to check how I mix up those two batches you can look into `train_lt_mxp.py`, lines 128-138.

## Re-balancing methods
Apart from balanced-mixup and re-sampling methods that introducded by this [paper](https://arxiv.org/abs/2109.09850). We also added the following methods to try to tackle the long-tail classification problem.
### Re-weighting
| Re-weighting Methods | 
| :---:   |
| Balanced Softmax Cross Entropy|
| Class Dependent Temperature |

We chose these two re-weighting methods based on the results on CIFAR-10 and CIFAR-100 datasets with imbalance factors comopared with other re-weighting methods.

### Two-stage classifers
Apart from re-balancing the datasets for a better performance for the minority classes, we also want to maintain the good features of the majority classes. Therefore, we used the two-stage classifers.
In the first stage, simply train the model with the baseline (instance re-sampling) to get to good features of the majority classes, then in the second stage, you need to train the model again with another methods and lower learing rate with bigger epoch.

## Datasets
Eyepacs datasets can be donwloaded from Kaggle*. A pre-processed version ready to use can be found [here](https://www.kaggle.com/agaldran/eyepacs). For the endoscopic dataset (Kvasir), simply running `sh get_endo_data.sh`. 

## Training
Once you have the data ready, check the `run_lt_experiments.sh` file to see how to reproduce the experiments in the paper (for the mobilenet architecture). Note that the hyperparameter $alpha$ in the paper corresponds to the input parameter `do_mixup` in the code, *e.g.* you could call:
```
python train_lt_mxp.py --do_mixup 0.1 --save_path eyepacs/mxp_1e-1/mobilenet --model_name mobilenetV2 --n_epochs 30 --metric kappa
```

## Testing
Once you have the model ready you could run the following to test:
For endo
```
python test_with_labels_endo.py --load_path 'your path to save the model' --model_name mobilenetV2  --csv_val 'path to val data csv'
```
For eyepacs
```
python test_with_labels_endo.py --load_path 'your path to save the model' --model_name mobilenetV2  --csv_val 'path to val data csv'
```

\* Install kaggle datasets API and use it to get Eyepacs data in place by running:
```
pip install kaggle
kaggle datasets download agaldran/eyepacs
mkdir data
unzip eyepacs.zip -d data/
rm eyepacs.zip
```
