# Chart generation using matplotlib
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend for server
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
from pathlib import Path

# Set style
sns.set_style("whitegrid")
plt.rcParams['figure.facecolor'] = 'white'


def generate_cluster_charts(clusters_data):
    # Generate cluster visualization charts
    # Returns: dict with base64 encoded images
    clusters = clusters_data['clusters']
    
    # Prepare data
    cluster_names = [c['cluster_name'] for c in clusters]
    sizes = [c['size'] for c in clusters]
    avg_ages = [c['avg_age'] for c in clusters]
    avg_incomes = [c['avg_income'] for c in clusters]
    avg_spending = [c['avg_spending_score'] for c in clusters]
    avg_frequency = [c['avg_purchase_frequency'] for c in clusters]
    
    charts = {}
    
    # 1. Pie Chart - Cluster Distribution
    fig, ax = plt.subplots(figsize=(10, 8))
    colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#ff7c7c']
    wedges, texts, autotexts = ax.pie(
        sizes, 
        labels=cluster_names, 
        autopct='%1.1f%%',
        colors=colors[:len(clusters)],
        startangle=90,
        textprops={'fontsize': 12, 'weight': 'bold'}
    )
    ax.set_title('Customer Segment Distribution', fontsize=16, weight='bold', pad=20)
    
    # Make percentage text white
    for autotext in autotexts:
        autotext.set_color('white')
    
    plt.tight_layout()
    charts['pie_chart'] = fig_to_base64(fig)
    plt.close(fig)
    
    # 2. Bar Chart - Cluster Characteristics
    fig, ax = plt.subplots(figsize=(14, 8))
    x = range(len(cluster_names))
    width = 0.2
    
    ax.bar([i - 1.5*width for i in x], avg_ages, width, label='Age', color='#8884d8')
    ax.bar([i - 0.5*width for i in x], [income/1000 for income in avg_incomes], width, label='Income (K)', color='#82ca9d')
    ax.bar([i + 0.5*width for i in x], avg_spending, width, label='Spending Score', color='#ffc658')
    ax.bar([i + 1.5*width for i in x], avg_frequency, width, label='Purchase Frequency', color='#ff8042')
    
    ax.set_xlabel('Customer Segments', fontsize=12, weight='bold')
    ax.set_ylabel('Values', fontsize=12, weight='bold')
    ax.set_title('Cluster Characteristics Comparison', fontsize=16, weight='bold', pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(cluster_names, rotation=45, ha='right')
    ax.legend(fontsize=10)
    ax.grid(axis='y', alpha=0.3)
    
    plt.tight_layout()
    charts['bar_chart'] = fig_to_base64(fig)
    plt.close(fig)
    
    # 3. Heatmap - Cluster Features
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # 3. Horizontal Bar Chart - Cluster Sizes
    fig, ax = plt.subplots(figsize=(10, 6))
    y_pos = range(len(cluster_names))
    ax.barh(y_pos, sizes, color=colors[:len(clusters)])
    ax.set_yticks(y_pos)
    ax.set_yticklabels(cluster_names)
    ax.set_xlabel('Number of Customers', fontsize=12, weight='bold')
    ax.set_title('Customer Count by Segment', fontsize=16, weight='bold', pad=20)
    ax.grid(axis='x', alpha=0.3)
    
    # Add value labels
    for i, v in enumerate(sizes):
        ax.text(v + max(sizes)*0.01, i, str(v), va='center', fontsize=10, weight='bold')
    
    plt.tight_layout()
    charts['size_chart'] = fig_to_base64(fig)
    plt.close(fig)
    
    return charts


def generate_elbow_chart(elbow_data):
    # Generate elbow method chart
    # Returns: base64 encoded image
    k_range = elbow_data['k_range']
    inertias = elbow_data['inertias']
    silhouette_scores = elbow_data['silhouette_scores']
    optimal_k = elbow_data['optimal_k']
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
    
    # Inertia plot
    ax1.plot(k_range, inertias, 'bo-', linewidth=2, markersize=8)
    ax1.axvline(x=optimal_k, color='r', linestyle='--', linewidth=2, label=f'Optimal K={optimal_k}')
    ax1.set_xlabel('Number of Clusters (K)', fontsize=12, weight='bold')
    ax1.set_ylabel('Inertia', fontsize=12, weight='bold')
    ax1.set_title('Elbow Method - Inertia', fontsize=14, weight='bold')
    ax1.grid(True, alpha=0.3)
    ax1.legend()
    
    # Silhouette score plot
    ax2.plot(k_range, silhouette_scores, 'go-', linewidth=2, markersize=8)
    ax2.axvline(x=optimal_k, color='r', linestyle='--', linewidth=2, label=f'Optimal K={optimal_k}')
    ax2.set_xlabel('Number of Clusters (K)', fontsize=12, weight='bold')
    ax2.set_ylabel('Silhouette Score', fontsize=12, weight='bold')
    ax2.set_title('Elbow Method - Silhouette Score', fontsize=14, weight='bold')
    ax2.grid(True, alpha=0.3)
    ax2.legend()
    
    plt.tight_layout()
    chart = fig_to_base64(fig)
    plt.close(fig)
    
    return chart


def fig_to_base64(fig):
    # Convert matplotlib figure to base64 encoded string
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=100, bbox_inches='tight')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    return f"data:image/png;base64,{img_base64}"
