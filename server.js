// server.js
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3002;

// Resolve the __dirname value for ES modules
const __dirname = path.resolve();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:"+PORT);
});