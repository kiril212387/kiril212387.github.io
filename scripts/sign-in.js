const formElements = document.forms;

const signInFormElement = formElements.namedItem("sign-in");

const passwordInput = signInFormElement.elements.namedItem("password");
const passwordVisibilityCheckbox = signInFormElement.elements.namedItem("password-visibility");
const firstNameInput = signInFormElement.elements.namedItem("first-name");
const lastNameInput = signInFormElement.elements.namedItem("last-name");
const emailInput = signInFormElement.elements.namedItem("email");

function showPassword() {
    passwordInput.type = "text";
}

function hidePassword() {
    passwordInput.type = "password";
}

if (passwordVisibilityCheckbox.checked) {
    showPassword();
} else {
    hidePassword();
}

signInFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const payload = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
        password: sha256(passwordInput.value),
    };

    const json = JSON.stringify(payload);

    alert(json);
});

passwordVisibilityCheckbox.addEventListener("change", () => {
    if (passwordVisibilityCheckbox.checked) {
        showPassword();
    } else {
        hidePassword();
    }
});
