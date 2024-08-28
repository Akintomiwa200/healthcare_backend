

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.dbUri)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    })
    .catch(err => console.error('Could not connect to MongoDB', err));
