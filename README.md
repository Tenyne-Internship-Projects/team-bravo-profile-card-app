# HireConnect App – Frontend

This is the **frontend** for the [HireConnect](https://github.com/Tenyne-Internship-Projects/Team-Bravo-Profile-Card-Auth-API) application — a platform that enables freelancers and recruiters to connect, register, and manage professional profiles with a sleek, responsive interface.

Built with **React.js**, **Tailwind CSS**, and **Framer Motion**, the app supports registration, authentication, animated profile cards, and secure verification flows.

---

## Tech Stack

- **React.js** – SPA with React Router
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Animated transitions
- **React Toastify** – Toast notifications
- **Axios** – HTTP client
- **Vite** – Development bundler

---

## Project Structure

```

hireConnect-app/
├── public/               # Static files (logo, favicon)
├── src/
│   ├── assets/           # Logos, icons, and image assets
│   ├── components/       # Shared UI components (e.g., Navbar)
│   ├── context/          # AppContext for auth and user state
│   ├── pages/            # Route-based views (Signin, Profile, etc.)
│   ├── styles/           # CSS/Tailwind overrides
│   ├── App.jsx           # Main app routes
│   └── main.jsx          # React entry point
├── .env                  # Frontend env config (see below)
├── tailwind.config.js    # Tailwind customization
└── package.json          # Project dependencies and scripts

```

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Tenyne-Internship-Projects/team-bravo-profile-card-app.git
cd team-bravo-profile-card-app
```

### 2. Configure Environment Variables

Create a `.env` file in the root:

```env
VITE_BACKEND_URL=https://team-bravo-profile-card-auth-api.onrender.com
```

> Or use `http://localhost:5000` if running the backend locally.

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

---

## Live Demo

Frontend: [https://team-bravo-profile-card-app.vercel.app](https://team-bravo-profile-card-app.vercel.app)
Backend: [https://team-bravo-profile-card-auth-api.onrender.com](https://team-bravo-profile-card-auth-api.onrender.com)

---

## Route Overview

| Path                  | Component          | Description                  |
| --------------------- | ------------------ | ---------------------------- |
| `/`                   | `Home.jsx`         | Public homepage (Onboarding) |
| `/signup`             | `SignUp.jsx`       | Role-based registration      |
| `/signin`             | `Signin.jsx`       | User login                   |
| `/verify-email`       | `Emailverify.jsx`  | Email OTP verification       |
| `/reset-password`     | `Resetpswd.jsx`    | Request password reset       |
| `/confirm-reset/:tkn` | `ConfirmReset.jsx` | Enter new password           |
| `/profile`            | `Profilecard.jsx`  | Protected user profile       |
| `/edit-profile`       | `EditProfile.jsx`  | Protected profile editor     |

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

## Authentication & API

- **JWT** stored securely and used for protected route access
- **Axios** configured to include auth token (via context)
- **API Base URL** is read from `.env`

Example call:

```js
axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
  email,
  password,
});
```

---

## Deployment Notes

### Deploy to Vercel

1. Push to GitHub
2. Connect GitHub repo on [vercel.com](https://vercel.com/)
3. Set Environment Variable: `VITE_BACKEND_URL`
4. Done

---

## Troubleshooting

| Issue                     | Solution                                                          |
| ------------------------- | ----------------------------------------------------------------- |
| `useState is not defined` | Import `useState` at the top of your component file               |
| Blank `/profile` page     | Ensure you're importing `useEffect`, `useContext`, and `useState` |
| CORS issues               | Make sure backend allows CORS from frontend domain                |
| Favicon/logo not loading  | Confirm correct path: `/assets/kconnect.png`                      |

---

## Contributing

We welcome all contributions!

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your work: `git commit -m "feat: awesome feature"`
4. Push and open a Pull Request

---

## Team & Attribution

Developed by **Team Bravo**
Part of the [Tenyne Innovations Internship Program](https://github.com/Tenyne-Internship-Projects)

GitHub: [Tenyne-Internship-Projects](https://github.com/Tenyne-Internship-Projects)

---

## License

MIT © Tenyne Innovations

---

## Thank You

Thank you for checking out the **HireConnect App**.  
This project is part of the **Tenyne Innovations Internship Program** and was proudly developed by **Team Bravo**.

We deeply appreciate your interest, support, and any feedback you may have to help us grow. ❤️

---

## Collaboration & Ideas

We welcome all collaborators, testers, and contributors!

Whether you're a designer, developer, or just someone with a great idea — we’d love to hear from you.

If you’d like to:

- Report a bug
- Suggest a new feature
- Join the project as a contributor

Please feel free to open an issue or pull request, or email us directly at [**tenyne.innovations@gmail.com**](mailto:tenyne.innovations@gmail.com).

Let’s build something amazing together!

---
