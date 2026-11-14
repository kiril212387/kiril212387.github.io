import * as validation from "./validation.js";

const DB_KEY = "db";

const DEFAULT_ADMIN_USER = Object.freeze({
    firstName: "Admin",
    lastName: "Admin",
    email: "",
    password: "016c2301c0d9ce5b2726d0c06587474736ef22ed9be3ebfe9c8fe9fce4c8e418", // SHA-256 хеш пароля "Secret1password$"
});

{
    if (typeof(localStorage.getItem(DB_KEY)) !== "string") {
        localStorage.removeItem(DB_KEY);

        const db = {
            admins: [DEFAULT_ADMIN_USER],
            users: [],
        };

        localStorage.setItem(DB_KEY, JSON.stringify(db));
    }
}

export function insertUser({ firstName, lastName, email, password}) {
    if (validation.checkName(firstName) !== validation.CODE.SUCCESS) {
        return false;
    }

    if (validation.checkName(lastName) !== validation.CODE.SUCCESS) {
        return false;
    }

    if (validation.checkEmail(email) !== validation.CODE.SUCCESS) {
        return false;
    }

    if (validation.checkPassword(password) !== validation.CODE.SUCCESS) {
        return false;
    }

    const db = JSON.parse(localStorage.getItem(DB_KEY));

    for (const user of db.users) {
        if (user.firstName === firstName && user.lastName === lastName) {
            return false;
        }
    };

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: sha256.sha256(password),
    }

    db.users.push(user);

    localStorage.setItem(DB_KEY, JSON.stringify(db));

    return true;
}

export function getUser(firstName, lastName, password) {
    if (validation.checkPassword(password) !== validation.CODE.SUCCESS) {
        return null;
    }

    const passwordHash = sha256.sha256(password);

    return getUserWithHash(firstName, lastName, passwordHash);
}

export function getUserWithHash(firstName, lastName, passwordHash) {
    if (validation.checkName(firstName) !== validation.CODE.SUCCESS) {
        return null;
    }

    if (validation.checkName(lastName) !== validation.CODE.SUCCESS) {
        return null;
    }

    const db = JSON.parse(localStorage.getItem(DB_KEY));
    const user = db.users.find((user) => user.firstName === firstName && user.lastName === lastName && user.password === passwordHash);

    return user ?? null;
}

export function getAdmin(firstName, lastName, password) {
    if (validation.checkPassword(password) !== validation.CODE.SUCCESS) {
        return null;
    }

    const passwordHash = sha256.sha256(password);

    return getAdminWithHash(firstName, lastName, passwordHash);
}

export function getAdminWithHash(firstName, lastName, passwordHash) {
    if (validation.checkName(firstName) !== validation.CODE.SUCCESS) {
        return null;
    }

    if (validation.checkName(lastName) !== validation.CODE.SUCCESS) {
        return null;
    }

    const db = JSON.parse(localStorage.getItem(DB_KEY));
    const admin = db.admins.find((admin) => admin.firstName === firstName && admin.lastName === lastName && admin.password === passwordHash);

    return admin ?? null;
}

export function getUsers() {
    const db = JSON.parse(localStorage.getItem(DB_KEY));

    return db.users;
}
