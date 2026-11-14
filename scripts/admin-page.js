import * as db from "./db.js";
import * as session from "./session.js";
import * as personData from "./person-data.js";

(() => {

const sessionUser = session.getUser();

if (sessionUser == null) {
    location = "/log-in";
    return;
}

const user = db.getAdminWithHash(sessionUser.firstName, sessionUser.lastName, sessionUser.password);

if (user === null) {
    location = "/access-denied";
    return;
}

personData.update(user);

const usersElement = document.querySelector("[data-users]");
const userTemplate = document.querySelector("[data-user-template]");

const users = db.getUsers();

usersElement.innerHTML = "";

for (const regularUser of users) {
    regularUser.email = regularUser.email.length === 0 ? "-" : regularUser.email;

    const rendered = Mustache.render(userTemplate.innerHTML, regularUser);

    usersElement.insertAdjacentHTML("beforeend", rendered);
}

})();
