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

//Read
function read(table_id){
    return knex(tableName)
        .select("*")
        .where({ table_id })
        .first();
}

//Update
function update(updatedTable){
    return knex(tableName)
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
        .then((updated) => updated[0]);
}

module.exports = {
    list,
    create,
    read,
    update,
}