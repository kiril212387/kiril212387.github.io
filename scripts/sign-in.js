const formElements = document.forms;

const signInFormElement = formElements.namedItem("sign-in");

const passwordInput = signInFormElement.elements.namedItem("password");
const passwordVisibilityCheckbox = signInFormElement.elements.namedItem("password-visibility");

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

passwordVisibilityCheckbox.addEventListener("change", () => {
    if (passwordVisibilityCheckbox.checked) {
        showPassword();
    } else {
        hidePassword();
    }
});
