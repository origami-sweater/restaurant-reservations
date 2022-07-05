const knex = require("../db/connection");
const tableName = "reservations";

//List
function listByDate(reservation_date){
    return knex(tableName)
        .select("*")
        .where({ reservation_date })
        .orderBy("reservation_time")
}

//Create
function create(newReservation){
    return knex(tableName)
        .insert(newReservation)
        .returning("*")
        .then((inserted) => inserted[0]);
}

//Read
function read(reservation_id){
    return knex(tableName)
        .where({ reservation_id })
        .first();
}

module.exports = {
    listByDate,
    create,
    read,
}
