import * as db from "./db.js";
import * as session from "./session.js";

const user = session.getUser();

if (user === null) {
    location = "/log-in";
} else if (db.getAdminWithHash(user.firstName, user.lastName, user.password) !== null) {
    location = "/admin-page";
} else if (db.getUserWithHash(user.firstName, user.lastName, user.password) !== null) {
    location = "/user-page";
} else {
    location = "/sign-up";
}
