# Expense Tracker App

Aplikasi web untuk melacak pengeluaran yang dibangun menggunakan React + Vite dengan Tailwind CSS. Aplikasi ini memiliki sistem autentikasi dan dashboard untuk mengelola data pengeluaran.

## 🚀 Teknologi yang Digunakan

- **React 18** - Library JavaScript untuk membangun UI
- **Vite** - Build tool yang cepat untuk development
- **React Router DOM** - Routing untuk navigasi antar halaman
- **Tailwind CSS** - Framework CSS utility-first
- **React Icons** - Library ikon untuk React
- **Google Fonts (Poppins)** - Font custom untuk UI

## 📁 Struktur Proyek

### Root Files
- `index.html` - Entry point HTML utama
- `vite.config.js` - Konfigurasi Vite build tool
- `tailwind.config.js` - Konfigurasi Tailwind CSS dengan font Poppins
- `eslint.config.js` - Konfigurasi ESLint untuk code quality
- `package.json` - Dependencies dan scripts npm

### Source Code (`src/`)

#### Main Files
- **`main.jsx`** - Entry point React, render App component ke DOM
- **`App.jsx`** - Root component dengan routing setup menggunakan React Router
- **`index.css`** - Global styles dengan Tailwind directives dan custom components

#### Components (`src/components/`)
- **`InputField.jsx`** - Reusable input component dengan fitur:
  - Support untuk berbagai tipe input (text, password, email)
  - Toggle visibility untuk password field
  - Styling konsisten dengan Tailwind
  - Props: value, onChange, label, placeholder, type

- **`SelectField.jsx`** - Reusable select dropdown component dengan fitur:
  - Native HTML select element
  - Dynamic options dari props
  - Styling konsisten dengan InputField
  - Props: label, value, onChange, options
  - Default option sebagai placeholder

#### Layouts (`src/layouts/`)
- **`AuthLayout.jsx`** - Layout wrapper untuk halaman autentikasi:
  - Header dengan title "Expense Tracker"
  - Responsive design untuk mobile dan desktop
  - Container styling untuk form autentikasi

#### Pages (`src/pages/`)

##### Auth Pages (`src/pages/Auth/`)
- **`Login.jsx`** - Halaman login dengan fitur:
  - Form validasi email dan password
  - Validasi email menggunakan regex
  - Error handling dan display
  - Link navigasi ke halaman SignUp
  - Integration dengan validateEmail utility

- **`SignUp.jsx`** - Halaman registrasi dengan fitur:
  - Form lengkap dengan first name, last name, email, password
  - SelectField component untuk dropdown options
  - Form validation untuk semua field termasuk select
  - Error handling dan display
  - Link navigasi ke halaman Login

##### Dashboard Pages (`src/pages/Dashboard/`)
- **`Home.jsx`** - Halaman dashboard utama (placeholder, belum diimplementasi)

#### Utilities (`src/validate/`)
- **`validateEmail.js`** - Utility function untuk validasi email:
  - Menggunakan regex pattern untuk validasi format email
  - Return boolean (true/false)
  - Pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

## 🎨 Styling & Design

### Tailwind Configuration
- Font default: Poppins dari Google Fonts
- Custom components: `.input-box` dan `.btn-primary`
- Color scheme: Purple/Violet theme dengan slate accents

### Custom CSS Classes
- **`.input-box`** - Styling untuk input fields dengan border dan spacing
- **`.btn-primary`** - Primary button dengan purple background dan hover effects

## 🔧 Fitur yang Sudah Diimplementasi

1. **Routing System** - Navigation antar halaman dengan React Router
2. **Authentication Layout** - Template untuk halaman login/signup
3. **Form Validation** - Email validation dengan regex
4. **Reusable Components** - InputField component yang fleksibel
5. **Responsive Design** - Mobile-first approach dengan Tailwind
6. **Password Toggle** - Show/hide password functionality
7. **Error Handling** - Display error messages untuk form validation

## 🚧 Status Development

### ✅ Completed
- Project setup dengan Vite + React
- Tailwind CSS configuration
- Basic routing structure
- Login page dengan validasi
- Reusable InputField component
- Email validation utility
- **[2025-10-28]** Login page dengan validasi dan InputField component
- **[2025-10-29]** SelectField component implementation
- **[2025-10-29]** SignUp page dengan form validation lengkap
- **[2025-01-XX]** Backend setup lengkap dengan Node.js + Express
- **[2025-01-XX]** Database configuration dengan MongoDB Atlas
- **[2025-01-XX]** User authentication system dengan JWT
- **[2025-01-XX]** Password hashing dengan bcryptjs
- **[2025-01-XX]** Environment variables configuration
- **[2025-01-XX]** API routes untuk auth (register, login, getUserInfo)
- **[2025-01-XX]** Middleware untuk JWT protection
- **[2025-01-XX]** User model dengan Mongoose schema
- **[2025-01-XX]** CORS configuration untuk frontend-backend communication
- **[2025-01-XX]** Tailwind CSS v3 migration dan @apply directive fixes

### 🔄 In Progress
- Frontend-backend integration
- Form submission handling untuk authentication
- Dashboard functionality

### 📋 Todo
- Connect frontend forms dengan backend API
- Dashboard/Home page functionality
- Expense tracking features
- Error handling improvement
- Loading states dan better UX

## 🐛 Known Issues & Fixes

1. **Font Loading**: Memerlukan restart development server setelah konfigurasi Tailwind ✅ Fixed
2. **SelectField**: Resolved React hooks conflict dengan native HTML select ✅ Fixed
3. **Tailwind @apply**: Fixed compatibility issues dengan v4 → v3 migration ✅ Fixed
4. **JWT Secret**: Generated secure random secret untuk production ✅ Fixed
5. **Import/Export**: Fixed ES6 module consistency di backend ✅ Fixed
6. **Database Connection**: Fixed import path untuk db.js ✅ Fixed
7. **User Model**: Fixed bcrypt typo dan export statement ✅ Fixed
8. **Auth Controller**: Fixed async/await dan response syntax errors ✅ Fixed

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Next Steps

1. Implementasi form submission untuk SignUp
2. Tambahkan authentication state management
3. Buat dashboard untuk expense tracking
4. Integrasikan dengan backend API
5. Tambahkan loading states dan better UX

## 📅 Development Log

- **2025-10-29**: Implementasi SelectField component dan SignUp form validation
- **2025-10-28**: Setup project, Login page, InputField component dengan password toggle
- **Initial**: Project setup dengan Vite + React + Tailwind CSS
