const userFirstName = document.querySelector("[data-user-first-name]");
const userLastName = document.querySelector("[data-user-last-name]");
const userEmail = document.querySelector("[data-user-email]");
const userPassword = document.querySelector("[data-user-password]");

export function update(user) {
    userFirstName.textContent = user.firstName;
    userLastName.textContent = user.lastName;
    userEmail.textContent = user.email.length === 0 ? "-" : user.email;
    userPassword.textContent = user.password;
}
