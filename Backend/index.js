const res = require('express/lib/response');

const app = require('express')();
const PORT = 8080;

app.get('/tshirt', () => {
    res.status(200).send({
        tshirt: 'item',
        size: 'largee'
    })
});