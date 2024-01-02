const router = require('express').Router();
const User = require('../../models/Thought');

router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found!' });
        }

        thought.reactions.push(req.body);
        await thought.save();
        res.status(200).json({ message: 'Reaction added successfully!', thought });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found!' });
        }

        const reactionIndex = thought.reactions.findIndex(reaction => reaction.reactionId.equals(req.params.reactionId));
        if (reactionIndex !== -1) {
            thought.reactions.splice(reactionIndex, 1);
            await thought.save();
            res.status(200).json({ message: 'Reaction removed successfully!', thought });
        } else {
            res.status(404).json({ message: 'Reaction not found!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
