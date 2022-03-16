const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation, createNoteValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Note = require('../model/Note');


router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    const emailExist = await User.findOne({ email: req.body.email });
    const nameExist = await User.findOne({name: req.body.name})

    if (emailExist) {
        return res.status(400).json({error: 'Email already registered!'});
    }else if(nameExist){
        return res.status(400).json({error: 'Username already registered!'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPssword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        name: req.body.name,
        email: req.body.email,
        notes: req.body.notes,
        password: hashPssword
    });

    try {
        const savedUser = await user.save();
        const token = jwt.sign({_id: user._id, first_name: user.first_name, last_name: user.last_name, name: user.name, notes: user.notes, email: user.email}, process.env.TOKEN_SECRET);
        const info = jwt.decode(token, process.env.TOKEN_SECRET)
        res.json({ user: user._id, redirect: 'securePage', token, info});
        console.log(info)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({error: 'Not a registered email!'});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).json({error: 'Invalid password!'});
    }

    const token = jwt.sign({_id: user._id, first_name: user.first_name, last_name: user.last_name, name: user.name, notes: user.notes, email: user.email}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({token: token, redirect: 'securePage'});

});

router.post("/createNote", async (req, res) => {
    const { error } = createNoteValidation(req.body);
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }

    var noteExist = await Note.findOne({ name: req.body.name, owner: req.body.owner });
    if(noteExist){
        return res.status(400).json({error: 'Note already exists!'});
    }

    console.log(req.body.name)
    console.log(req.body.content)
    console.log(req.body.owner)

    const note = new Note({
        name: req.body.name,
        content: req.body.content,
        owner: req.body.owner
    })

    try {
        const savedNote = await note.save();
        res.header().json({redirect: 'securePage'});
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post("/notes", async (req, res) => {
    var test = await Note.find({
        owner: req.body.owner
    })

    res.json(test)
})

module.exports = router;