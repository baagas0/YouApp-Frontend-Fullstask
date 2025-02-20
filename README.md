
# YouApp Frontend Test

This project is a mobile web app built using Next.js 13 with the App Router, following the provided Figma design. The application is styled using custom and modular Tailwind CSS configurations and follows best practices in React architecture and design patterns.

The app connects to the provided YouApp API for authentication and profile management. Additionally, Capacitor has been integrated to build and deploy the app as a mobile application for both Android and iOS.

### Handling Missing API Fields
Since the API does not implement user picture and gender fields, the following solutions have been applied:

    1. User pictures are stored and managed via local storage instead of being retrieved from the API.
    2. Gender selection has been implemented in the frontend but is not sent or retrieved from the backend.

### Features Implemented
    1. Authentication

    User Login (POST /api/login)
    User Registration (POST /api/register)
    Secure session handling with cookies/localStorage.

    2. Profile Management

    Fetch Profile Data (GET /api/profile).
    Update User Profile (PUT /api/profile).
    Horoscope and Zodiac information displayed in the profile.
    User Picture is stored in Local Storage instead of API.
    Gender selection is implemented but not saved to the backend.

    3. Mobile App with Capacitor

    Build the app for Android and iOS.
    Access native device features if needed (e.g., Camera, Storage).
    Run mobile-specific optimizations for a smooth experience.

    4. UI/UX & Styling

    Follows Figma design guidelines precisely.
    Custom Tailwind CSS configurations for maintainability.
    Responsive layout, ensuring smooth mobile experience.

    5. Code Architecture & Best Practices

    Component-based structure for reusability.
    API layer abstraction to manage requests efficiently.
    Server Components & Client Components where appropriate.




## Installation

Clone nestjs-backend-youapp from github

```bash
  git clone https://github.com/baagas0/YouApp-Frontend-Fullstask.git
  cd YouApp-Frontend-Fullstask
  npm install
  set-up envirolment
  npm run dev
```

Feel free to using my env
```bash
    NEXT_PUBLIC_IS_MOBILE=true
    NEXT_PUBLIC_API_URL=https://techtest.youapp.ai
```
    
## Android Apps
Im build debug android app and available to download, file on the root project directory

[Download Apk](https://github.com/baagas0/YouApp-Frontend-Fullstask/blob/main/app-debug.apk)

## Docker Compose
To build with docker and running up

```bash
    docker-compose up --build
```