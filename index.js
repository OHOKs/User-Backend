const express = require("express");
// Routes
const todoRoutes = require('./routes/todoRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json()); // A JSON kérések kezelése

// Útvononalak kezelése todo
app.use('/todos',todoRoutes); // Teendők útvonala

app.use('/api', userRouter); // USERS

// user útvonal

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Szerver fut a http://localhost:${PORT} címen`);
});