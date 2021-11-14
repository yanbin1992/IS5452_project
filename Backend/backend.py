#!/usr/bin/python3
# -*- coding: UTF-8 -*-

from flask import Flask, jsonify, request
from sentiment_predict import predict
from pretrained_model_predict_2 import *

app = Flask(__name__)

@app.route('/test/1', methods=['POST'])
def return_model1():
    info = str(request.data)
    print(info)
    text = info[info.index('\'') + 1: info.rindex('\'')]
    result = predict(text)
    print("succeed, prediction value is " + result)
    return str(result), 200, [("Access-Control-Allow-Origin", "*")]

@app.route('/test/2', methods=['POST'])
def return_model2():
    info = str(request.data)
    print(info)
    text = info[info.index('\'') + 1: info.rindex('\'')]
    result = pretrained_model_predict(text)
    print("succeed, prediction value is " + result)
    return str(result), 200, [("Access-Control-Allow-Origin", "*")]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)