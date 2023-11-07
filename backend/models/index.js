const path = require('path');
const fs = require('fs');

// Register's all routes and models
const registerModels = async () => {
  const modelsFolder = path.resolve('./models');
  const models = fs.readdirSync(modelsFolder);
  models.map((nestedModel) => {
    const model = nestedModel.replace('.js', '');
    return require(path.resolve(`${modelsFolder}/${model}`));
  });
};

module.exports = {
  registerModels,
};
