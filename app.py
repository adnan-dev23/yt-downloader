
from flask import Flask, request, jsonify, send_file
from pytube import YouTube
from flask_cors import CORS
import os

app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/info", methods=["POST"])
def get_info():
    data = request.get_json()
    url = data.get("url")
    try:
        yt = YouTube(url)
        streams = yt.streams.filter(progressive=True, file_extension="mp4").order_by("resolution").desc()
        audio_stream = yt.streams.filter(only_audio=True).first()
        return jsonify({
            "title": yt.title,
            "streams": [
                {"res": s.resolution, "url": s.url} for s in streams
            ],
            "audio": audio_stream.url if audio_stream else None
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
