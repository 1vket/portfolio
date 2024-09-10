from flask import Flask, render_template, jsonify, send_from_directory

app = Flask(
  __name__, 
  template_folder='app/templates',
  static_folder='app/static'
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:filename>')
def disc(filename):
    try:
        return render_template(f'{filename}.html')
    except:
        return render_template('404.html'), 404

@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404

@app.route('/get_sections/<path:filename>')
def get_sections(filename):
    with open(f'app/page/{filename}', 'r', encoding='utf-8') as file:
        content = file.read()
    return jsonify(content)

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5101)

