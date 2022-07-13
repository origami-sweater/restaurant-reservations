const service = require("./reservations.service"); 
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * CRUD functions
 */

//List 
function list(req, res) {
  const data = res.locals.reservations;
  res.json({ data });
}

//Create 
async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

//Read
function read(req, res){
  const data = res.locals.reservation;
  res.json({ data });
}

//Update
async function updateReservation(req, res){
  const updatedReservation = req.body.data;
  const data = await service.update(updatedReservation);
  res.json({ data });
}

async function updateStatus(req, res){
  const { status } = req.body.data;
  const reservation = res.locals.reservation;
  const updatedReservation = {
      ...reservation,
      status: status,
    };
  const data = await service.update(updatedReservation);
  res.json({ data });
}
/**
 * Request validation functions
 */

//Status
function statusIsValid(req, res, next){
  const { status } = req.body.data;
  if(status && status === "booked" || status === "seated" || status === "finished" || status === "cancelled"){
    next();
  } else {
    next({
      status: 400,
      message: "The reservation status cannot be unknown."
    });
  };
}

function statusIsBooked(req, res, next){
  const { status } = req.body.data;
  if(status === "finished"|| status === "seated" || status === "cancelled"){
    next({
      status: 400,
      message: "Reservations cannot be created with a status of seated or finished."
    });
  } else {
    next();
  };
}

function statusIsNotFinished(req, res, next){
  const { status } = res.locals.reservation;
  if(status === "finished"){
    next({
      status: 400,
      message: "Reservations with a finished status cannot change to booked or seated."
    });
  } else {
    next();
  };
}

//Determines how to filter reservations list view
async function determineList(req, res, next){
  if(req.query.date){
    const reservations = await service.listByDate(req.query.date);
    res.locals.reservations = reservations;
    return next();
  } else if(req.query.mobile_number){
    const reservations = await service.listIfMobileMatch(req.query.mobile_number);
    res.locals.reservations = reservations;
    return next();
  } else {
    next({
      status: 400,
      message: "Reservations list needs a query."
    });
  };
}

//First name
function firstNameIsValid(req, res, next){
  const { data: { first_name } = {} } = req.body;
  if (first_name && first_name.length > 0){
    next();
  } else {
    next({
      status: 400,
      message: "Reservation must have first_name."
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
      message: "Reservation must have last_name."
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
      message: "Reservation must have valid mobile_number."
    });
  };
}

//Reservation date format validation
function dateIsValid(req, res, next){
  const { data: { reservation_date } = {} } = req.body;
  /*List of valid date characters:*/
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  /*validates date characters:*/
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
      message: "Reservation must have valid reservation_date."
    });
  };
}

//No reservations on Tuesdays - for some reason days of week 6 -sunday, 0 - monday, etc...
function noTuesdays(req, res, next){
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  const reformatDate = new Date(`${reservation_date} ${reservation_time}`);
  const dayOfWeek = reformatDate.getDay();
  if(dayOfWeek !== 2){
    next();
  } else {
    next({
      status: 400,
      message: "The restaurant is closed on Tuesdays. Please choose a different day."
    });
  };
}

//No reservations in past 
function futureTimesOnly(req, res, next){
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  const resDateTime = reservation_date.concat(" ", reservation_time,":00");
  const reformatDate = new Date(resDateTime).valueOf();
  const now = new Date().valueOf();

  if(reformatDate > now){
    next();
  } else {
    next({
      status: 400,
      message: "The reservation_time must be in the future."
    });
  };
}

//Reservation time format validation
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
      message: "Reservation must have valid reservation_time."
    });
  };
}

//Only reservations during reservation hours
function isReservableTime(req, res, next){
  const { data: { reservation_time } = {} } = req.body;
  reformatTime = reservation_time.replace(":", "");
  numberTime = Number(reformatTime);
  console.log(reservation_time, reformatTime, numberTime);
  if(numberTime > 2130 && numberTime <= 2230){
    next({
      status: 400,
      message: "Reservation time cannot be within an hour of closing."
    });
  } else if(numberTime < 1030 || numberTime > 2230){
    next({
      status: 400,
      message: "Reservation time must be between 10:30AM & 9:30PM."
    });
  } else {
    next();
  }
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

//Reservation exists - searches table for reservation matching url param reservation_id
async function reservationExists(req, res, next){
  const reservation_id = req.params.reservation_id;
  const foundReservation = await service.read(reservation_id);
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
  list: [asyncErrorBoundary(determineList), list],
  create: [
    firstNameIsValid,
    lastNameIsValid, 
    mobileNumberIsValid,
    dateIsValid,
    futureTimesOnly,
    noTuesdays,
    isReservableTime,
    timeIsValid,
    peopleIsValid,
    statusIsBooked,
    asyncErrorBoundary(create)
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  updateReservation: [
    asyncErrorBoundary(reservationExists),
    firstNameIsValid,
    lastNameIsValid, 
    mobileNumberIsValid,
    dateIsValid,
    futureTimesOnly,
    noTuesdays,
    isReservableTime,
    timeIsValid,
    peopleIsValid,
    statusIsValid,
    statusIsBooked,
    asyncErrorBoundary(updateReservation)
  ],
  updateStatus: [
    statusIsValid,
    asyncErrorBoundary(reservationExists), 
    statusIsNotFinished,
    asyncErrorBoundary(updateStatus)
  ],
};
