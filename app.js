const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const activitiesRouter = require('./routes/activities');
const factsRouter = require('./routes/facts');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/activitiesDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use('/activities', activitiesRouter);
activitiesRouter.use('/:activityId/facts', factsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
