from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return('Blah')

@app.route('/crash-data')
def crashes()
    return jsonify


if __name__ == '__main__':
    app.run(debug=True)    