from flask import Blueprint, request
from sqlalchemy.orm import Session
from models.user import User
from utils.security import hash_password, check_password
from schemas.user_schema import UserCreateSchema, UserUpdateSchema
from utils.response import success_response, error_response
from database import get_db_session

user_bp = Blueprint('user_routes', __name__)

@user_bp.route('/home')
def home():
    return success_response(message="User Management System is up")

@user_bp.route('/users', methods=['GET'])
def get_all_users():
    try:
        session: Session = get_db_session()
        users = session.query(User).all()
        user_list = [{"id": u.id, "name": u.name, "email": u.email} for u in users]
        return success_response(data=user_list)
    except Exception as e:
        return error_response("Failed to fetch users", errors=str(e))

@user_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        session: Session = get_db_session()
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return error_response("User not found", status_code=404)
        return success_response(data={"id": user.id, "name": user.name, "email": user.email})
    except Exception as e:
        return error_response("Failed to fetch user", errors=str(e))

@user_bp.route('/users', methods=['POST'])
def create_user():
    try:
        session: Session = get_db_session()
        data = request.get_json()
        errors = UserCreateSchema().validate(data)
        if errors:
            return error_response("Validation failed", errors=errors, status_code=400)

        hashed_pw = hash_password(data['password'])
        new_user = User(name=data['name'], email=data['email'], password=hashed_pw)
        session.add(new_user)
        session.commit()
        return success_response(message="User created", data={"user_id": new_user.id}, status_code=201)
    except Exception as e:
        return error_response("Failed to create user", errors=str(e))

@user_bp.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        session: Session = get_db_session()
        data = request.get_json()
        errors = UserUpdateSchema().validate(data)
        if errors:
            return error_response("Validation failed", errors=errors, status_code=400)

        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return error_response("User not found", status_code=404)

        user.name = data['name']
        user.email = data['email']
        session.commit()
        return success_response(message="User updated")
    except Exception as e:
        return error_response("Failed to update user", errors=str(e))

@user_bp.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        session: Session = get_db_session()
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return error_response("User not found", status_code=404)

        session.delete(user)
        session.commit()
        return success_response(message=f"User {user_id} deleted")
    except Exception as e:
        return error_response("Failed to delete user", errors=str(e))

@user_bp.route('/search', methods=['GET'])
def search_users():
    try:
        session: Session = get_db_session()
        name = request.args.get('name')
        if not name:
            return error_response("Please provide a name", status_code=400)

        users = session.query(User).filter(User.name.ilike(f"%{name}%")).all()
        results = [{"id": u.id, "name": u.name, "email": u.email} for u in users]
        return success_response(data=results)
    except Exception as e:
        return error_response("Search failed", errors=str(e))

@user_bp.route('/login', methods=['POST'])
def login():
    try:
        session: Session = get_db_session()
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return error_response("Email and password are required", status_code=400)

        user = session.query(User).filter_by(email=email).first()
        if not user or not check_password(password, user.password):
            return error_response("Invalid email or password", status_code=401)

        return success_response(
            data={"user_id": user.id, "name": user.name, "email": user.email},
            message="Login successful"
        )
    except Exception as e:
        return error_response("Login failed", errors=str(e), status_code=500)
