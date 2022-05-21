const service = require("./reservations.service"); 
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * CRUD functions
 */

//List 
async function list(req, res) {
  res.json({
    data: [],
  });
}

//Create 
async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

/**
 * Request validation functions
 */

//First name
function firstNameIsValid(req, res, next){
  const { data: { first_name } = {} } = req.body;
  if (first_name && first_name.length > 0){
    next();
  } else {
    next({
      status: 400,
      message: "Reservation must have first name."
    });
  };
}

//Last name
function lastNameIsValid(req, res, next){
  const { data: { last_name } = {} } = req.body;
  if (last_name && last_name.length > 0){
    next();
  } else {
    next({
      status: 400,
      message: "Reservation must have last name."
    });
  };
}

//Mobile number
function mobileNumberIsValid(req, res, next){
  const { data: { mobile_number } = {} } = req.body;
  /*List of valid mobile number characters:*/
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    
  if (
    mobile_number 
    && mobile_number.length > 0
    /*Checking mobile_number against valid characters:*/
    && regex.test(mobile_number) === true
  ){
    next();
  } else {
    next({
      status: 400,
      message: "Reservation must have valid mobile number."
    });
  };
}

//Reservation date
function dateIsValid(req, res, next){
  const { data: { reservation_date } = {} } = req.body;
  /*List of valid date characters:*/
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (
    reservation_date 
    && reservation_date.length === 10
    /*Checking reservation_date against valid characters:*/
    && regex.test(reservation_date) === true
    ){
    next();
  } else {
    next({
      status: 400,
      message: "Reservation must have valid reservation date in yyyy-mm-dd format."
    });
  };
}

//Reservation time
function timeIsValid(req, res, next){
  const { data: { reservation_time } = {} } = req.body;
  /*List of valid time characters:*/
  const regex = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;

  if (
    reservation_time 
    && reservation_time.length === 5
    /*Checking reservation_time against valid characters:*/
    && regex.test(reservation_time) === true
    ){
    next();
  } else {
    next({
      status: 400,
      message: "Reservation must have valid reservation time in 00:00 format."
    });
  };
}

//People (attendees)
function peopleIsValid(req, res, next){
  const { data: { people } = {} } = req.body;
  if (people && typeof(people) === "number"){
    next();
  } else {
    next({
      status: 400,
      message: "Reservation must have the number of people attending."
    });
  };
}

module.exports = {
  list,
  create: [
    firstNameIsValid,
    lastNameIsValid, 
    mobileNumberIsValid,
    dateIsValid,
    timeIsValid,
    peopleIsValid,
    asyncErrorBoundary(create)
  ],
};
