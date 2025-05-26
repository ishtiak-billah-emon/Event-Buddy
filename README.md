# Event Buddy - Frontend Internship Assignment

## Project Overview

Event Buddy is a simplified event booking system developed as part of the Deepchain Labs Internship Round 1 Technical Test. This frontend-only application allows users to browse upcoming and past events, book seats for events, and view their bookings. It also provides an admin interface for managing events, including creating, editing, viewing, and deleting events. The application uses dummy data stored in localStorage to simulate dynamic content without backend integration, following the provided Figma design for UI layout and structure.

## Features

### Public Site (Unauthenticated View)

- **Homepage**: Displays a list of upcoming events as cards and a separate section for past events.
- **Event Details Page**: Clicking an event card navigates to a detailed view with a full event description and a "Book Now" button.
- **Mock Login/Signup**: The "Book Now" button prompts a mock login/signup interaction for unauthenticated users.

### User Dashboard (Authenticated View)

- **Login/Signup Simulation**: Users can log in using any credentials except the admin credentials (email: `admin@eventbuddy.com`, password: `admin123`).
- **Event Booking**: Logged-in users can book 1–4 seats for upcoming events.
- **My Bookings Page**: Displays a list of the user’s previously booked events.

### Admin Dashboard (Authenticated Admin View)

- **Admin Login**: Admins log in using the credentials:
  - Email: `admin@eventbuddy.com`
  - Password: `admin123`
- **Event Management**: Admins can:
  - View a list of all events.
  - Edit, delete, or view details of each event.
  - Create new events via a form.

## Technology Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Language**: Javascript
- **Additional Dependency**: React Icons (`npm install react-icons --save`)

## Setup and Run Instructions

To set up and run the project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd event-buddy

   ```

2. **Install Dependencies: Ensure you have Node.js installed. Then, run:**

npm install
npm install react-icons --save
Run the Application: Start the development server:
npm run dev
The application will be available at http://localhost:3000.
Access the Application:
Open your browser and navigate to http://localhost:3000.
To log in as an admin, use:
Email: admin@eventbuddy.com
Password: admin123
For user access, use any other email and password combination.
Implementation Details
