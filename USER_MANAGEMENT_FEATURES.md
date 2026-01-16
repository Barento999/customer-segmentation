# User Management Features

## ✅ Implemented Features

### 1. Profile Editing (All Users)

**Location:** `/profile`

**Features:**

- ✏️ Edit Profile button
- Update email
- Update full name
- Change password
- Save/Cancel buttons
- Success/error messages

**How to Use:**

1. Go to Profile page
2. Click "✏️ Edit Profile"
3. Update your information
4. Click "💾 Save Changes" or "❌ Cancel"

### 2. Admin User Management

**Location:** `/admin/dashboard`

**Features:**

- ➕ Add new users
- 🗑️ Delete users
- ✏️ Change user roles
- 🔄 Toggle active/inactive status
- View all users in table

#### Add User

1. Click "➕ Add User" button
2. Fill in form:
   - Username (required)
   - Email (required)
   - Full Name (optional)
   - Password (required, min 6 chars)
   - Role (user/analyst/admin)
3. Click "✅ Add User"

#### Delete User

1. Find user in table
2. Click "🗑️ Delete" button
3. Confirm deletion
4. User is removed (cannot delete yourself)

#### Change Role

1. Click on role badge (e.g., "user ✏️")
2. Enter new role: user, analyst, or admin
3. Role is updated immediately
4. Cannot change your own admin role

#### Toggle Status

1. Click on status badge (Active/Inactive)
2. Status toggles immediately
3. Cannot deactivate yourself

## API Endpoints Used

### Profile Endpoints

- `GET /users/me/profile` - Get user profile with stats
- `PUT /users/me` - Update user profile

### Admin Endpoints

- `GET /admin/users` - Get all users
- `POST /auth/register` - Add new user (admin can set role)
- `DELETE /admin/users/{user_id}` - Delete user
- `PUT /admin/users/{user_id}/role` - Change user role
- `PUT /admin/users/{user_id}/toggle-active` - Toggle active status

## Security Features

### Profile Editing

- ✅ Users can only edit their own profile
- ✅ Password is optional (leave blank to keep current)
- ✅ Email validation
- ✅ Authentication required

### Admin Actions

- ✅ Only admins can access admin dashboard
- ✅ Admins cannot delete themselves
- ✅ Admins cannot demote themselves
- ✅ Admins cannot deactivate themselves
- ✅ All actions require admin role verification

## User Interface

### Profile Page

```
┌─────────────────────────────────────┐
│  👤 My Profile                      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  [Avatar] Username             │ │
│  │           @username             │ │
│  │           [role badge]          │ │
│  │                  [Edit Profile] │ │
│  ├───────────────────────────────┤ │
│  │  [Stats Cards]                 │ │
│  │  Predictions | Profiles | Level│ │
│  ├───────────────────────────────┤ │
│  │  Email: user@example.com       │ │
│  │  Member Since: Jan 1, 2024     │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Admin Dashboard

```
┌─────────────────────────────────────┐
│  👑 Admin Dashboard    [➕ Add User]│
│                                     │
│  [Stats Cards: Users | Predictions] │
│                                     │
│  User Management                    │
│  ┌───────────────────────────────┐ │
│  │ Username | Email | Role | ... │ │
│  │ john     | j@... | user ✏️ |..│ │
│  │ admin    | a@... | admin ✏️|..│ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Testing

### Test Profile Editing

1. Login as any user
2. Go to `/profile`
3. Click "✏️ Edit Profile"
4. Change email or full name
5. Click "💾 Save Changes"
6. Verify changes are saved

### Test Add User

1. Login as admin
2. Go to `/admin/dashboard`
3. Click "➕ Add User"
4. Fill form and submit
5. Verify user appears in table

### Test Delete User

1. Login as admin
2. Find a user (not yourself)
3. Click "🗑️ Delete"
4. Confirm deletion
5. Verify user is removed

### Test Change Role

1. Login as admin
2. Click on a user's role badge
3. Enter new role (user/analyst/admin)
4. Verify role changes

### Test Toggle Status

1. Login as admin
2. Click on a user's status badge
3. Verify status toggles

## Error Handling

### Profile Editing

- Invalid email format → Error message
- Network error → Error message
- Success → Green success message

### Admin Actions

- Cannot delete self → Error message
- Cannot change own role → Error message
- Invalid role → Alert message
- Success → Green success message
- Network error → Red error message

## Validation Rules

### Profile Update

- Email: Must be valid email format
- Password: Min 6 characters (if provided)
- Full Name: Optional

### Add User

- Username: Required, unique
- Email: Required, unique, valid format
- Password: Required, min 6 characters
- Full Name: Optional
- Role: Must be user/analyst/admin

### Change Role

- Role: Must be user/analyst/admin
- Cannot change own admin role

### Delete User

- Cannot delete yourself
- Requires confirmation

## Summary

All three features are fully implemented:

1. ✅ **Profile Editing** - Users can edit their email, name, and password
2. ✅ **Add User** - Admins can add new users with any role
3. ✅ **Delete User** - Admins can delete users (except themselves)
4. ✅ **Change Role** - Admins can change user roles by clicking role badge
5. ✅ **Toggle Status** - Admins can activate/deactivate users

Everything is secure, validated, and user-friendly!
