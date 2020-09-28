require('isomorphic-fetch');

const { parse } = require('url');
const { send } = require('micro');

module.exports = async (req, res) => {
  let { query } = parse(req.url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  searchData(query)
    .then((data) => {
      send(res, 200, data);
    })
    .catch((error) => {
      send(res, 500, error);
    });
};

const searchData = (query) =>
  fetch(`https://example.com/${query}`).then((resp) => resp.json());
