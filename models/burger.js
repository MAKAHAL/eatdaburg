
function Burger(name) {
  this.name = name;
  this.devoured = false;
}

Burger.selectBurgers = function () {
  return new Promise((resolve, reject) => {
      orm.all("BURGERS").then(results => {
          resolve(results);
      }).catch(() => {
          reject("Could not retrieve burgers");
      });
  });
};

Burger.create = function (burger) {
  return new Promise((resolve, reject) => {
      orm.create("BURGERS", {
          burger_name: burger.name,
          devoured: burger.devoured
      }).then(results => {
          // Get db generated ID
          burger.id = results.insertId;
          resolve(burger.id);
      }).catch(() => {
          reject("Could not add burger");
      });
  });
};

Burger.update = function (burgerId) {
  return new Promise((resolve, reject) => {
      orm.update("BURGERS", "DEVOURED", true, "ID", burgerId).then(results => {
          resolve(results);
      }).catch(() => {
          reject("Could not update burger");
      });
  })
};


module.exports = Burger;