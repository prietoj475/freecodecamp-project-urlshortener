require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dns = require('dns');
const shortId = require('shortid');
const app = express();

const mySecret = process.env['MONGODB_CONNECT'];
mongoose.connect(mySecret, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Basic Configuration
const port = process.env.PORT || 3000;

const Schema = mongoose.Schema;
const urlSchema = new Schema({"url": String, "shortUrl": String});
const Url = mongoose.model("Url", urlSchema);

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const urlVerification = (req,res,next) => {
  var url = req.body.url;

  if ((!url) || (!url.startsWith("https://"))) {
    return res.json({"error":"invalid URL"});
  };
  
  var parsed_url = url.split("//")[1];
  var parsed_url = url.split("www.")[1];

  dns.lookup(parsed_url, (err) => {
    if (err) return res.json({error: "invalid url"});
    next();
  });
};

// Your first API endpoint

app.post('/api/shorturl', urlVerification, (req,res) => {
  Url.findOne({url: req.body.url}, (err, model) => {
    if (err) return res.json({error: "findOne error"});
    if (model) {
      res.json({original_url: model.url, short_url: model.shortUrl});
    }
    else {
      new_model = new Url({url:req.body.url, shortUrl: shortId.generate()});
      new_model.save((err,data) => {
        if (err) return res.json({error: "save error"});
        res.json({ original_url: data.url, short_url: data.shortUrl});
      });
    };
  });
});

app.get('/api/shorturl/:shortUrl?', (req,res) => {
  var urlId = req.params.shortUrl;
  Url.findOne({shortUrl: urlId}, (err,model) => {
    if (err || model == null) return res.json({error: "invalid url"});
    res.redirect(model.url);
  });
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});