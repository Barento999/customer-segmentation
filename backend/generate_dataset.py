
import pandas as pd
import numpy as np
from pathlib import Path

# Set random seed for reproducibility
np.random.seed(42)

# Number of samples
n_samples = 5000

# Generate data
data = {
    'CustomerID': range(1, n_samples + 1),
    'Sex': np.random.choice(['Male', 'Female'], n_samples),
    'Age': np.random.randint(18, 70, n_samples),
    'Annual_Income': np.random.uniform(15, 150, n_samples).round(1),
    'Spending_Score': np.random.randint(1, 100, n_samples),
    'Purchase_Frequency': np.random.randint(1, 50, n_samples)
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
output_path = Path(__file__).parent / 'data' / 'customers.csv'
df.to_csv(output_path, index=False)

print(f"✅ Generated {n_samples} customer records")
print(f"📁 Saved to: {output_path}")
print(f"\nDataset preview:")
print(df.head(10))
print(f"\nDataset info:")
print(df.info())
print(f"\nSex distribution:")
print(df['Sex'].value_counts())
