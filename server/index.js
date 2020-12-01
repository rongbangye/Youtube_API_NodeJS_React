const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

// Cors allows frontend make a request to my backend
app.use(cors());

// GET Request
app.get('/videosYT', (req, res) => {
  const playlistId = 'PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH';
  const maxResults = 30;
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
  fetch(`${url}`)
    .then((response) => response.json())
    .then((json) => {
      res.json(json);
    });
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({ message: error.message });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 3001;
app.listen(port, () => {
  console.log(`App Listening on port: ${port}`);
});
