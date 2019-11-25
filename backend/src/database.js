const mongoose = require('mongoose');
const URI = 'mongodb://localhost/MEANAuth';

mongoose.connect(URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(db=> console.log('Database is connected'))
.catch(err => console.log(err));