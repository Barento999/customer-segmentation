"""
Quick script to view database contents
"""
import sqlite3
import pandas as pd

# Connect to database
conn = sqlite3.connect('customer_segmentation.db')

print("=" * 60)
print("DATABASE TABLES")
print("=" * 60)

# Get all tables
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

for table in tables:
    table_name = table[0]
    print(f"\n📊 Table: {table_name}")
    print("-" * 60)
    
    # Get row count
    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
    count = cursor.fetchone()[0]
    print(f"Total rows: {count}")
    
    # Show first 5 rows
    if count > 0:
        df = pd.read_sql_query(f"SELECT * FROM {table_name} LIMIT 5", conn)
        print("\nFirst 5 rows:")
        print(df.to_string())
    print("\n")

conn.close()
print("=" * 60)
print("Done!")
