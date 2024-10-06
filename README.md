# mtg-card-manager
Magic: The Gathering Card Manager
Description
This project is a full-stack web application designed to help users manage their Magic: The Gathering (MTG) cards. It allows users to add, search, and delete cards based on card name and mana type. The application also stores the location of the cards based on their mana type for easy deck building and organization.

Features
•	Add Cards: Users can add new cards to the database by providing the card name and mana type.
•	Search Cards: Users can search for a specific card by name and retrieve information such as mana type and storage location.
•	Delete Cards: Users can remove a card from the database by specifying the card name.
•	Card Storage Mapping: The application automatically assigns storage locations based on the mana type of each card.

Technologies Used
•	Backend:
o	Node.js with Express.js
o	MongoDB and Mongoose for data storage
•	Frontend:
o	React.js
o	Fetch API for communication between frontend and backend

Prerequisites
Before running this project, ensure you have the following installed:
•	Node.js (v14.x or above)
•	npm (Node package manager)
•	MongoDB Atlas or local MongoDB server

Installation
1.	Clone Repository
Git clone 
Cd mtg-card-manager

2.	Backend Setup
Navigate to the backend directory (where express.js is located)
Install dependencies: 
npm install

Configure MongoDB connection by updating the MongoDB URI in index.js:

mongoose.connect(
  "your-mongodb-connection-string",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

Start the backend server: 
npm start

3.	Frontend Setup
Navigate to the frontend directory (where your React app is located)

Install dependencies: 
npm start

4.	Access Application
Once both the backend and the frontend servers are started, open the browser and go to: http://localhost:3000

Frontend Components
1. AddCardForm:
Allows the user to add a new card by specifying the card name and mana type.
2. DeleteCardForm:
Allows the user to delete a card by entering the card name.
3. SearchCardForm:
Allows the user to search for a card by entering the card name and retrieving the card information (mana type and storage location).

