const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the interface.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'interface.html'));
});

// Path to the JSON file
const dataFilePath = path.join(__dirname, 'todoItems.json');

// Function to read data from the JSON file
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Route to get all to-do items
app.get('/items', (req, res) => {
    const todoItems = readData();
    res.json(todoItems);
});

// Route to create a new to-do item
app.post('/create-item', (req, res) => {
    const todoItems = readData();
    const newItem = req.body.item;
    todoItems.push(newItem);
    writeData(todoItems);
    res.json({ message: 'Item added successfully' });
});

// Route to delete a to-do item
app.post('/delete-item', (req, res) => {
    let todoItems = readData();
    const itemToDelete = req.body.item;
    todoItems = todoItems.filter(item => item !== itemToDelete);
    writeData(todoItems);
    res.json({ message: 'Item deleted successfully' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});