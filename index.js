const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Middleware to parse incoming JSON data

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://kc29garcia:fGbkuJdZ6P3lKwJy@mtg-cluster.3igeh.mongodb.net/?retryWrites=true&w=majority&appName=MTG-Cluster",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error));

// Schema definition
const cardSchema = new mongoose.Schema({
  cardName: { type: String, required: true }, // Ensure field names match
  manaType: { type: String, required: true },
  storageLocation: { type: String, required: true }, // Add this line
});

// Model
const Card = mongoose.model("Card", cardSchema);

// POST request to add a card
app.post("/cards", async (req, res) => {
  try {
    const { cardName, manaType } = req.body; // Change cardname to cardName

    // Get storage location based on mana type
    const storageLocation = getLocationBasedOnManaType(manaType);

    // Create new card
    const newCard = new Card({ cardName, manaType, storageLocation }); // Ensure field names match
    await newCard.save();

    res
      .status(201)
      .json({ message: "Card successfully added!", card: newCard });
  } catch (error) {
    res.status(500).json({ message: "Failed to add card", error });
  }
});

// Function to get the storage location based on mana type
function getLocationBasedOnManaType(manaType) {
  const storageMap = {
    Mountain: "Box 1 - Mountain Mana",
    Forest: "Box 2 - Forest Mana",
    Island: "Box 3 - Island Mana",
    Swamp: "Box 4 - Swamp Mana",
    Plains: "Box 5 - Plains Mana",
  };
  return storageMap[manaType] || "Unknown";
}

// GET request to retrieve all cards
app.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cards", error });
  }
});

// Route to get a card by its name
app.get("/cards/:cardName", async (req, res) => {
  try {
    const cardName = req.params.cardName;
    const card = await Card.findOne({ cardName }); // Ensure field names match

    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json({ message: "Card not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching card", error });
  }
});
