# User Guide

# Customer Segmentation Application

A step-by-step guide for using the Customer Segmentation ML Application.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [User Roles](#user-roles)
- [Registration & Login](#registration--login)
- [Dashboard Overview](#dashboard-overview)
- [Making Predictions](#making-predictions)
- [Viewing History](#viewing-history)
- [Managing Profile](#managing-profile)
- [Admin Features](#admin-features)
- [Tips & Best Practices](#tips--best-practices)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### What You Need

- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Internet Connection**: For accessing the application
- **Account**: Register for free or use provided credentials

### Accessing the Application

1. Open your web browser
2. Navigate to: `http://localhost:5173` (development) or your deployed URL
3. You'll see the home page with login/register options

---

## User Roles

The application has three user roles with different permissions:

### 👤 User (Standard)

**What you can do**:

- Make customer predictions
- View your prediction history
- Save customer profiles
- Manage your account
- View cluster statistics

**Best for**: Business analysts, marketers, sales teams

### 📊 Analyst (Advanced)

**What you can do**:

- Everything a User can do
- Access advanced analytics (future feature)
- Export detailed reports (future feature)

**Best for**: Data analysts, business intelligence teams

### 👑 Admin (Full Access)

**What you can do**:

- Everything an Analyst can do
- Manage all users
- Change user roles
- View system statistics
- Train ML models

**Best for**: System administrators, IT managers

---

## Registration & Login

### Creating an Account

1. **Click "Register"** on the home page
2. **Fill in the form**:
   - Email address (must be valid and unique)
   - Username (must be unique)
   - Full name
   - Password (minimum 6 characters)
3. **Click "Register"**
4. You'll be automatically logged in

### Logging In

1. **Click "Login"** on the home page
2. **Enter credentials**:
   - Username or email
   - Password
3. **Click "Login"**
4. You'll be redirected to the dashboard

### Admin Login

Admins have a separate login page:

1. Navigate to `/admin/login`
2. Enter admin credentials
3. Access admin dashboard

**Default Admin Credentials** (development):

- Username: `admin`
- Password: `admin123`

---

## Dashboard Overview

After logging in, you'll see the main dashboard with several sections:

### Navigation Bar

- **Logo**: Click to return to dashboard
- **Dashboard**: Main prediction interface
- **History**: View past predictions
- **Profile**: Manage your account
- **Settings**: User preferences
- **Logout**: Sign out

### Main Dashboard Sections

1. **Customer Input Form** (Left side)
   - Enter customer data
   - Make predictions

2. **Results Display** (Right side)
   - Prediction results
   - Confidence score
   - Cluster information

3. **Cluster Visualization** (Bottom)
   - Charts showing cluster distribution
   - Statistics for each segment

---

## Making Predictions

### Step-by-Step Guide

#### Step 1: Enter Customer Data

Fill in all required fields:

**Sex**:

- Select: Male or Female
- Used for display purposes

**Age**:

- Enter: 18-70 years
- Example: 35

**Annual Income**:

- Enter: 15-150 (in thousands)
- Example: 75 means $75,000/year

**Spending Score**:

- Enter: 1-100
- 1 = Very low spending
- 100 = Very high spending
- Example: 80

**Purchase Frequency**:

- Enter: 1-50 (purchases per year)
- Example: 25 means 25 purchases annually

#### Step 2: Submit for Prediction

1. **Click "Predict Segment"** button
2. Wait for processing (usually <1 second)
3. View results on the right side

#### Step 3: Understand Results

**Cluster Assignment**:

- Shows which segment the customer belongs to
- Example: "High-Value Customers"

**Confidence Score**:

- Percentage showing prediction confidence
- 90-100%: Very confident
- 70-89%: Confident
- 50-69%: Moderate
- Below 50%: Low confidence

**Customer Data Summary**:

- Displays all input data
- Verify accuracy

**Cluster Characteristics**:

- Average age in this segment
- Average income
- Average spending score
- Average purchase frequency

### Example Prediction

**Input**:

```
Sex: Female
Age: 35
Annual Income: $75,000
Spending Score: 80
Purchase Frequency: 25
```

**Output**:

```
Cluster: High-Value Customers
Confidence: 87%
Characteristics:
- Avg Age: 38 years
- Avg Income: $82,000
- Avg Spending: 78/100
- Avg Frequency: 28 purchases/year
```

**Interpretation**:
This customer is a high-value customer with strong purchasing behavior. Recommend premium products and VIP treatment.

---

## Viewing History

### Accessing History

1. Click **"History"** in the navigation bar
2. View all your past predictions

### History Page Features

**Prediction List**:

- Date and time of prediction
- Customer data used
- Cluster assigned
- Confidence score

**Filters** (if available):

- Filter by date range
- Filter by cluster
- Filter by confidence level

**Pagination**:

- 50 predictions per page
- Navigate between pages

**Actions**:

- View details
- Re-predict with same data
- Export (future feature)

### Using History

**Track Patterns**:

- See which segments are most common
- Identify trends over time
- Review past decisions

**Quality Control**:

- Verify prediction accuracy
- Check confidence scores
- Identify outliers

---

## Managing Profile

### Viewing Your Profile

1. Click **"Profile"** in navigation
2. See your information and statistics

**Profile Information**:

- Username
- Email
- Full name
- Account creation date
- Role

**Statistics**:

- Total predictions made
- Saved customer profiles
- Account activity

### Updating Profile

1. Click **"Edit Profile"** or go to Settings
2. Update fields:
   - Full name
   - Email (must be unique)
   - Username (must be unique)
3. Click **"Save Changes"**

### Changing Password

1. Go to **Settings** or **Profile**
2. Click **"Change Password"**
3. Enter:
   - Current password
   - New password
   - Confirm new password
4. Click **"Update Password"**

### Deleting Account

⚠️ **Warning**: This action is permanent!

1. Go to **Settings**
2. Scroll to **"Danger Zone"**
3. Click **"Delete Account"**
4. Confirm deletion
5. All your data will be removed

---

## Admin Features

### Admin Dashboard

Admins have access to a special dashboard at `/admin/dashboard`:

**User Management**:

- View all users
- Search users
- Filter by role
- Sort by various fields

**System Statistics**:

- Total users
- Active/inactive users
- Total predictions
- Cluster distribution

### Managing Users

#### View All Users

1. Go to **Admin Dashboard**
2. See complete user list with:
   - Username
   - Email
   - Role
   - Status (active/inactive)
   - Registration date

#### Change User Role

1. Find the user in the list
2. Click **"Edit"** or role dropdown
3. Select new role:
   - User
   - Analyst
   - Admin
4. Click **"Save"**

⚠️ **Note**: You cannot change your own role

#### Activate/Deactivate Users

1. Find the user
2. Click **"Toggle Status"**
3. Inactive users cannot log in

⚠️ **Note**: You cannot deactivate yourself

#### Delete Users

1. Find the user
2. Click **"Delete"**
3. Confirm deletion
4. User and all their data will be removed

⚠️ **Note**: You cannot delete yourself

### Training the Model

Admins can retrain the ML model:

1. Go to **Dashboard** or **Admin Panel**
2. Click **"Train Model"**
3. Wait for training (2-5 seconds)
4. View training metrics:
   - Number of clusters found
   - Silhouette score
   - Inertia

**When to retrain**:

- After adding new customer data
- When customer behavior changes
- Monthly or quarterly updates

---

## Tips & Best Practices

### For Accurate Predictions

1. **Enter Accurate Data**: Garbage in = garbage out
2. **Use Realistic Values**: Stay within valid ranges
3. **Be Consistent**: Use same units (thousands for income)
4. **Verify Results**: Check confidence scores

### For Better Insights

1. **Make Multiple Predictions**: Compare different customer types
2. **Review History**: Look for patterns
3. **Check Cluster Stats**: Understand segment characteristics
4. **Use Confidence Scores**: Higher confidence = more reliable

### For Efficient Workflow

1. **Save Common Profiles**: For frequently analyzed customer types
2. **Use History**: Don't re-enter same data
3. **Batch Similar Customers**: Analyze groups together
4. **Export Data**: Keep records for reporting (future feature)

### Security Best Practices

1. **Use Strong Passwords**: Mix letters, numbers, symbols
2. **Don't Share Credentials**: Each user should have own account
3. **Log Out**: When using shared computers
4. **Update Profile**: Keep email current for notifications

---

## Troubleshooting

### Common Issues

#### "Invalid credentials" error

**Solution**: Check username/email and password, ensure caps lock is off

#### "Model not trained" error

**Solution**: Contact admin to train the model, or train it yourself if you're an admin

#### Prediction takes too long

**Solution**: Check internet connection, refresh page, try again

#### Can't see history

**Solution**: Make sure you're logged in, check if you have any predictions

#### Charts not displaying

**Solution**: Refresh page, check browser compatibility, clear cache

#### Can't update profile

**Solution**: Ensure email/username is unique, check all required fields

### Getting Help

1. **Check Documentation**: Review this guide and other docs
2. **Contact Admin**: For account issues
3. **Report Bugs**: Use issue tracker or contact support
4. **FAQ**: Check frequently asked questions (if available)

---

## Keyboard Shortcuts

### Navigation

- `Ctrl/Cmd + K`: Quick search (future feature)
- `Esc`: Close modals/dialogs

### Forms

- `Tab`: Move to next field
- `Shift + Tab`: Move to previous field
- `Enter`: Submit form

---

## Mobile Usage

The application is fully responsive and works on mobile devices:

### Mobile Features

- Touch-friendly interface
- Responsive charts
- Mobile-optimized forms
- Swipe navigation

### Mobile Tips

- Use landscape mode for better chart viewing
- Tap and hold for additional options
- Pinch to zoom on charts

---

## Frequently Asked Questions

### Q: How accurate are the predictions?

**A**: The model typically achieves 85-90% accuracy with confidence scores of 70-95%.

### Q: Can I predict multiple customers at once?

**A**: Currently, predictions are one at a time. Batch predictions are a future feature.

### Q: How often is the model updated?

**A**: Admins can retrain the model anytime. Recommended: monthly or when data changes significantly.

### Q: What happens to my data if I delete my account?

**A**: All your data (predictions, profiles) is permanently deleted.

### Q: Can I export my prediction history?

**A**: Export feature is planned for a future release.

### Q: Why is my confidence score low?

**A**: Low confidence means the customer has characteristics of multiple segments. They're between clusters.

### Q: How many clusters are there?

**A**: Typically 4-6 clusters, determined automatically by the model.

### Q: Can I see other users' predictions?

**A**: No, predictions are private. Only admins can see system-wide statistics.

---

## Next Steps

### For New Users

1. ✅ Create an account
2. ✅ Make your first prediction
3. ✅ Explore cluster statistics
4. ✅ Review your history
5. ✅ Update your profile

### For Regular Users

1. Make predictions regularly
2. Track patterns in history
3. Save common customer profiles
4. Provide feedback for improvements

### For Admins

1. Manage user accounts
2. Monitor system statistics
3. Train model regularly
4. Ensure data quality

---

**Need More Help?**

- [COMPLETE_PROJECT_DOCUMENTATION.md](COMPLETE_PROJECT_DOCUMENTATION.md) - Technical details
- [HOW_SEGMENTATION_WORKS.md](HOW_SEGMENTATION_WORKS.md) - Understanding the ML
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - All documentation

**Last Updated**: January 2025  
**Version**: 2.0.0
