/**
 * Defines the router for table resources.
 *
 * @type {Router}
 */

 const router = require("express").Router();
 const controller = require("./tables.controller");
 const methodNotAllowed = require("../errors/methodNotAllowed");
 
 router.route("/new")
     .post(controller.create)
     .all(methodNotAllowed);
 
 router.route("/")
     .get(controller.list)
     .all(methodNotAllowed);
 
 module.exports = router;