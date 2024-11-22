from flask import Flask, send_from_directory, jsonify, request
import os

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path == "":
        return send_from_directory('static', 'index.html')
    try:
        return send_from_directory('static', path)
    except:
        return send_from_directory('static', 'index.html')

@app.route('/check_answer', methods=['POST'])
def check_answer():
    data = request.get_json()
    num1 = int(data['num1'])
    num2 = int(data['num2'])
    user_answer = int(data['answer'])
    correct_answer = num1 * num2
    
    return jsonify({
        'correct': user_answer == correct_answer,
        'correct_answer': correct_answer
    })

if __name__ == '__main__':
    app.run()
