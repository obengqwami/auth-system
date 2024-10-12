const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

const users = [];

const findUser = (username) => users.find(user => user.username === username);

// 1. Create an account
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (findUser(username)) {
        return res.status(400).json({ message: 'Username already exists.' });
    }

    users.push({ username, password });
    res.status(201).json({ message: 'Account created successfully.' });
});

// 2. Sign in
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = findUser(username);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    res.json({ message: 'Sign in successful.' });
});

// 3. Change password
app.post('/change-password', (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    const user = findUser(username);

    if (!user || user.password !== currentPassword) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    user.password = newPassword;
    res.json({ message: 'Password changed successfully.' });
});

// 4. Delete account
app.delete('/delete-account', (req, res) => {
    const { username, password } = req.body;
    const userIndex = users.findIndex(user => user.username === username && user.password === password);

    if (userIndex === -1) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    users.splice(userIndex, 1);
    res.json({ message: 'Account deleted successfully.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
