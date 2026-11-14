import * as db from "./db.js";
import * as session from "./session.js";
import * as personData from "./person-data.js";

(() => {

const sessionUser = session.getUser();

if (sessionUser === null) {
    location = "/log-in";
    return;
}

const user = db.getUserWithHash(sessionUser.firstName, sessionUser.lastName, sessionUser.password);

if (user === null) {
    location = "/access-denied";
    return;
}

personData.update(user);

})();
