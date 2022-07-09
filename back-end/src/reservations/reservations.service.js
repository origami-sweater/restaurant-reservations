const knex = require("../db/connection");
const tableName = "reservations";

//List
function listByDate(reservation_date){
    return knex(tableName)
        .select("*")
        .where({ reservation_date })
        .where({"status": "booked"})
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

//Update
function update(updatedReservation){
    return knex(tableName)
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*")
        .then((updated) => updated[0]);
}

module.exports = {
    listByDate,
    create,
    read,
    update,
}
