const CONSTRAINTS = Object.freeze({
    NAME: {
        maxLength: 20,
        pattern: /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/,
    },
    NAME_FIRST_LETTER: {
        pattern: /^[A-ZА-ЯІЇЄҐ]/,
    },
    EMAIL: {
        maxLength: 254,
    },
    EMAIL_USER: {
        maxLength: 64,
        pattern: /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~.]+(?<!\.)$/,
    },
    EMAIL_DOMAIN: {
        maxLength: 254,
        pattern: /^((?!\-)[A-Za-z0-9-]{1,63}(?<!\-))((?!\-)\.[A-Za-z0-9-]{1,63}(?<!\-))+(?<!\.)$/,
    },
    PASSWORD: {
        minLength: 8,
        maxLength: 32,
        pattern: /^[A-Za-z0-9!@#$%^&amp;*_\-=+?]+$/,
    },
    PASSWORD_UPPER: {
        pattern: /[A-Z]/,
    },
    PASSWORD_LOWER: {
        pattern: /[a-z]/,
    },
    PASSWORD_DIGIT: {
        pattern: /[0-9]/,
    },
    PASSWORD_SYMBOL: {
        pattern: /[!@#$%^&amp;*]/,
    },
})

const MESSAGES = Object.freeze({
    FIRST_NAME: {
        required: "Ім’я необхідне поле",
        maxLength: `Ім’я повинно містити менше символів за ${CONSTRAINTS.NAME.maxLength + 1}`,
        pattern: "Ім’я містить тільки англійські та українські букви",
        firstLetter: "Ім’я повинно починатися з великої букви",
    },
    LAST_NAME: {
        required: "Прізвище необхідне поле",
        maxLength: `Прізвище повинно містити менше символів за ${CONSTRAINTS.NAME.maxLength + 1}`,
        pattern: "Прізвище містить тільки англійські та українські букви",
        firstLetter: "Прізвище повинно починатися з великої букви",
    },
    EMAIL: {
        required: "Електронна пошта обов’язкове поле",
        separator: "Електронна пошта не містить @",
        maxLength: `Електрона пошта перевищує ліміт символів: ${CONSTRAINTS.EMAIL.maxLength}!`,
        user: `Частина користувача повинна бути менше ${CONSTRAINTS.EMAIL_USER.maxLength + 1} та відповідати вимогам`,
        domain: `Частина домену повинна бути менше ${CONSTRAINTS.EMAIL_DOMAIN.maxLength + 1} та відповідати вимогам`,
    },
    PASSWORD: {
        required: "Пароль обов’язкове поле",
        minLength: `Пароль менше мінімальної кількості символів: ${CONSTRAINTS.PASSWORD.minLength}!`,
        maxLength: `Пароль мовинен містити максимум ${CONSTRAINTS.PASSWORD.maxLength} символів`,
        pattern: "Пароль може містити символи A-Z a-z 0-9 !@#$%^&amp;*_\-=+?",
        upperLetter: "Пароль повинен містити як мінімум одну велику літеру",
        lowerLetter: "Пароль повинен містити як мінімум одну малу літеру",
        digit: "Пароль повинен містити як мінімум одну цифру",
        symbol: "Пароль повинен містити як мінімум один спеціальний символ",
    },
})

const EMAIL_SEPARATOR = "@";

function validateFirstName(firstName) {
    if (firstName.length == 0) {
        return MESSAGES.FIRST_NAME.required;
    }

    if (firstName.length > CONSTRAINTS.NAME.maxLength) {
        return MESSAGES.FIRST_NAME.maxLength;
    }

    if (!CONSTRAINTS.NAME.pattern.test(firstName)) {
        return MESSAGES.FIRST_NAME.pattern;
    }

    if (!CONSTRAINTS.NAME_FIRST_LETTER.pattern.test(firstName)) {
        return MESSAGES.FIRST_NAME.firstLetter;
    }

    return null;
}

function validateLastName(lastName) {
    if (lastName.length == 0) {
        return MESSAGES.LAST_NAME.required;
    }

    if (lastName.length > CONSTRAINTS.NAME.maxLength) {
        return MESSAGES.LAST_NAME.maxLength;
    }

    if (!CONSTRAINTS.NAME.pattern.test(lastName)) {
        return MESSAGES.LAST_NAME.pattern;
    }

    if (!CONSTRAINTS.NAME_FIRST_LETTER.pattern.test(lastName)) {
        return MESSAGES.LAST_NAME.firstLetter;
    }

    return null;
}

function validateEmail(email) {
    if (email.length == 0) {
        return MESSAGES.EMAIL.required;
    }

    if (email.length > CONSTRAINTS.EMAIL.maxLength) {
        return MESSAGES.EMAIL.maxLength;
    }

    const parts = email.split(EMAIL_SEPARATOR);

    if (parts.length != 2) {
        return MESSAGES.EMAIL.separator;
    }

    const [user, domain] = parts;

    if (user.length > CONSTRAINTS.EMAIL_USER.maxLength) {
        return MESSAGES.EMAIL.user;
    }

    if (!CONSTRAINTS.EMAIL_USER.pattern.test(user)) {
        return MESSAGES.EMAIL.user;
    }

    if (domain.length > CONSTRAINTS.EMAIL_DOMAIN.maxLength) {
        return MESSAGES.EMAIL.domain;
    }

    if (!CONSTRAINTS.EMAIL_DOMAIN.pattern.test(domain)) {
        return MESSAGES.EMAIL.domain;
    }

    return null;
}

function validatePassword(password) {
    if (password.length == 0) {
        return MESSAGES.PASSWORD.required;
    }

    if (password.length < CONSTRAINTS.PASSWORD.minLength) {
        return MESSAGES.PASSWORD.minLength;
    }

    if (password.length > CONSTRAINTS.PASSWORD.maxLength) {
        return MESSAGES.PASSWORD.maxLength;
    }

    if (!CONSTRAINTS.PASSWORD.pattern.test(password)) {
        return MESSAGES.PASSWORD.pattern;
    }

    if (!CONSTRAINTS.PASSWORD_UPPER.pattern.test(password)) {
        return MESSAGES.PASSWORD.upperLetter;
    }

    if (!CONSTRAINTS.PASSWORD_LOWER.pattern.test(password)) {
        return MESSAGES.PASSWORD.lowerLetter;
    }

    if (!CONSTRAINTS.PASSWORD_DIGIT.pattern.test(password)) {
        return MESSAGES.PASSWORD.digit;
    }

    if (!CONSTRAINTS.PASSWORD_SYMBOL.pattern.test(password)) {
        return MESSAGES.PASSWORD.symbol;
    }

    return null;
}

const formElements = document.forms;
const signInFormElement = formElements.namedItem("sign-in");

const firstNameInput = signInFormElement.elements.namedItem("first-name");
const lastNameInput = signInFormElement.elements.namedItem("last-name");
const emailInput = signInFormElement.elements.namedItem("email");
const passwordInput = signInFormElement.elements.namedItem("password");
const passwordVisibilityCheckbox = signInFormElement.elements.namedItem("password-visibility");

const firstNameInputError = firstNameInput.parentElement.querySelector("[data-field-error]");
const lastNameInputError = lastNameInput.parentElement.querySelector("[data-field-error]");
const emailInputError = emailInput.parentElement.querySelector("[data-field-error]");
const passwordInputError = passwordInput.parentElement.querySelector("[data-field-error]");
const button = signInFormElement.querySelector("button[type=submit]");

firstNameInput.setCustomValidity(validateFirstName(firstNameInput.value) ?? "");
firstNameInputError.textContent = firstNameInput.validationMessage;

firstNameInput.addEventListener("input", () => {
    const lastValidityValid = firstNameInput.validity.valid;

    const newValidationMessage = validateFirstName(firstNameInput.value) ?? "";
    if (firstNameInput.validationMessage != newValidationMessage) {
        firstNameInput.setCustomValidity(newValidationMessage);
        firstNameInputError.textContent = newValidationMessage;

        if (lastValidityValid != firstNameInput.validity.valid) {
            button.disabled = !signInFormElement.checkValidity();
        }
    }
});

lastNameInput.setCustomValidity(validateLastName(lastNameInput.value) ?? "");
lastNameInputError.textContent = lastNameInput.validationMessage;

lastNameInput.addEventListener("input", () => {
    const lastValidityValid = lastNameInput.validity.valid;

    const newValidationMessage = validateLastName(lastNameInput.value) ?? "";
    if (lastNameInput.validationMessage != newValidationMessage) {
        lastNameInput.setCustomValidity(newValidationMessage);
        lastNameInputError.textContent = newValidationMessage;

        if (lastValidityValid != lastNameInput.validity.valid) {
            button.disabled = !signInFormElement.checkValidity();
        }
    }
});

emailInput.setCustomValidity(validateEmail(emailInput.value) ?? "");
emailInputError.textContent = emailInput.validationMessage;

emailInput.addEventListener("input", () => {
    const lastValidityValid = emailInput.validity.valid;

    const newValidationMessage = validateEmail(emailInput.value) ?? "";
    if (emailInput.validationMessage != newValidationMessage) {
        emailInput.setCustomValidity(newValidationMessage);
        emailInputError.textContent = newValidationMessage;

        if (lastValidityValid != emailInput.validity.valid) {
            button.disabled = !signInFormElement.checkValidity();
        }
    }
});

passwordInput.setCustomValidity(validatePassword(passwordInput.value) ?? "");
passwordInputError.textContent = passwordInput.validationMessage;

passwordInput.addEventListener("input", () => {
    const lastValidityValid = passwordInput.validity.valid;

    const newValidationMessage = validatePassword(passwordInput.value) ?? "";
    if (passwordInput.validationMessage != newValidationMessage) {
        passwordInput.setCustomValidity(newValidationMessage);
        passwordInputError.textContent = newValidationMessage;

        if (lastValidityValid != passwordInput.validity.valid) {
            button.disabled = !signInFormElement.checkValidity();
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

button.disabled = !signInFormElement.checkValidity();

signInFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!signInFormElement.reportValidity()) {
        return;
    }

    const payload = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
        password: sha256(passwordInput.value),
    };

    const json = JSON.stringify(payload);

    alert(json);
});
