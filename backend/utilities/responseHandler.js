const genericResponse = async (req, res) => {
  const dummyResponse = {
    dummy: 'Dummy Response',
  };
  if (req.dummy) {
    req.data = dummyResponse;
  }

  const response = {};
  response.statusCode = req.statusCode || 200;
  response.data = req.data || {};
  response.message = req.message || 'OK';

  res.status(response.statusCode).json(response);
  res.end();
};

module.exports = {
  genericResponse,
};
