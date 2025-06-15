# app/__init__.py
from flask import Flask, render_template, request, redirect, session
from core.db import results_collection
import os

def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv("SECRET_KEY", "dev-secret")

    @app.route('/')
    def landing():
        return render_template('landing.html')

    @app.route('/login')
    def login():
        return render_template('login.html')
    
    @app.route('/start', methods=['POST'])
    def start_quiz():
        session['user'] = {
            'name': request.form.get('username'),
            'id_suffix': request.form.get('id_suffix'),
            'program': request.form.get('program'),
            'batch': request.form.get('batch')
        }
        return redirect('/instructions')

    @app.route('/instructions')
    def instructions():
        user = session.get('user')
        if not user:
            return redirect('/login')
        return render_template('instructions.html', user=user)

    @app.route('/test-insert')
    def test_insert():
        try:
            results_collection.insert_one({
                "name": "Test User",
                "email": "test@example.com",
                "score": 42
            })
            return {"message": "Inserted!"}, 200
        except Exception as e:
            print("❌ MongoDB Insert Failed:", e)
            return {"error": str(e)}, 500

    return app