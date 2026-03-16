# 🌾 FieldSync AI

### AI-Powered Crop Diagnostics with Local-First Reporting

FieldSync AI is a crop health reporting platform designed for farmers and field workers operating in low-connectivity environments. Farmers can submit crop issue reports with optional images, receive AI-powered recommendations, and automatically synchronize reports to the cloud when internet connectivity becomes available.

This project was built for the **PowerSync AI Hackathon**.

## 📸 Demo

![FieldSync Dashboard](assets)

---

# 🚜 Problem

Farmers in rural regions often face:

- Limited access to agronomy experts
- Poor internet connectivity in fields
- Delayed crop disease detection
- Lack of structured reporting tools

These issues can lead to **late intervention and crop loss**.

---

# 💡 Solution

FieldSync AI provides a **local-first crop diagnostics platform** where farmers can:

- Submit crop issue reports with images
- Receive AI-generated diagnosis and treatment advice
- Store reports locally when offline
- Automatically sync reports when internet returns
- View historical reports in a centralized dashboard

This ensures **continuous operation even in poor connectivity environments**.

---

# 🧠 Key Features

### 🌱 AI Crop Diagnostics
Reports are analyzed using OpenAI to identify potential crop diseases and recommended actions.

### 📷 Image-Based Reporting
Farmers can attach crop images to help the AI analyze plant health issues.

### 📡 Local-First Offline Mode
Reports are saved locally when internet connectivity is unavailable.

### 🔄 Automatic Sync
Once connectivity returns, reports automatically synchronize with the cloud database.

### 📊 Live Dashboard
A dashboard displays submitted reports, images, AI analysis, and risk levels.

### 🚨 AI Risk Classification
AI responses are classified into:

- 🔴 High Risk
- 🟡 Moderate Risk
- 🟢 Low Risk

to help farmers quickly understand severity.

### 🔍 Searchable Reports
Users can search reports by:

- location
- category
- disease
- AI analysis text

---

# 🏗️ Architecture

Farmer Device
↓
FieldSync Web App
↓
Offline Queue (Local Storage)
↓
Internet Restored
↓
Express API
↓
Image Upload → Supabase Storage
↓
AI Analysis → OpenAI
↓
Supabase PostgreSQL
↓
Dashboard Interface


The system is designed using **local-first principles** to support unreliable connectivity in rural farming environments.

---

# ⚙️ Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Node.js
- Express.js

### Database
- Supabase PostgreSQL

### File Storage
- Supabase Storage

### AI
- OpenAI GPT model

### Image Upload
- Multer

---

# 🔁 Offline Sync Workflow

Farmer submits report
↓
Internet available?
├── YES → Send to API
└── NO → Save locally

When internet returns
↓
Offline reports sync automatically
↓
AI analysis runs
↓
Dashboard updates

This design allows farmers to **continue reporting even without connectivity**.

---

# 🌍 Local-First Design

FieldSync AI follows a **local-first architecture** where:

- Reports are stored locally on the device
- The application remains fully functional offline
- Data automatically synchronizes with the cloud when connectivity returns

This makes the platform suitable for **rural agriculture environments** with unreliable internet.

---

# 📷 Example Dashboard

The dashboard displays:

- report metadata
- uploaded crop images
- AI diagnosis
- risk level classification
- timestamps

This allows farmers or agronomists to quickly assess crop health across reports.

---

## Run Locally

Clone the project:

```bash
git clone https://github.com/vaibhav0xq/fieldsync-ai.git
cd fieldsync-ai


Install dependencies:
npm install

Create a .env file:
OPENAI_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_KEY=your_key

Start the server:
node server.js

Open in browser:
http://localhost:3000

---

# 🚀 Future Improvements

Potential next steps include:

- Mobile app version
- Real-time crop disease alerts
- Region-based disease tracking
- Farm-level analytics
- AI model trained on crop disease datasets

---

# 🏆 Hackathon Tracks

This project made for PowerSync AI Hackathon

---

# 👨‍💻 Author

Vaibhav  
Software Engineer | Web3 & AI Builder

---

# 📜 License

MIT License