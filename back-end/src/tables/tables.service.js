const knex = require("../db/connection");
const tableName = "tables";

//List
function list(){
    return knex(tableName)
        .select("*")
        .orderBy("table_name");
}

//Create
function create(newTable){
    return knex(tableName)
        .insert(newTable)
        .returning("*")
        .then((inserted) => inserted[0]);
}

module.exports = {
    list,
    create,
}