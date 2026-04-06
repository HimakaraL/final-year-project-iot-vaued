## 1. Clone the Repository

## 2. Backend Setup

### Install Dependencies

In the root directory of the project, install backend dependencies:

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root of the project with the following content:

```env
MONGO=mongodb+srv://<username>:<password>@cluster0.rqgdorn.mongodb.net/?appName=<appName>
JWT_SECRET=<your_jwt_secret>
```

* Replace `<username>` and `<password>` with your MongoDB credentials.
* Replace `<appName>` with your app name.
* Replace `<your_jwt_secret>` with a secret string for JWT authentication.

### Run the Backend

Start the backend development server:

```bash
npm run dev
```

* The backend will run at `http://localhost:5000` by default.
* API endpoints are available under `/api`.

---

## 3. Frontend Setup

### Navigate to Frontend Folder

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Run the Frontend

```bash
npm run dev
```

* The frontend will typically run at `http://localhost:5173`.
* You can now access the app from your browser.

---

## 4. Usage

1. Start the backend first (`npm run dev` in root).
2. Start the frontend (`npm run dev` inside the `frontend` folder).
3. Use the app through the frontend interface. The frontend communicates with the backend API for all requests.

---

## 5. Notes

* Make sure your MongoDB connection string is correct.
* Keep your JWT secret safe; it is used for authentication.
* For production deployment, update `.env` with production credentials.
* If you encounter any errors, delete `node_modules` and `package-lock.json` and run `npm install` again.

---

## 6. Project Structure

```
root/
│
├── backend/        # Backend code (Node.js, Express)
├── frontend/       # Frontend code (React/Vue/Other)
├── .env            # Environment variables for backend
├── package.json    # Backend dependencies
└── README.md       # This file
```

---
