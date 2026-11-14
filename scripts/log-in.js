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

const firstNameError = firstNameInput.parentElement.querySelector("[data-field-error]");
const lastNameError = lastNameInput.parentElement.querySelector("[data-field-error]");
const passwordError = passwordInput.parentElement.querySelector("[data-field-error]");
const button = logInFormElement.querySelector("button[type=submit]");

function setupInput(inputElement, errorElement, validate, validationMessage) {
    {
        const validationCode = validate(inputElement.value);
        const newValidationMessage = validationMessage(validationCode) ?? "";
        inputElement.setCustomValidity(newValidationMessage);
        errorElement.textContent = newValidationMessage;
    }

    inputElement.addEventListener("input", () => {
        const lastValidityValid = inputElement.validity.valid;

        const validationCode = validate(inputElement.value);
        const newValidationMessage = validationMessage(validationCode) ?? "";
        if (inputElement.validationMessage !== newValidationMessage) {
            inputElement.setCustomValidity(newValidationMessage);
            errorElement.textContent = newValidationMessage;

            if (lastValidityValid !== inputElement.validity.valid) {
                button.disabled = !logInFormElement.checkValidity();
            }
        }
    });
}

setupInput(firstNameInput, firstNameError, validation.checkName, validationMessages.firstName);
setupInput(lastNameInput, lastNameError, validation.checkName, validationMessages.lastName);
setupInput(passwordInput, passwordError, validation.checkPassword, validationMessages.password);

function togglePasswordVisibility() {
    if (passwordVisibilityCheckbox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

passwordVisibilityCheckbox.addEventListener("change", () => { togglePasswordVisibility() });

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
