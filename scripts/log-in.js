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

const logInFormElement = document.forms.namedItem("log-in");

const firstNameInput = logInFormElement.elements.namedItem("first-name");
const lastNameInput = logInFormElement.elements.namedItem("last-name");
const passwordInput = logInFormElement.elements.namedItem("password");
const passwordVisibilityCheckbox = logInFormElement.elements.namedItem("password-visibility");

const firstNameInputError = firstNameInput.parentElement.querySelector("[data-field-error]");
const lastNameInputError = lastNameInput.parentElement.querySelector("[data-field-error]");
const passwordInputError = passwordInput.parentElement.querySelector("[data-field-error]");
const button = logInFormElement.querySelector("button[type=submit]");

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
            button.disabled = !logInFormElement.checkValidity();
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
            button.disabled = !logInFormElement.checkValidity();
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
            button.disabled = !logInFormElement.checkValidity();
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

button.disabled = !logInFormElement.checkValidity();

logInFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!logInFormElement.reportValidity()) {
        return;
    }

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const password = passwordInput.value;

    const admin = db.getAdmin(firstName, lastName, password);

    if (admin !== null) {
        session.updateUser(admin.firstName, admin.lastName, admin.password);
        location = "/admin-page";
        return;
    }

    const user = db.getUser(firstName, lastName, password);

    if (user === null) {
        alert("Введений неправильний email або пароль");
        return;
    }

    session.updateUser(user.firstName, user.lastName, user.password);
    location = "/user-page";
});

})();
