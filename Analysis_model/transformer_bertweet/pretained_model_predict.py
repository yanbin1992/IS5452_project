from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
# https://huggingface.co/finiteautomata/bertweet-base-sentiment-analysis
# installation for transformers:
# curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# restart the bash, then:
# pip3 install transformers

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
tokenizer = AutoTokenizer.from_pretrained("finiteautomata/bertweet-base-sentiment-analysis")
model = AutoModelForSequenceClassification.from_pretrained("finiteautomata/bertweet-base-sentiment-analysis")
   
def pretrained_model_predict(text):
    # return value:
    # 0- negative; 2- neutral; 4- positive
    model.eval()

    inputs = tokenizer(text, return_tensors="pt")
    labels = torch.tensor([1]).unsqueeze(0)
    outputs = model(**inputs,labels=labels)
    scores = [float(x) for x in outputs[1].squeeze(0)]
    print(scores)
    # max_score = max(scores)
    # max_index = scores.index(max_score)
    # if max_index == 0:
    #     return 0
    # elif max_index == 1:
    #     return 2
    # else:
    #     return 4
    norm_scores = [(x-min(scores))/(max(scores)-min(scores)) for x in scores]
    if norm_scores[2] > 0.65:
        return 4
    elif norm_scores[2] <= 0.65 and norm_scores[2] > 0.4:
        return 3
    elif norm_scores[0] > 0.65:
        return 0
    elif norm_scores[0] <= 0.65 and norm_scores[0] > 0.4:
        return 1
    else:
        return 2


#test
if __name__ == '__main__':
    print(pretrained_model_predict('i like the game.'))