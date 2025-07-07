# Team Bravo – HIREConnect App

This is the **frontend application** for the KConnect Profile Card system, built with **React.js**, **Tailwind CSS**, and **Framer Motion**. It enables users to register, verify their email via OTP, log in, and manage rich professional profiles including uploading avatars, documents, and showcasing skills.

---

## Project Overview

A clean, responsive, and intuitive frontend app for managing professional profiles. This frontend connects seamlessly with the [Profile Card & Auth API (Backend)](https://github.com/Tenyne-Internship-Projects/Team-Bravo-Profile-Card-Auth-API).

> Live Demo: [team-bravo-profile-card-auth-app.vercel.app](https://HireConnect.vercel.app)

---

### Loom Demo _(Suggested)_

- Showcase of registration, OTP verification, and profile editing.
- Highlight profile view, upload interactions, and mobile responsiveness.

> **Loom Demo Link**: _Add Loom video link here_

---

## Screenshots

| Onboarding                               | Sign In                              | Sign Up                              |
| ---------------------------------------- | ------------------------------------ | ------------------------------------ |
| ![Onboarding](./screenshots/screen1.png) | ![Signin](./screenshots/screen2.png) | ![Signup](./screenshots/screen3.png) |

| Verify Email                         | Reset Password                      | Register                                |
| ------------------------------------ | ----------------------------------- | --------------------------------------- |
| ![Verify](./screenshots/screen5.png) | ![Reset](./screenshots/screen4.png) | ![Register](./screenshots/screen6a.png) |

| Profile Display                        | Edit Profile                        |
| -------------------------------------- | ----------------------------------- |
| ![Profile](./screenshots/screen7a.png) | ![Edit](./screenshots/screen8a.png) |

---

## Key Features

- Email OTP verification with countdown
- Animated profile cards using **Framer Motion**
- Avatar and document upload with preview
- Responsive UI using **Tailwind CSS**
- Centralized state via **React Context API**
- Mobile-first design
- Real-time form validation and notifications

---

## Tech Stack

- React.js + Vite
- Tailwind CSS
- React Router DOM
- Axios (API communication)
- React Toastify (alerts and notifications)
- Framer Motion (animations)

---

## Project Structure

```
hireConnect-app/
├── public/                   # Static files
├── src/
│   ├── assets/               # Logos, images
│   ├── components/           # Reusable UI components
│   ├── context/              # Global state via AppContext
│   ├── layout/               # Page layout (e.g., AuthLayout)
│   ├── pages/                # Main route pages (Register, Profile, etc.)
│   ├── api/                  # Axios API calls
│   ├── styles/               # Global and page-specific CSS
│   ├── App.jsx               # Main router and route guards
│   └── main.jsx              # App entry point
├── .env                      # Environment variables
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Tenyne-Internship-Projects/team-bravo-profile-card-app.git
cd team-bravo-profile-card-app/hireConnect-app
```

### 2. Set Environment Variables

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:3000
```

> Replace with your live backend URL in production.

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

> App runs locally on: `http://localhost:5173`

---

## Route Overview

| Path              | Page Component    | Description                             |
| ----------------- | ----------------- | --------------------------------------- |
| `/`               | `Onboarding.jsx`  | Landing page / onboarding               |
| `/register`       | `Register.jsx`    | Register new user profile               |
| `/login`          | `Signin.jsx`      | Login with email and password           |
| `/verify-email`   | `Emailverify.jsx` | Email OTP verification                  |
| `/reset-password` | `Resetpswd.jsx`   | Request and confirm password reset      |
| `/profile`        | `ProfileCard.jsx` | View authenticated user's profile       |
| `/edit-profile`   | `EditProfile.jsx` | Update profile details and upload files |

---

## API Integration

All API requests use Axios with a dynamic `VITE_BACKEND_URL`.

```js
axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, payload);
```

> Ensure CORS is enabled on the backend for development and production.

---

## File Upload Flow

### Avatar Upload

- Avatar files are uploaded via `form-data` to `/api/profile/upload-avatar`
- Preview and update profile image instantly

### Document Uploads

- Up to 5 PDF/DOCX files supported via `/api/profile/documents`
- Visual tags added to display uploaded filenames

---

## Testing (Manual)

Use browser devtools or Postman to:

- Inspect API responses for registration and verification
- Confirm JWT tokens are stored (via cookies or localStorage)
- Check document/avatar upload size and MIME type restrictions

---

## Deployment

Frontend is Vite-powered and optimized for deployment on platforms like **Vercel**, **Netlify**, or **Render**.

> For Vercel:

```bash
npm run build
# Deploy `/dist` folder
```

Ensure correct `VITE_BACKEND_URL` is set in Vercel Environment Settings.

---

## To-Do / Improvements

- [ ] Offline/No-network handling
- [ ] Dark mode toggle
- [ ] Drag-and-drop document upload
- [ ] Better responsive preview for large document filenames
- [ ] Full Cypress test coverage

---

## Team Bravo Members

| Name            | Role            |
| --------------- | --------------- |
| Light Ikoyo     | Backend         |
| Ashaolu Samson  | Backend         |
| Ja’Afar Sallau  | Frontend        |
| Dandy Friday    | Frontend        |
| Victor Idebi    | QA              |
| Solomon Ogar    | Product Manager |
| Emmanuel Olowo  | UI/UX           |
| Omoshebi Akanni | UI/UX           |

---

## Contributing

We welcome PRs and collaboration!

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature

# 3. Commit and push
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a Pull Request to the `main` branch.

---

## Acknowledgments

Thanks to **Tenyne Technologies** for leading this collaborative learning experience. Special appreciation to every intern and mentor who contributed to this project.

> “Great things in business are never done by one person. They’re done by a team.” – Steve Jobs

---
