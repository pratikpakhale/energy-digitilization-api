# Renewable Energy Management System

This is a web application built using Node.js, Express, and MongoDB that provides a centralized platform for managing renewable energy data, tracking assets, setting objectives, and automating processes for building and maintaining renewable energy plants.

## Getting Started

To get started with this project, you'll need to follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js and MongoDB on your machine if you haven't already.
3. Open a terminal and navigate to the project directory.
4. Run `npm install` to install all the dependencies.
5. Create a `.env` file and set the required environment variables (see `.env.example` for reference).
6. Run `npm start` to start the server.

## Features

This web application includes the following features:

- User authentication and authorization using JWT
- CRUD operations for managing Users, Assets, EnergyData, Objectives, and PowerPlants
- Data visualization using Chart.js
- Integration with MongoDB Atlas for cloud-based database storage
- Automated testing using Jest and Supertest

## API Routes

Here are the available API routes for this application:

### Users
- POST `/api/users/signup`: Create a new user account
- POST `/api/users/login`: Log in to an existing user account
- GET `/api/users/🆔`: Get user information by ID
- PUT `/api/users/🆔`: Update user information by ID
- DELETE `/api/users/🆔`: Delete user by ID

### Assets
- POST `/api/assets`: Create a new asset
- GET `/api/assets/🆔`: Get asset information by ID
- PUT `/api/assets/🆔`: Update asset information by ID
- DELETE `/api/assets/🆔`: Delete asset by ID

### EnergyData
- POST `/api/energydata`: Create a new energy data entry
- GET `/api/energydata/🆔`: Get energy data by ID
- PUT `/api/energydata/🆔`: Update energy data by ID
- DELETE `/api/energydata/🆔`: Delete energy data by ID

### Objectives
- POST `/api/objectives`: Create a new objective
- GET `/api/objectives/🆔`: Get objective by ID
- PUT `/api/objectives/🆔`: Update objective by ID
- DELETE `/api/objectives/🆔`: Delete objective by ID

### PowerPlants
- POST `/api/powerplants`: Create a new power plant
- GET `/api/powerplants/🆔`: Get power plant information by ID
- PUT `/api/powerplants/🆔`: Update power plant information by ID
- DELETE `/api/powerplants/🆔`: Delete power plant by ID

## Data Visualization

To view a visualization of the energy data stored in the database, you can send a GET request to the `/api/energydata/visualize` route. This will trigger the `processDataForVisualization` function in the `energydata.controller.js` file, which will prepare the data for visualization using Chart.js. The resulting chart image will be returned as a response.

## Testing

To run the automated tests for this application, you can use the following command:

```bash
npm test
```
