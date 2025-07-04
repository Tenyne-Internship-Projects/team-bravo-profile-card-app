Here is your updated `README.md` — polished to a **professional, clean, and developer-focused standard**, with emojis removed and formatting improved. The content is preserved exactly, with refinements for clarity, consistency, and credibility:

---

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

For production applications, it is recommended to use TypeScript with type-aware lint rules enabled. Refer to the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for guidance on integrating TypeScript and [`typescript-eslint`](https://typescript-eslint.io).

---

# KConnect Profile Card (Frontend)

This is the **frontend** implementation of the KConnect Profile Card application, built using **React.js** and **Tailwind CSS**. The platform allows users to register, manage, and showcase their professional profiles in a sleek and responsive interface.

---

## Features

- Animated profile card using Framer Motion
- Profile registration with image upload support
- Edit and preview profile details in real-time
- Styled display of skills and tools as tags
- Mobile-friendly and responsive layout
- Context API for centralized state management

---

## Technology Stack

- React.js
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- React Toastify

---

## Screenshots

| Onboarding                               | Sign In                              | Sign Up                              |
| ---------------------------------------- | ------------------------------------ | ------------------------------------ |
| ![Onboarding](./screenshots/screen1.png) | ![Signin](./screenshots/screen2.png) | ![Signup](./screenshots/screen3.png) |

| Reset Password                              | Email Verification                        | Register                                                                        |
| ------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------- |
| ![ResetPassword](./screenshots/screen4.png) | ![VerifyEmail](./screenshots/screen5.png) | ![Register](./screenshots/screen6a.png) ![Register](./screenshots/screen6b.png) |

| Profile                                                                       | Edit Profile                                                            |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| ![Profile](./screenshots/screen7a.png) ![Profile](./screenshots/screen7b.png) | ![Edit](./screenshots/screen8a.png) ![Edit](./screenshots/screen8b.png) |

---

## Project Structure
```

hireConnect-app/
├── public/
├── src/
│ ├── assets/ # Images and logos
│ ├── components/ # Reusable UI components
│ ├── context/ # AppContext for global state
│ ├── pages/ # Register, Profile, Edit Profile, etc.
│ ├── App.js # Main router configuration
│ └── index.js # Entry point
├── .env # Environment configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json

````

---

## Getting Started

### Step 1: Navigate to the frontend folder
```bash
cd hireConnect-app
````

### Step 2: Set up environment variables

Create a `.env` file in the root of the `hireConnect-app` folder with your backend URL:

```
VITE_BACKEND_URL=http://localhost:5000
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the development server

```bash
npm run dev
```

Visit the app at: [http://localhost:5173](http://localhost:5173)
Live deployment (if configured): [https://team-bravo-profile-card-auth-app.vercel.app](https://team-bravo-profile-card-auth-app.vercel.app)

---

## Route Overview

| Path              | Component         | Purpose                       |
| ----------------- | ----------------- | ----------------------------- |
| `/register`       | `Register.jsx`    | Create a new user profile     |
| `/profile`        | `ProfileCard.jsx` | View user profile             |
| `/edit-profile`   | `EditProfile.jsx` | Edit user profile information |
| `/login`          | `Signin.jsx`      | Log into an existing profile  |
| `/verify-email`   | `Emailverify.jsx` | Email verification flow       |
| `/reset-password` | `Resetpswd.jsx`   | Password reset                |

---

## API Integration

All API requests are made using Axios with the base URL defined in `.env`:

```js
axios.post(`${process.env.VITE_BACKEND_URL}/api/...`);
```

Make sure the backend server is running and CORS is properly configured.

---

Contributing
We welcome contributions and suggestions from the community! To contribute:

Fork the repository

Create a feature branch: git checkout -b feature/your-feature

Commit your changes: git commit -m "feat: add your feature"

Push to your fork: git push origin feature/your-feature

Submit a pull request

Please ensure your code follows the existing style, is well-documented, and includes relevant tests if applicable.

Thank You
Thank you for exploring the KConnect Profile Card frontend. This project is part of the Tenyne Innovations Internship Program and is maintained by Team Bravo. We appreciate your interest and support.

---

## Author

**Team Bravo** – Tenyne Innovations Internship Program
GitHub: [Tenyne-Internship-Projects](https://github.com/Tenyne-Internship-Projects)

```

```
