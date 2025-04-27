from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

pomodoro_count = 0

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/pomodoro_completed', methods=['POST'])
def pomodoro_completed():
    global pomodoro_count
    pomodoro_count += 1
    return jsonify({'count': pomodoro_count})

if __name__ == '__main__':
    app.run(debug=True)
