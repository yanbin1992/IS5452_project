import pickle
import pandas as pd
import numpy as np
import nltk
#from spellchecker import SpellChecker
import tensorflow as tf

# params
MAX_TOKENS = 50000
MAX_LENGTH = 50

def tokenize(text):
    # tokenization (split text into tokens)
    # method: nltk.treebank
    treebank = nltk.tokenize.TreebankWordTokenizer()
    return treebank.tokenize(str(text))

def spell_correct(text):
    # check and correct typos using spellchecker
    #spell = SpellChecker()
    #corrected_words = [spell.correction(word) for word in text]
    return text

nltk.download('stopwords')
def remove_stopwords(text):
    en_stopwords=nltk.corpus.stopwords.words('english')
    text_without_stopwords = [word for word in text if word not in en_stopwords]
    return text_without_stopwords

def remove_punctuation(text):
    # remove punctuations in text
    tokenizer = nltk.tokenize.RegexpTokenizer(r"\w+")
    text_without_punct = tokenizer.tokenize(' '.join(text))
    return text_without_punct

def porter_stem(text):
    stemmer = nltk.stem.PorterStemmer()
    stemmed = [stemmer.stem(word) for word in text]
    return stemmed

nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')

def get_wordnet_pos_tag(treebank_tag):
    # get WORDNET POS tag compliant to WORDNET lemmatization (a,n,r,v) 
    if treebank_tag.startswith('J'):
        return 'a'
    elif treebank_tag.startswith('V') or treebank_tag.startswith('N') or treebank_tag.startswith('R'):
        return treebank_tag[0].lower()
    else:
        return 'n'

def lemmatize(text):
    # lemmatize words using POS tag, nltk
    lemmatizer = nltk.stem.WordNetLemmatizer()
    # get wordnet pos tag
    pos_tags = nltk.pos_tag(text)
    lemmatized = [ lemmatizer.lemmatize(word[0],pos= get_wordnet_pos_tag(word[1])) for word in pos_tags]
    return lemmatized

def get_embeddings_dict(file_name):
    embeddings_dict = {}
    with open(file_name) as f:
        for line in f:
            values = line.split()
            word = values[0]
            coefs = np.asarray(values[1:], dtype = 'float32')
            embeddings_dict[word] = coefs
    return embeddings_dict
