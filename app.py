from flask import Flask, render_template, jsonify, request, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

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

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
