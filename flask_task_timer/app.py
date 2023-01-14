from flask import Flask
from flask import render_template
import datetime
import pickle

app = Flask(__name__)

namedict = {}
namefile = "names.pkl"
try:
    with open(namefile, 'rb') as f:
        namedict = pickle.load(f)
except:
    print("pickle file load failed")
    namedict = {}

@app.route('/')
def index():
    return render_template('./index.html')

######## Data fetch ############
@app.route('/clock/<name>', methods=['GET','POST'])
def data_get(name):

    if name not in namedict:
        namedict[name] = datetime.datetime.now()
        print(namedict[name])
        with open(namefile, 'wb') as f:
            pickle.dump(namedict, f, protocol=pickle.HIGHEST_PROTOCOL)

    return f"{name} is in time counting now. He/she started on {str(namedict[name])}. His/her time left is: {7-(datetime.datetime.now()-namedict[name]).days} days"