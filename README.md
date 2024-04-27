# Setting Up and Running the Event Management Platform

## Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine. You can download and install it from [nodejs.org](https://nodejs.org).
- **MongoDB**: You need MongoDB installed and running locally or have a MongoDB Atlas account. Install MongoDB from [mongodb.com](https://www.mongodb.com) or create an account on MongoDB Atlas.

## Installation Steps

1. **Clone the Repository**:
   - Open your terminal or command prompt.
   - Clone the repository to your local machine:
     ```
     git clone https://github.com/your-username/event-management-platform.git
     ```

2. **Navigate to the Project Directory**:
   - Change directory to the project folder:
     ```
     cd event-management-platform
     ```

3. **Install Dependencies**:
   - Navigate to the server directory and install backend dependencies:
     ```
     cd server
     npm install
     ```
   - Navigate to the client directory and install frontend dependencies:
     ```
     cd ../client
     npm install
     ```

4. **Set Up Environment Variables**:
   - Create a `.env` file in the `server` directory.
   - Add the following environment variables to the `.env` file:
     ```
     PORT=5000
     MONGODB_URI=your-mongodb-uri
     ```
   Replace `your-mongodb-uri` with your MongoDB connection URI.

5. **Start the Server**:
   - Start the backend server:
     ```
     npm start
     ```
   The server will run on port 5000 by default unless you specified a different port in the `.env` file.

6. **Start the React Development Server**:
   - Open another terminal window/tab.
   - Navigate to the `client` directory:
     ```
     cd ../client
     ```
   - Start the React development server:
     ```
     npm start
     ```

7. **Access the Application**:
   - Open your web browser.
   - Go to `http://localhost:3000` to access the Event Management Platform.

## Usage

- **User Actions**:
  - Browse upcoming events.
  - Book tickets for events.
  - Manage bookings from the user dashboard.
- **Admin Actions**:
  - Access the admin dashboard.
  - Manage events (create, edit, delete).
  - View all bookings and manage them.

### Additional Notes

- Ensure MongoDB is running locally or the MongoDB Atlas connection URI is correctly set in the `.env` file.
- Make sure both the backend server and frontend React development server are running simultaneously to use the application.
- The application is configured to run on `http://localhost:3000` by default for the React development server and on the port specified in the `.env` file for the backend server.

That's it! You've successfully set up and run the Event Management Platform. You can now explore and interact with the application as a user or an administrator.
