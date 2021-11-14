import pickle
import pandas as pd
import numpy as np
import tensorflow as tf
from text_processing import *



# load model
model = tf.keras.models.load_model('bilstm_model.h5')

# load tokenizer
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# text preprocessing pipeline 
# using functions from text_processing.py
def text_processing_pipeline(X):
    X_lower = str(X).lower()
    X_stripped = X_lower.strip()
    X_tokenized = tokenize(X_stripped)
    #X_correct = spell_correct(X_tokenized)
    X_removed = remove_stopwords(X_tokenized)
    X_removed = remove_punctuation(X_removed)
    X_stemmed = porter_stem(X_removed)
    X_lemmatized = lemmatize(X_stemmed)
    return X_lemmatized

# handle input text and output sentiment label
# 4 - positive; 2 - neutral; 0 - negtive
def predict(X):
    X_processed = text_processing_pipeline(X)
    # loading
    X_vectored = tokenizer.texts_to_sequences(np.array(X_processed))
    # Trim data with defined input length
    X_padded = tf.keras.preprocessing.sequence.pad_sequences(X_vectored, MAX_LENGTH,padding='post',
                                                         truncating='post')
    pred = model.predict(X_padded)
    if pred[0][0] >= 0.8:
        return 4
    elif pred[0][0] >= 0.60:
        return 3
    elif pred[0][0] >= 0.40:
        return 2
    elif pred[0][0] >= 0.20:
        return 1
    elif pred[0][0] >= 0.20:
        return 0
    else:
        return 2

#print(predict('I like the game.'))