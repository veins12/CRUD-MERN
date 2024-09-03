const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();

// POST /activities - Add a new activity
router.post('/', async (req, res) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /activities - List all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /activities/:activityId - Delete an activity and all related facts
router.delete('/:activityId', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
