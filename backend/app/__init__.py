from flask import Flask #type: ignore
from flask_cors import CORS #type: ignore
from app.routes import main_blueprint

def create_backend():
    app = Flask(__name__)
    CORS(app)
    # app.config.from_pyfile("../config.py")

    app.register_blueprint(main_blueprint)

    return app