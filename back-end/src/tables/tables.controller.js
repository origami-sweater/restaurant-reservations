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

//Update
async function update(req, res){
  const { reservation_id } = req.body.data;
  const table = res.locals.table;
  const updatedTable = {
      ...table,
      reservation_id: reservation_id,
    };
  const data = await service.update(updatedTable);
  res.json({ data });
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

//Table exists - searches table for table matching url param table_id
async function tableExists(req, res, next){
  const table_id = req.params.table_id;
  const foundTable = await service.read(table_id);
  if (foundTable){
      res.locals.table = foundTable;
      next();
  } else {
    next({
      status: 404,
      message: `Table does not exist: ${table_id}`
    });
  };
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [tableNameIsValid, capacityIsValid, asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(tableExists), asyncErrorBoundary(update)]
};