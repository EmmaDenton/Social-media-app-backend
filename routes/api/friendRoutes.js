const router = require('express').Router();
const User = require('../../models/User');

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }


        if (!user.friends.includes(req.params.friendId)) {
            user.friends.push(req.params.friendId);
            await user.save();
            res.status(200).json({ message: 'Friend added successfully!', user });
        } else {
            res.status(400).json({ message: 'This user is already a friend!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        if (user.friends.includes(req.params.friendId)) {
            user.friends.pull(req.params.friendId);
            await user.save();
            res.status(200).json({ message: 'Friend removed successfully!', user });
        } else {
            res.status(400).json({ message: 'This user is not a friend!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
