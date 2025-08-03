import bcrypt

def hash_password(plain_text_password: str) -> str:
    """Hash a plain-text password using bcrypt."""
    return bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(plain_text_password: str, hashed_password: str) -> bool:
    """Check a plain-text password against a hashed one."""
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_password.encode('utf-8'))
