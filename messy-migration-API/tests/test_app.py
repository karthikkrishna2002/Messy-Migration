import pytest
from app import app
from init_db import initialize_test_db

@pytest.fixture(autouse=True, scope='module')
def test_client():
    # Use Flask test client
    client = app.test_client()

    # Re-initialize test DB (in-memory or fresh file)
    initialize_test_db()

    yield client

def test_health_check(test_client):
    response = test_client.get('/home')
    assert response.status_code == 200
    assert b'User Management System' in response.data

def test_get_all_users(test_client):
    response = test_client.get('/users')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1  # Because init_db inserts sample data

def test_login_success(test_client):
    response = test_client.post('/login', json={
        'email': 'john@example.com',
        'password': 'password123'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    assert 'user_id' in data

def test_login_failure(test_client):
    response = test_client.post('/login', json={
        'email': 'john@example.com',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401
    data = response.get_json()
    assert data['status'] == 'failed'
