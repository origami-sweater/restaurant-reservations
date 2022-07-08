const service = require("./tables.service"); 
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

//Delete - clears out reservation_id fromt able
async function unseat(req, res){
  const table = res.locals.table; 
  const unseatedTable = {
    ...table,
    reservation_id: null
  };
  await service.update(unseatedTable);
  res.json({});
}

/**
 * Request validation functions
 */

//Valid request - makes sure request data required exists
function isValidRequest(req, res, next){
  const { data } = req.body;
  if(!data){
    next({
      status: 400,
      message: "The request must contain data."
    });
  } else if(!data.reservation_id){
    next({
      status: 400,
      message: "The request must have a reservation_id"
    });
  } else {
    next();
  };
}

//Table name
function tableNameIsValid(req, res, next){
  const { data: { table_name } = {} } = req.body;
  if (table_name && table_name.length > 2){
    next();
  } else {
    next({
      status: 400,
      message: "The table_name must be at least two characters."
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

function capacityGreaterThanPeople(req, res, next){
  const { capacity } = res.locals.table;
  const { people } = res.locals.reservation;
  if(capacity >= people){
    next();
  } else {
    next({
      status: 400,
      message: "The selected table's capacity is less than the number of people."
    });
  }
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


//Reservation_id
function tableIsOpen(req, res, next){
  const { reservation_id } = res.locals.table;
  if(reservation_id === null){
    next();
  } else {
    next({
      status: 400,
      message: "The selected table is already occupied."
    });
  };
}

function tableIsOccupied(req, res, next){
  const { reservation_id } = res.locals.table;
  if(reservation_id !== null){
    next();
  } else {
    next({
      status: 400,
      message: "The selected table is not occupied."
    });
  };
}

//Reservation exists - makes sure reservation exists prior to seating
async function reservationExists(req, res, next){
  const { reservation_id } = req.body.data;
  const foundReservation = await reservationsService.read(reservation_id);
  if (foundReservation){
      res.locals.reservation = foundReservation;
      next();
  } else {
    next({
      status: 404,
      message: `Reservation does not exist : ${reservation_id}`
    });
  };
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [tableNameIsValid, capacityIsValid, asyncErrorBoundary(create)],
    update: [
      isValidRequest,
      asyncErrorBoundary(tableExists), 
      asyncErrorBoundary(reservationExists),
      tableIsOpen,
      capacityGreaterThanPeople,
      asyncErrorBoundary(update)
    ],
    unseat: [asyncErrorBoundary(tableExists), tableIsOccupied, asyncErrorBoundary(unseat)],
};