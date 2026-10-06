# Physical Therapy

A full-stack web application designed to help patients explore physical therapy services, create an account, log in, learn about different therapy programs, and schedule physical therapy appointments. The application also includes an AI assistant to help users find information about physical therapy services, appointments, and insurance.

The website is designed to provide a simple and welcoming experience for patients of different ages and physical therapy needs. Users can explore **Geriatric, Orthopedic, and Neurological Physical Therapy** services and choose the type of treatment that best fits their needs.

---

## Technology Stack

* **Frontend:** React, Vite, JavaScript (ES6+), HTML5, CSS3
* **UI Framework:** React-Bootstrap, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** Username and password login
* **AI Assistant:** Anthropic Claude API
* **API Communication:** REST API, Fetch
* **Development Tools:** Nodemon, CORS, Git, GitHub

---

## 📁 Project Structure

```text
CapstoneProject/
├── Client/
│   └── clients.js
│
├── Router/
│   ├── clientRouter.js
│   └── aiRouter.js
│
├── server/
│   ├── dbConnection.js
│   ├── server.js
│   ├── claude.js
│   └── package.json
│
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── Appointment.jsx
│   │   │
│   │   └── ptClasses/
│   │       ├── Geriatric.jsx
│   │       ├── Orthopedic.jsx
│   │       └── Neurological.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

---

## User Flow

The application is designed around a simple patient workflow:

```text
Home Page
    ↓
Choose Physical Therapy Type
    ↓
Geriatric / Orthopedic / Neurological
    ↓
Sign In
    ↓
MongoDB Authentication
    ↓
Appointment Page
    ↓
Select Therapy Class
    ↓
Choose Date & Time
    ↓
Submit Appointment
```

---

## User Stories

1. **As a patient**, I want to view different physical therapy services so that I can find a treatment that fits my needs.

2. **As a patient**, I want to create an account so that I can access the website's services.

3. **As a registered patient**, I want to log in using my username and password so that I can access appointment services.

4. **As a patient**, I want to choose between Geriatric, Orthopedic, and Neurological physical therapy so that I can learn more about each type of treatment.

5. **As a patient**, I want to schedule an appointment by selecting a therapy class, date, and time.

6. **As a patient**, I want to use an AI assistant to ask questions about physical therapy services, appointments, and insurance.

---

# Physical Therapy Services

## Geriatric Physical Therapy

Geriatric physical therapy focuses on helping older adults improve:

* Strength
* Balance
* Mobility
* Flexibility
* Independence
* Fall prevention

Patients can explore available classes and continue to the appointment process.

---

## Orthopedic Physical Therapy

Orthopedic physical therapy focuses on conditions involving:

* Muscles
* Bones
* Joints
* Ligaments
* Movement
* Sports and physical injuries

The goal is to help patients improve movement, strength, and mobility.

---

## Neurological Physical Therapy

Neurological physical therapy focuses on helping patients improve:

* Movement
* Balance
* Coordination
* Strength
* Mobility

The service is designed for patients who may need physical therapy related to neurological conditions or injuries.

---

# 🔐 Authentication

The application uses a MongoDB database to store registered client information.

Users can log in using:

```text
Username
Password
```

The backend receives the login request through the Express API.

Example API endpoint:

```text
POST /clients/login
```

The backend searches MongoDB for the user's username and verifies the password.

Successful authentication allows the user to continue to the appointment portion of the application.

---

# 📅 Appointment System

The appointment page allows users to provide information such as:

```text
Full Name
Email
Therapy Type
Therapy Class
Appointment Date
Appointment Time
Additional Notes
```

The goal is to make the appointment process simple and easy for patients to understand.

---

# 🤖 AI Assistant

The application includes an AI assistant powered by the **Anthropic Claude API**.

The AI assistant is designed to help users learn about:

* Geriatric Physical Therapy
* Orthopedic Physical Therapy
* Neurological Physical Therapy
* Appointments
* Insurance
* General physical therapy questions

Example:

```text
User:
What is orthopedic physical therapy?

AI:
Orthopedic physical therapy focuses on injuries
and conditions involving muscles, bones, joints,
and movement.
```

The AI assistant is connected to the backend rather than exposing the API key in the React frontend.

---

# 🗄️ MongoDB Database

The project uses MongoDB for storing client information.

Database:

```text
ClientsDB
```

Collection:

```text
Clients
```

Example client document:

```js
{
  firstName: "Bryan",
  lastName: "Colon",
  email: "bryancol@gmail.com",
  userName: "bryancol1",
  password: "********",
  contactInfo: [
    {
      phone: "**********",
      address: "********"
    }
  ],
  emergencyContact: [
    {
      name: "Sasha Colon",
      phone: "**********"
    }
  ]
}
```

The application uses **Mongoose** to communicate with MongoDB.

---

# 🔌 API Routes

### Client Routes

```text
GET /clients
```

Returns the available clients.

```text
GET /clients/:id
```

Returns a specific client.

```text
POST /clients/login
```

Authenticates a client using their username and password.

---

### AI Route

```text
POST /ai
```

Sends a question to the AI assistant and returns an AI-generated response.

Example request:

```json
{
  "question": "What is geriatric physical therapy?"
}
```

Example response:

```json
{
  "answer": "Geriatric physical therapy helps older adults improve strength, balance, mobility, and independence."
}
```

---

# 🧩 Frontend Pages

### Home

The home page introduces the Physical Therapy application and provides access to the available therapy services.

### Login

Allows existing users to authenticate using their username and password.

### Sign Up

Allows new users to create an account.

### Geriatric

Provides information about geriatric physical therapy.

### Orthopedic

Provides information about orthopedic physical therapy.

### Neurological

Provides information about neurological physical therapy.

### Appointment

Allows authenticated users to select their therapy class and appointment information.

---

# 🎨 UI Design

The application uses **React-Bootstrap** and custom CSS to create a clean and responsive interface.

The design focuses on:

* Simple navigation
* Easy-to-read information
* Responsive layouts
* Clear buttons and forms
* Accessible appointment flow
* Separate pages for each therapy service

---

# 🔄 Application Architecture

```text
                 ┌──────────────────┐
                 │   React Frontend │
                 │                  │
                 │ Home             │
                 │ Login            │
                 │ Sign Up          │
                 │ PT Classes       │
                 │ Appointment      │
                 └────────┬─────────┘
                          │
                          │ REST API
                          ↓
                 ┌──────────────────┐
                 │  Express Server  │
                 │                  │
                 │ Client Routes    │
                 │ AI Routes        │
                 └────────┬─────────┘
                          │
              ┌───────────┴───────────┐
              ↓                       ↓
      ┌───────────────┐       ┌───────────────┐
      │    MongoDB    │       │ Claude API    │
      │               │       │               │
      │ Clients       │       │ AI Assistant  │
      └───────────────┘       └───────────────┘
```

---

# 🛠️ Key Features

* React single-page application
* React Router navigation
* React-Bootstrap UI
* User registration
* MongoDB client database
* Username/password authentication
* Physical therapy service pages
* Appointment scheduling interface
* Express REST API
* Claude AI assistant
* CORS configuration
* MongoDB/Mongoose integration
* Responsive frontend design

---

# 🚀 Running the Project

### Start the Backend

Navigate to the server folder:

```bash
cd ~/Desktop/QUICKSTART/workspace/CapstoneProject/server
```

Start the Express server:

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

### Start the Frontend

In another terminal:

```bash
cd ~/Desktop/QUICKSTART/workspace/CapstoneProject
```

Run:

```bash
npm run dev
```

Vite will provide a local development URL.

---

# 🔒 Environment Variables

The Claude API key should be stored in a `.env` file and should **never be committed to GitHub**.

Example:

```text
ANTHROPIC_API_KEY=your_api_key_here
```

The `.env` file should be included in `.gitignore`.

---

# 📸 Screenshots

## Home Page

Add a screenshot of the Physical Therapy home page here.

```text
![Home Page](./screenshots/home.png)
```

## Login Page

```text
![Login Page](./screenshots/login.png)
```

## Sign Up Page

```text
![Sign Up Page](./screenshots/signup.png)
```

## Physical Therapy Classes

```text
![Physical Therapy Classes](./screenshots/classes.png)
```

## Appointment Page

```text
![Appointment Page](./screenshots/appointment.png)
```

## AI Assistant

```text
![AI Assistant](./screenshots/ai-assistant.png)
```

---

# 👨‍💻 Developer

**Project:** Physical Therapy Capstone Project

**Technology:** React • Node.js • Express • MongoDB • Mongoose • Claude AI

This project was created as a full-stack web development capstone project demonstrating frontend development, backend APIs, database integration, authentication, and AI integration.
