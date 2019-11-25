const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

require('./database');

app.use('/api/',require('./routes/routes.index'));

//middleware


//Run server
app.listen(app.get('port'), (req,res)=>{
    console.log(`Server is running on port ${app.get('port')}`);
})