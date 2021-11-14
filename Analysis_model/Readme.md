# Readme.md for model training and predicting

## Getting start

IS5452, Group6, Emotional 3D avatar visualization using sentiment analysis model 

## Environment requirements

Python: 3.8+
Tensorflow: 2.0
To install/check Python3: 
- official guide: https://www.python.org/downloads/
- Mac OS/linux : 
    - Check the Python3 version: $ python3 --version
    - Ubuntu install:
    `$ sudo apt-get update`
    `$ sudo apt-get install python3.8 python3-pip`
    - Mac OS install: `brew install python` or follow the official guide


To check or install all the required libraries: `pip install -r requirements.txt`

## Download dataset and required model file

Note1: We will not publish data here, so we only include a small sample here: 'sentiment140_with_neutral_sample.csv'

Note2: Due to the size limit, for transformer model, you can download the model file here:
https://huggingface.co/finiteautomata/bertweet-base-sentiment-analysis

After downloading, you can put the pytorch_model.bin in transformer_bertweet/finiteautomate folder

Note3: BiLSTM model uses the pretrained GloVe embedding. Due to the size limit, if you want to run sentiment140_bilstm.ipynb, you can download the glove.6B.100d.txt here, and put it in the same folder with sentiment140_bilstm.ipynb: https://www.kaggle.com/danielwillgeorge/glove6b100dtxt

## Description of files:

code file:
- extract_neutral_tweets.ipynb: extract neutral tweets in the dataset in Kaggle (https://www.kaggle.com/abhi8923shriv/sentiment-analysis-dataset?select=train.csv)
- sentiment140_combine neutral.ipynb: combine Sentiment140 with the neutral tweets dataset
- sentiment140_bilstm.ipynb: Train and test BiLSTM model for Sentiment140
    - containing the model structure, the NLP processing, and the output in training and testing

folder:
- model weights: the saved model weights for BiLSTM model
- bilstm_model: the text processing and predicting files to predict sentiment using BiLSTM model
    - sentiment_predict.py: run prediction with text input in main
- transformer_bertweet: the text processing and predicting files to predict sentiment using transformer model
    - pretrained_model_predict.py: run prediction with text input in main
    - pretrained_model_predict_2.py: run prediction with text input in main (second method, use pysentimiento)




