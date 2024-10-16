# 📝 NoteX

Welcome to **NoteX**! This is a simple yet powerful app designed for taking, organizing, and managing your notes in one place. Whether you want to group your notes, update them, or just read through your thoughts, NoteX has you covered. All notes are securely stored in a **MongoDB** database, ensuring your data is safe and accessible anytime.

## 🌐 Live Demo

Check out **NoteX** live: [https://notex-ramim.vercel.app/](https://notex-ramim.vercel.app/) 🚀

## ✨ Features

- **🔐 Google Authentication**: Secure login using your Google account via Firebase.
- **🗂️ Note Management**: Create, update, read, and group your notes effortlessly.
- **⚡ Popup Login**: Sleek and responsive popup login experience.
- **🔄 Real-Time Syncing**: Notes are saved in real-time and stored securely in MongoDB.
- **👤 User Info from Google**: No need for a profile page! We automatically pull your profile information from Google.
- **🎨 Shadcn UI**: Clean and modern UI built using **Shadcn UI** for an intuitive and beautiful experience.

## 🛠️ Technologies Used

### Frontend
- **Next.js (14.2.3)**: For building the UI and managing the frontend experience.
- **React.js (18)**: The library powering the app's UI components.
- **Shadcn UI**: For stunning and responsive UI components.
- **Radix UI**: A library of accessible, unstyled components used for popups, dialogs, tooltips, and more.
- **Tailwind CSS**: For rapid styling and custom themes.

### Backend
- **Node.js & Express.js**: Handles API requests and routes to serve data to the frontend.
- **MongoDB**: A NoSQL database for storing and managing notes data.

### Authentication
- **Firebase Authentication**: Seamless login using Google, no need for extra credentials.

## 📦 Key Dependencies

Here’s a list of key dependencies that power the NoteX app:

- **Firebase**: ^10.13.2
- **@radix-ui/react-dialog**: ^1.0.5
- **@tanstack/react-query**: ^5.56.2 for efficient data fetching and caching.
- **axios**: ^1.7.7 for making HTTP requests.
- **recoil**: ^0.7.7 for state management.
- **tailwindcss-animate**: ^1.0.7 for smooth animations.

## 📄 Scripts

- **`dev`**: Starts the development server.
- **`build`**: Builds the app for production.
- **`start`**: Starts the app in production mode.
- **`pages:build`**: Runs Cloudflare Pages build script for deployment.

## ⚡ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Raaaaaaamim/NoteX.git
   cd NoteX/frontend

