# backend/tests/test_main.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_docs():
    response = client.get("/docs")
    assert response.status_code == 200

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] in ["Welcome to TODO API", "Backend is running"]