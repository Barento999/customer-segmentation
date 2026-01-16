"""
Create an admin user for testing
"""
from app.database import SessionLocal, User
import bcrypt

def create_admin():
    db = SessionLocal()
    
    # Check if admin already exists
    existing_admin = db.query(User).filter(User.username == "admin").first()
    if existing_admin:
        print("Admin user already exists!")
        print(f"   Username: admin")
        print(f"   Password: admin123")
        return
    
    # Create admin user with bcrypt directly
    password = "admin123".encode('utf-8')
    hashed = bcrypt.hashpw(password, bcrypt.gensalt())
    
    admin = User(
        email="admin@example.com",
        username="admin",
        full_name="Admin User",
        hashed_password=hashed.decode('utf-8'),
        role="admin"
    )
    
    db.add(admin)
    db.commit()
    db.refresh(admin)
    
    print("✅ Admin user created successfully!")
    print(f"   Username: admin")
    print(f"   Password: admin123")
    print(f"   Email: {admin.email}")
    print(f"   Role: {admin.role}")
    
    # Also create a regular test user
    test_password = "test123".encode('utf-8')
    test_hashed = bcrypt.hashpw(test_password, bcrypt.gensalt())
    
    test_user = User(
        email="test@example.com",
        username="testuser",
        full_name="Test User",
        hashed_password=test_hashed.decode('utf-8'),
        role="user"
    )
    
    db.add(test_user)
    db.commit()
    
    print("\n✅ Test user created successfully!")
    print(f"   Username: testuser")
    print(f"   Password: test123")
    
    db.close()

if __name__ == "__main__":
    create_admin()
