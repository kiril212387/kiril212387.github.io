import * as validation from "./validation.js";

const UNEXPECTED_ENUM_MESSAGE = "Неочікуване число перерахування";

function name(code, messages) {
    switch (code) {
        case validation.CODE.SUCCESS: return null;
        case validation.CODE.NAME_EMPTY: return messages.EMPTY;
        case validation.CODE.NAME_MAXLENGTH: return messages.MAXLENGTH;
        case validation.CODE.NAME: return messages.PATTERN;
        case validation.CODE.NAME_FIRST_LETTER: return messages.FIRST_LETTER;
        default: throw new Error(UNEXPECTED_ENUM_MESSAGE);
    }
}

export const firstName = (code) => name(code, {
    EMPTY: "Ім’я необхідне поле",
    MAXLENGTH: `Ім’я повинно містити менше символів за ${validation.RULES.NAME.MAXLENGTH + 1}`,
    PATTERN: "Ім’я містить тільки англійські та українські букви",
    FIRST_LETTER: "Ім’я повинно починатися з великої букви",
});

export const lastName = (code) => name(code, {
    EMPTY: "Прізвище необхідне поле",
    MAXLENGTH: `Прізвище повинно містити менше символів за ${validation.RULES.NAME.MAXLENGTH + 1}`,
    PATTERN: "Прізвище містить тільки англійські та українські букви",
    FIRST_LETTER: "Прізвище повинно починатися з великої букви",
});

export function email(code) {
    switch (code) {
        case validation.CODE.SUCCESS: return null;
        case validation.CODE.EMAIL_MAXLENGTH: return `Електронна пошта перевищує ліміт символів: ${validation.RULES.EMAIL.MAXLENGTH}!`;
        case validation.CODE.EMAIL_AT_SIGN: return "Електронна пошта не містить @";
        case validation.CODE.EMAIL_USER_MAXLENGTH:
        case validation.CODE.EMAIL_USER:
            return `Частина користувача повинна бути менше ${validation.RULES.EMAIL_USER.MAXLENGTH + 1} та відповідати вимогам`;
        case validation.CODE.EMAIL_DOMAIN_MAXLENGTH:
        case validation.CODE.EMAIL_DOMAIN:
            return `Частина домену повинна бути менше ${validation.RULES.EMAIL_DOMAIN.MAXLENGTH + 1} та відповідати вимогам`;
        default: throw new Error(UNEXPECTED_ENUM_MESSAGE);
    }
}

export function password(code) {
    switch (code) {
        case validation.CODE.SUCCESS: return null;
        case validation.CODE.PASSWORD_EMPTY: return "Пароль обов’язкове поле";
        case validation.CODE.PASSWORD_MINLENGTH: return `Пароль менше мінімальної кількості символів: ${validation.RULES.PASSWORD.MINLENGTH}!`;
        case validation.CODE.PASSWORD_MAXLENGTH: return `Пароль мовинен містити максимум ${validation.RULES.PASSWORD.MAXLENGTH} символів`;
        case validation.CODE.PASSWORD: return "Пароль може містити символи A-Z a-z 0-9 !@#$%^&amp;*_-=+?";
        case validation.CODE.PASSWORD_LOWER_LETTER: return "Пароль повинен містити як мінімум одну малу літеру";
        case validation.CODE.PASSWORD_UPPER_LETTER: return "Пароль повинен містити як мінімум одну велику літеру";
        case validation.CODE.PASSWORD_DIGIT: return "Пароль повинен містити як мінімум одну цифру";
        case validation.CODE.PASSWORD_SYMBOL: return "Пароль повинен містити як мінімум один спеціальний символ";
        default: throw new Error(UNEXPECTED_ENUM_MESSAGE);
    }
}
