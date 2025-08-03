# Fullstack Application (React + Python)

This project is a fullstack web application with a React frontend and a Python backend (FastAPI/Flask). Follow the steps below to set up and run both parts locally.

---

## 📁 Project Structure

messy-migration/
├── messy-migration-API/ # Python backend (FastAPI or Flask)
├── messy-migration-UI/ # React frontend
└── CHANGES.md



## 🚀 Getting Started

### ⚙️ 1. Backend Setup (Python)


```bash
Step 1: Navigate to the backend folder
cd messy-migration-api


Step 2: Install dependencies

pip install -r requirements.txt
Step 3: Initialize the database (if applicable)

python init_db.py
Step 4: Run the backend server

python app.py
```

💻 2. Frontend Setup (React)
```
Step 1: Navigate to the frontend folder

cd messy-migration-UI
Step 2: Install dependencies

npm install
Step 3: Configure Backend API URL

src/config/appConfig.js
And set the backend API base URL:

// Example:
export const API_BASE_URL = "http://127.0.0.1:8000"; // or your backend IP and port
Make sure the IP/port matches the one shown when your backend starts.

Step 4: Start the React development server

npm start
The frontend usually runs at http://localhost:3000
```
🧪 Test the App
Start the backend first.
Then start the frontend.
Visit http://localhost:3000 and interact with your app — it should connect to the backend API properly.


🤖 Use of AI Assistants
To boost productivity and ensure high-quality code, we integrated AI-powered tools throughout our development process.

🛠️ Tools Utilized
💡 GitHub Copilot:
Real-time suggestions, boilerplate code, basic unit test generation.

🧠 ChatGPT (GPT-4):
Architectural brainstorming, documentation assistance, refactoring support.

🚀 How AI Supported Development
✨ Code Generation:
Automated routines (e.g., logging, Pydantic models) and repetitive structures.

🧩 Modernization:
Recommended best practices—moved from monolithic scripts to modular design.

📄 Documentation:
Drafted inline comments, helped compose user and technical documentation.

🧪 Test Creation:
Suggested baseline unit tests for rapid validation.

🔍 Human Review & Quality Control
📝 Thorough Review:
Every AI-generated suggestion was inspected and customized to fit project standards.

🔒 Security First:
Code for sensitive integrations was written and validated manually.

⚠️ Responsible Acceptance:
Poor or generic AI suggestions (e.g., threading instead of multiprocessing, broad exceptions) were improved or rejected in favor of robust, custom solutions.

🏁 Summary
AI tools helped us ship features faster and standardize documentation.
However:
➡️ All critical business logic and security-sensitive code were always manually reviewed and professionally implemented by the development team.
