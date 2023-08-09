# Process Control App

This is a web application for process control that allows users to record measurements and visualize them in charts.

## Getting Started

These instructions will help you set up and run the Process Control App on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- MongoDB installed and running on your machine.
	- Install and set up MongoDB according to your operating system. Visit the [MongoDB Installation Documentation](https://docs.mongodb.com/manual/administration/install-community/) for detailed instructions. 
	- Create a database named `process-control-db`.

### Clone Github Repository
    git clone https://github.com/shivudu1994/process-monitoring-application.git
### Front-end Setup

1. Navigate to the `front-end` folder:

    `cd front-end`

2. Install the required dependencies:

    `npm install`
    
3. Start the development server:
 `npm start `

The front-end of the application should now be accessible at `http://localhost:3000`.

### Back-end Setup

1. Navigate to the `back-end` folder:
 `cd back-end `
2. Install the required dependencies:
 `npm install `

4. Create a `.env` file in the `back-end` folder and provide the following environment variables:

    `PORT=<PORT_NUMBER> MONGODB_URI=<your_mongodb_uri>`
    
5. Start the back-end server:
 `npm start `

The back-end server should now be running at `http://localhost:PORT_NUMBER`.

### Accessing the Application

Open your web browser and navigate to `http://localhost:3000` to access the Process Control App.