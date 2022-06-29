const express = require("express");
const mongoose = require("mongoose");
const fetch = require('node-fetch');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

/*Сделать свое API для выкачки картинок с pixabay*/

const key = '23798924-17f42c690434b5dec74a9c318';

app.get('/', function (req, res) {
    return res.send("<p>Hello Api<p/><p>Example</p><p>http://127.0.0.1:3000/api/?q=boobs</p>");
})

app.get('/api', function (request, response) {
    const q = request.query.q;
    fetch(`https://pixabay.com/api/?key=${key}&image_type=photo&q=${q}`)
        .then(res => res.json())
        .then(json => json.hits)
        .then(hits => hits.map(hit => hit.webformatURL))
        .then(arrUrl => response.send(arrUrl))
})

mongoose.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});