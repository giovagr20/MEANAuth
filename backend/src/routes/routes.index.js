const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = Router();

const _user = require('../models/User.model');


router.get('/', (req, res) => res.send('<h1>Hello world</h1>'));

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const newUser = new _user({ email, password });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id },
        'secretKey');
    res.status(200).json(token);

});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await _user.findOne({ email });
    if (!user) return res.status(401).send("The email doesn't exist");
    if (user.password !== password) return res.status(401).send('Wrong password');

    const token = jwt.sign({ _id: user._id }, 'secretKey');
    res.status(200).json(token);

});

router.get('/task', async (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Giovanni',
            description: 'Lorem ipsum daf retop',
            date: '2019-11-25'
        },
        {
            _id: 2,
            name: 'Isabel',
            description: 'Lorem ipsum daf retop',
            date: '2019-11-25'
        },
        {
            _id: 3,
            name: 'Andrea',
            description: 'Lorem ipsum daf retop',
            date: '2019-11-25'
        }]);
});

router.get('/private-tasks', verifyToken,(req, res) => {
    res.json([{
        _id: 1,
        name: 'Giovanni',
        description: 'Lorem ipsum daf retop',
        date: '2019-11-25'
    },
    {
        _id: 2,
        name: 'Isabel',
        description: 'Lorem ipsum daf retop',
        date: '2019-11-25'
    },
    {
        _id: 3,
        name: 'Andrea',
        description: 'Lorem ipsum daf retop',
        date: '2019-11-25'
    }]);
});

router.get('/profile', verifyToken, (req,res)=>{
    res.send(req.userId);
});

module.exports = router;

function verifyToken(req,res,next){
 if(!req.headers.authorization) return res.status(401).send('Unauthorized request');

 const token=req.headers.authorization.split(' ')[1]

 if(token==='null'){
     return res.status(401).send('Unauthorized request');
 }

 const payload = jwt.verify(token, 'secretKey');
 req.userId = payload._id;
 next();
}