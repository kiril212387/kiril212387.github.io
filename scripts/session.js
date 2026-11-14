const USER_KEY = "user";

export function updateUser(firstName, lastName, passwordHash) {
    sessionStorage.setItem(USER_KEY, JSON.stringify({ firstName: firstName, lastName: lastName, password: passwordHash }));
}

export function getUser() {
    const user = sessionStorage.getItem(USER_KEY);

    if (typeof(user) !== "string") {
        return null;
    }

    return JSON.parse(user) ?? null;
}
