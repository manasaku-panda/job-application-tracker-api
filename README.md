# 🚀 Job Application Tracker API

A RESTful API to manage and track job applications efficiently.
Built with Node.js, Express, and Sequelize, following clean architecture (Service + Repository pattern).

---

## 📌 Features

* 🔐 JWT Authentication
* 👤 Role-based Access Control
* 📄 CRUD Operations (Jobs, Notes, Companies)
* 🔍 Pagination & Filtering
* 🔗 SQL Relationships (Sequelize ORM)
* ✅ Input Validation
* ⚠️ Centralized Error Handling
* 📊 Status Tracking with History
* 📝 Notes for each Job Application

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL / PostgreSQL
* **ORM:** Sequelize
* **Authentication:** JWT
* **Validation:** Joi / Custom Middleware
* **Logging:** Morgan / Winston

---

## 📂 Project Structure

```
src/
│
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
└── app.js
```

---

## 🔑 API Modules

### Auth

* Register User
* Login User

### Jobs

* Create Job
* Get All Jobs (pagination, filters)
* Get Job by ID
* Update Job
* Delete Job

### Company

* Add Company
* Update Company
* Get Company Details

### Notes

* Add Note to Job
* Get Notes

### Status History

* Track job status changes

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=job_tracker
JWT_SECRET=your_secret_key
```

---

## 🚀 Getting Started

### 1. Clone the repo

```
git clone https://github.com/your-username/job-application-tracker-api.git
cd job-application-tracker-api
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create `.env` file

### 4. Run the server

```
npm run dev
```

---

## 📌 API Response Format

```
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## ⚠️ Error Handling

```
{
  "success": false,
  "message": "Error message",
  "status": 400
}
```

---

## 📊 Status Flow Example

* Applied → Interview → Offer → Rejected

All changes are tracked in **StatusHistory**

---

## 🧠 Future Improvements

* 📈 Analytics Dashboard
* 📅 Reminder System (Follow-ups)
* 📎 Resume Upload
* 🌐 Frontend Integration

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 👨‍💻 Author

Manasa Panda
