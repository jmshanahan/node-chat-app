const express = require('express');
const path = require('path');

var app = new express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {

    res.render('index');
});

app.listen(port, () => { console.log(`Server is up on port ${port}`) });

