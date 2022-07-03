const service = require("./tables.service"); 
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * CRUD functions
 */

//List 
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

//Create 
async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

/**
 * Request validation functions
 */

//Table name
function tableNameIsValid(req, res, next){
  const { data: { table_name } = {} } = req.body;
  if (table_name && table_name.length > 2){
    next();
  } else {
    next({
      status: 400,
      message: "Table must have a name with at least two characters."
    });
  };
}

//Capacity
function capacityIsValid(req, res, next){
  const { data: { capacity } = {} } = req.body;
  if (capacity && capacity > 0 && typeof(capacity) === "number"){
    next();
  } else {
    next({
      status: 400,
      message: "Table capacity must be a number that is greater than 0."
    });
  };
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [tableNameIsValid, capacityIsValid, asyncErrorBoundary(create)],
};