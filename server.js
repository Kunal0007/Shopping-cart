const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 5000
const cors = require("cors");

const fs = require("fs");
const url = require("url");
const http = require("http");

app.use(cors());
app.use('/uploads', express.static('public'));
app.use('/product/uploads', express.static('public'));
// app.use('/cart/uploads', express.static('public'));
app.use(express.json({ limit: '1mb' }));


app.get("/", (req, res) => {
  res.send("Server is running!!!");
});


app.get("/api/products", (req, res) => {
  fs.readFile(__dirname + "/" + "pizza.json", "utf8", (err, data) => {
    // console.log(data, err);
    res.end(data);
  });
});

app.get('/api/products/:version', (req, res) => {
  fs.readFile(__dirname + "/" + "pizza.json", "utf8", (err, data) => {
    var object = JSON.parse(data);
    var product = getProduct(object, req.params.version);
    var productObject = JSON.stringify(product);
    res.end(productObject);
  });
});

function getProduct(x, index) {
  var a = x.find(y => y._id === index);
  return a;
}

app.post("/api/products/cart-items", (req, res) => {
  const cart_ids = req.body.ids;
  // console.log(cart_ids);

  fs.readFile(__dirname + "/" + "pizza.json", "utf8", (err, data) => {
    var object = JSON.parse(data);
    var cart = getcartProduct(object, cart_ids);
    // console.log(cart);
    var cartObject = JSON.stringify(cart);
    // console.log(cartObject);
    res.end(cartObject);
  });
  // res.end(JSON.stringify(req.body));
})

function getcartProduct(x, cart_ids) {
  const cartproducts = cart_ids.map(id => {
    var a = x.find(y => y._id === id);
    return a;
  })
  return (cartproducts);
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
  });
}


app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
