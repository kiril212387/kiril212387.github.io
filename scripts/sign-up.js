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

const firstNameError = firstNameInput.parentElement.querySelector("[data-field-error]");
const lastNameError = lastNameInput.parentElement.querySelector("[data-field-error]");
const emailError = emailInput.parentElement.querySelector("[data-field-error]");
const passwordError = passwordInput.parentElement.querySelector("[data-field-error]");
const button = signUpFormElement.querySelector("button[type=submit]");

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
                button.disabled = !signUpFormElement.checkValidity();
            }
        }
    });
}

setupInput(firstNameInput, firstNameError, validation.checkName, validationMessages.firstName);
setupInput(lastNameInput, lastNameError, validation.checkName, validationMessages.lastName);
setupInput(emailInput, emailError, validation.checkEmail, validationMessages.email);
setupInput(passwordInput, passwordError, validation.checkPassword, validationMessages.password);

function togglePasswordVisibility() {
    if (passwordVisibilityCheckbox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

passwordVisibilityCheckbox.addEventListener("change", () => { togglePasswordVisibility() });

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
