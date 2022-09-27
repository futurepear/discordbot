const createAcre = require('./create-acre');

module.exports = function(id){
  return {
    id: id, 
    money: 0,
    createdAt: Date.now(),
    workInterval: 0,
    acres: {"Acre 0": {filled: 0}},
    "Acre 0": createAcre()
  }
}