# 🚀 How to Run the App

## ⚡ Super Easy Way (Recommended)

### Start Both Servers:

**Double-click: `start-app.bat`**

This opens 2 terminal windows:

- ✅ Backend Server (Python/FastAPI)
- ✅ Frontend Server (React/Vite)

### Stop Both Servers:

**Double-click: `stop-app.bat`**

---

## 📋 Manual Way (If you prefer)

### Start Backend (Terminal 1):

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Start Frontend (Terminal 2):

```bash
cd frontend
npm run dev
```

### Stop Servers:

Press `Ctrl + C` in each terminal

---

## 🌐 Access the App

Once both servers are running:

- **Frontend (Main App)**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

---

## ✅ Quick Test

1. Open http://localhost:5173
2. Click **"Dashboard"**
3. Click **"Train Model"** button
4. Wait 5-10 seconds
5. See cluster visualizations! 🎉

Then: 6. Click **"Home"** 7. Fill in customer data 8. Click **"Predict Segment"** 9. See the prediction! 🎯

---

## ❓ Why Two Servers?

This is a **full-stack application**:

- **Backend** (Python): Handles ML model, data processing, predictions
- **Frontend** (React): Provides the user interface

They communicate via REST API calls.

---

## 🔧 Troubleshooting

### Problem: "Network Error" or "Connection Refused"

**Solution**: Backend server not running. Start it!

### Problem: "Model not trained" error

**Solution**: Go to Dashboard → Click "Train Model"

### Problem: Port already in use

**Solution**:

- Run `stop-app.bat` first
- Or change ports in the config files

### Problem: Backend won't start

**Solution**: Make sure you installed dependencies:

```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

### Problem: Frontend won't start

**Solution**: Make sure you installed dependencies:

```bash
cd frontend
npm install
```

---

## 💡 Pro Tips

1. **Keep both terminals open** while using the app
2. **Backend must be running** for predictions to work
3. **Train the model first** before making predictions
4. **Check terminal output** if something goes wrong
5. **Use `stop-app.bat`** to cleanly stop both servers

---

## 📁 Project Structure

```
customer-segmentation-ml/
├── start-app.bat          ← Start both servers
├── stop-app.bat           ← Stop both servers
├── backend/               ← Python/FastAPI server
│   └── app/              ← ML model code
└── frontend/              ← React app
    └── src/              ← UI components
```

---

## 🎓 Next Steps

After running the app:

1. Explore the Dashboard visualizations
2. Try different customer profiles
3. Check the API docs at http://localhost:8000/docs
4. Modify the code and see changes live!

---

**Need help?** Check:

- `COMMANDS.txt` - All commands
- `START_HERE.md` - Detailed guide
- `README.md` - Project overview
