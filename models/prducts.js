const fs = require('fs');
const path = require('path');



module.exports = class Products {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(path.dirname(require.main.filename),
      'data',
      'products.json');
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        })
      }
      products.push(this)
    });
  }

  static fetchAll(cb) {
    const p = path.join(path.dirname(require.main.filename),
      'data',
      'products.json');
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([])
        return [];
      }
      cb(JSON.parse(fileContent));
    })
  }
}
