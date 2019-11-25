const {Router} = require('express');
const router = Router();

const _user = require('../models/User.model');


router.get('/', (req, res)=> res.send('<h1>Hello world</h1>'));

router.post('/signup', (req,res)=>{
    console.log(req.body);
    res.send('Register');
})

module.exports = router;