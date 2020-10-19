const dbController = require('./dbController');
const userController = require('./userController');


exports.getPets = function(callback) {
    const user = userController.getUser().getUsername();
    const query = "SELECT name, type" +
                    " FROM own_pet_belong" +
                    " WHERE o.username = '" + user + "';";
    dbController.queryGet(query, (result) => {
         if(result.status == 200) {
            console.log(query);
             callback(result.body.rows, petname);
         } else {
             console.log("Failed.");
             console.log("Status code: " + result.status);
             callback([], "");
         }
     });
};


exports.addPet = function(requestBody, callback) {
    const user = userController.getUser().getUsername();
    console.log("Name: " + requestBody.petname + " Type: "+ requestBody.type +
            " Diet: " + requestBody.diet + " Walk: " + requestBody.walk);
    var added = "INSERT INTO own_pet_belong VALUES ('" + user + "', '" + requestBody.petname + "', '" +
                requestBody.type + "');";

    if (requestBody.diet != "None") {
        added = added + " INSERT INTO has VALUES ('" + user + "', '" + requestBody.petname + "', 'diet', '" +
             requestBody.diet + "');";
    }

    if (requestBody.walk != "None") {
        added = added + " INSERT INTO has VALUES ('" + user + "', '" + requestBody.petname + "', 'walk', '" +
             requestBody.walk + "');";
    }

    const query = added;
    console.log("Query: " + query);
    dbController.queryGet(query, (result) => {
        if(result.status == 200) {
            callback(result.body.rows);
        } else {
            console.log("Failed.");
            console.log("Status code: " + result.status);
            callback([]);
        }
    });
}