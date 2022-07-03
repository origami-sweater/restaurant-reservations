const service = require("./tables.service"); 
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * CRUD functions
 */

//List 
async function list(req, res) {
  const data = res.locals.reservations;
  res.json({ data });
}

//Create 
async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
    list: [asyncErrorBoundary(determineList), list],
    create: [asyncErrorBoundary(create)],
};