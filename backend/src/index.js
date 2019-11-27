const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

require('./database');

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
//app.use(express.urlencoded({extended:false}));


app.use('/api/',require('./routes/routes.index'));
//middleware

//Run server
app.listen(app.get('port'),
()=>console.log(`Server is running on port ${app.get('port')}`));