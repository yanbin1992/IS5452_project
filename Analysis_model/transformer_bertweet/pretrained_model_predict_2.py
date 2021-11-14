# !pip install pysentimiento
from pysentimiento import SentimentAnalyzer
def pretrained_model_predict(text):
    analyzer = SentimentAnalyzer(lang="es")
    result = analyzer.predict(text)
    #scores = [score for score in result]
    print(result)
    scores = result.probas
    print(scores)
    if scores['POS'] > 0.65:
        return 4
    elif scores['POS'] <= 0.65 and scores['POS'] > 0.4:
        return 3
    elif scores['NEG'] > 0.65:
        return 0
    elif scores['NEG'] <= 0.65 and scores['NEG'] > 0.4:
        return 1
    else:
        return 2
print(pretrained_model_predict('i like the game'))