require('dotenv').config();
require('isomorphic-fetch');

const { parse } = require('url');
const { send } = require('micro');

module.exports = async (req, res) => {
  let { query } = parse(req.url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  query = query.replace(/\//g, /\%2F/);
  query = query.replace(/\%2F/g, /\//);

  searchData(query)
    .then((data) => {
      send(res, 200, data);
    })
    .catch((error) => {
      send(res, 500, error);
    });
};

const searchData = (query) =>
  fetch(`${process.env.URL}/${query}`).then((resp) => resp.json());
