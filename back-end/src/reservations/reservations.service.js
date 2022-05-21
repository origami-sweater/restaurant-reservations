const knex = require("../db/connection");
const tableName = "reservations";

//List
//function list(){}

//Create
function create(newReservation){
    return knex(tableName)
        .insert(newReservation)
        .returning("*")
        .then((inserted) => inserted[0]);
}

module.exports = {
    create,
}
