import * as validation from "./validation.js";
import * as validationMessages from "./validation-messages.js";
import * as db from "./db.js";
import * as session from "./session.js";

(() => {

{
    const user = session.getUser();

    if (user !== null) {
        const isNormalUser = db.getUserWithHash(user.firstName, user.lastName, user.password) !== null;

        if (isNormalUser) {
            location = "/user-page";
            return;
        }

        const isAdminUser = db.getAdminWithHash(user.firstName, user.lastName, user.password) !== null;

        if (isAdminUser) {
            location = "/admin-page";
            return;
        }

        throw new Error("Щось пішло не так");
    }
}

const signUpFormElement = document.forms.namedItem("sign-up");

const firstNameInput = signUpFormElement.elements.namedItem("first-name");
const lastNameInput = signUpFormElement.elements.namedItem("last-name");
const emailInput = signUpFormElement.elements.namedItem("email");
const passwordInput = signUpFormElement.elements.namedItem("password");
const passwordVisibilityCheckbox = signUpFormElement.elements.namedItem("password-visibility");

const firstNameInputError = firstNameInput.parentElement.querySelector("[data-field-error]");
const lastNameInputError = lastNameInput.parentElement.querySelector("[data-field-error]");
const emailInputError = emailInput.parentElement.querySelector("[data-field-error]");
const passwordInputError = passwordInput.parentElement.querySelector("[data-field-error]");
const button = signUpFormElement.querySelector("button[type=submit]");

{
    const validationCode = validation.checkName(firstNameInput.value);
    const newValidationMessage = validationMessages.firstName(validationCode) ?? "";
    firstNameInput.setCustomValidity(newValidationMessage);
    firstNameInputError.textContent = newValidationMessage;
}

firstNameInput.addEventListener("input", () => {
    const lastValidityValid = firstNameInput.validity.valid;

    const validationCode = validation.checkName(firstNameInput.value);
    const newValidationMessage = validationMessages.firstName(validationCode) ?? "";
    if (firstNameInput.validationMessage !== newValidationMessage) {
        firstNameInput.setCustomValidity(newValidationMessage);
        firstNameInputError.textContent = newValidationMessage;

        if (lastValidityValid !== firstNameInput.validity.valid) {
            button.disabled = !signUpFormElement.checkValidity();
        }
    }
});

{
    const validationCode = validation.checkName(lastNameInput.value);
    const newValidationMessage = validationMessages.lastName(validationCode) ?? "";
    lastNameInput.setCustomValidity(newValidationMessage);
    lastNameInputError.textContent = newValidationMessage;
}

lastNameInput.addEventListener("input", () => {
    const lastValidityValid = lastNameInput.validity.valid;

    const validationCode = validation.checkName(lastNameInput.value);
    const newValidationMessage = validationMessages.lastName(validationCode) ?? "";
    if (lastNameInput.validationMessage !== newValidationMessage) {
        lastNameInput.setCustomValidity(newValidationMessage);
        lastNameInputError.textContent = newValidationMessage;

        if (lastValidityValid !== lastNameInput.validity.valid) {
            button.disabled = !signUpFormElement.checkValidity();
        }
    }
});

{
    const validationCode = validation.checkEmail(emailInput.value);
    const newValidationMessage = validationMessages.email(validationCode) ?? "";
    emailInput.setCustomValidity(newValidationMessage);
    emailInputError.textContent = newValidationMessage;
}

emailInput.addEventListener("input", () => {
    const lastValidityValid = emailInput.validity.valid;

    const validationCode = validation.checkEmail(emailInput.value);
    const newValidationMessage = validationMessages.email(validationCode) ?? "";
    if (emailInput.validationMessage !== newValidationMessage) {
        emailInput.setCustomValidity(newValidationMessage);
        emailInputError.textContent = newValidationMessage;

        if (lastValidityValid !== emailInput.validity.valid) {
            button.disabled = !signUpFormElement.checkValidity();
        }
    }
});

{
    const validationCode = validation.checkPassword(passwordInput.value);
    const newValidationMessage = validationMessages.password(validationCode) ?? "";
    passwordInput.setCustomValidity(newValidationMessage);
    passwordInputError.textContent = newValidationMessage;
}

passwordInput.addEventListener("input", () => {
    const lastValidityValid = passwordInput.validity.valid;

    const validationCode = validation.checkPassword(passwordInput.value);
    const newValidationMessage = validationMessages.password(validationCode) ?? "";
    if (passwordInput.validationMessage !== newValidationMessage) {
        passwordInput.setCustomValidity(newValidationMessage);
        passwordInputError.textContent = newValidationMessage;

        if (lastValidityValid !== passwordInput.validity.valid) {
            button.disabled = !signUpFormElement.checkValidity();
        }
    }
});

if (passwordVisibilityCheckbox.checked) {
    passwordInput.type = "text";
} else {
    passwordInput.type = "password";
}

passwordVisibilityCheckbox.addEventListener("change", () => {
    if (passwordVisibilityCheckbox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

button.disabled = !signUpFormElement.checkValidity();

signUpFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!signUpFormElement.reportValidity()) {
        return;
    }

    const newUser = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }

    if (!db.insertUser(newUser)) {
        alert("Невдалося створити користувача!");
        return;
    }

    location = "/log-in";
});

})();
