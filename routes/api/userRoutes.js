const router = require('express').Router();
const User = require('../../models/User');


router.get('/', async (req, res) => {
  try {
      const users = await User.find({}).populate('thoughts').populate('friends');
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        // Bonus: Remove user's associated thoughts
        await Thought.deleteMany({ username: user.username });

        await user.remove();
        res.json({ message: 'User successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
