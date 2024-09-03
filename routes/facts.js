const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router({ mergeParams: true });

// POST /activities/:activityId/facts - Add a new fact to an activity
router.post('/', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        const fact = { fact: req.body.fact };
        activity.facts.push(fact);
        await activity.save();
        res.status(201).json(activity.facts[activity.facts.length - 1]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /activities/:activityId/facts - List facts about an activity
router.get('/', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activity.facts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /activities/:activityId/facts/:factId - Edit a fact
router.put('/:factId', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        const fact = activity.facts.id(req.params.factId);
        if (!fact) {
            return res.status(404).json({ error: 'Fact not found' });
        }
        fact.fact = req.body.fact;
        await activity.save();
        res.json(fact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /activities/:activityId/facts/:factId - Delete a fact
router.delete('/:factId', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        const fact = activity.facts.id(req.params.factId);
        if (!fact) {
            return res.status(404).json({ error: 'Fact not found' });
        }
        fact.remove();
        await activity.save();
        res.json({ message: 'Fact deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
