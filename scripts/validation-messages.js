import * as validation from "./validation.js";

const UNEXPECTED_ENUM_MESSAGE = "Неочікуване число перерахування";

export const ERROR_MESSAGES = Object.freeze({
    FIRST_NAME: Object.freeze({
        EMPTY: "Ім’я необхідне поле",
        MAXLENGTH: `Ім’я повинно містити менше символів за ${validation.RULES.NAME.MAXLENGTH + 1}`,
        PATTERN: "Ім’я містить тільки англійські та українські букви",
        FIRST_LETTER: "Ім’я повинно починатися з великої букви",
    }),
    LAST_NAME: Object.freeze({
        EMPTY: "Прізвище необхідне поле",
        MAXLENGTH: `Прізвище повинно містити менше символів за ${validation.RULES.NAME.MAXLENGTH + 1}`,
        PATTERN: "Прізвище містить тільки англійські та українські букви",
        FIRST_LETTER: "Прізвище повинно починатися з великої букви",
    }),
    EMAIL: Object.freeze({
        AT_SIGN: "Електронна пошта не містить @",
        MAXLENGTH: `Електронна пошта перевищує ліміт символів: ${validation.RULES.EMAIL.MAXLENGTH}!`,
        USER: `Частина користувача повинна бути менше ${validation.RULES.EMAIL_USER.MAXLENGTH + 1} та відповідати вимогам`,
        DOMAIN: `Частина домену повинна бути менше ${validation.RULES.EMAIL_DOMAIN.MAXLENGTH + 1} та відповідати вимогам`,
    }),
    PASSWORD: Object.freeze({
        EMPTY: "Пароль обов’язкове поле",
        MINLENGTH: `Пароль менше мінімальної кількості символів: ${validation.RULES.PASSWORD.MINLENGTH}!`,
        MAXLENGTH: `Пароль мовинен містити максимум ${validation.RULES.PASSWORD.MAXLENGTH} символів`,
        PATTERN: "Пароль може містити символи A-Z a-z 0-9 !@#$%^&amp;*_-=+?",
        UPPER_LETTER: "Пароль повинен містити як мінімум одну велику літеру",
        LOWER_LETTER: "Пароль повинен містити як мінімум одну малу літеру",
        DIGIT: "Пароль повинен містити як мінімум одну цифру",
        SYMBOL: "Пароль повинен містити як мінімум один спеціальний символ",
    }),
})

export function firstName(code) {
    switch (code) {
        case validation.CODE.SUCCESS: return null;
        case validation.CODE.NAME_EMPTY: return ERROR_MESSAGES.FIRST_NAME.EMPTY;
        case validation.CODE.NAME_MAXLENGTH: return ERROR_MESSAGES.FIRST_NAME.MAXLENGTH;
        case validation.CODE.NAME: return ERROR_MESSAGES.FIRST_NAME.PATTERN;
        case validation.CODE.NAME_FIRST_LETTER: return ERROR_MESSAGES.FIRST_NAME.FIRST_LETTER;
        default: throw new Error(UNEXPECTED_ENUM_MESSAGE);
    }
}

export function lastName(code) {
    switch (code) {
        case validation.CODE.SUCCESS: return null;
        case validation.CODE.NAME_EMPTY: return ERROR_MESSAGES.LAST_NAME.EMPTY;
        case validation.CODE.NAME_MAXLENGTH: return ERROR_MESSAGES.LAST_NAME.MAXLENGTH;
        case validation.CODE.NAME: return ERROR_MESSAGES.LAST_NAME.PATTERN;
        case validation.CODE.NAME_FIRST_LETTER: return ERROR_MESSAGES.LAST_NAME.FIRST_LETTER;
        default: throw new Error(UNEXPECTED_ENUM_MESSAGE);
    }
}

export function email(code) {
    switch (code) {
        case validation.CODE.SUCCESS: return null;
        case validation.CODE.EMAIL_MAXLENGTH: return ERROR_MESSAGES.EMAIL.MAXLENGTH;
        case validation.CODE.EMAIL_AT_SIGN: return ERROR_MESSAGES.EMAIL.AT_SIGN;
        case validation.CODE.EMAIL_USER_MAXLENGTH:
        case validation.CODE.EMAIL_USER:
            return ERROR_MESSAGES.EMAIL.USER;
        case validation.CODE.EMAIL_DOMAIN_MAXLENGTH:
        case validation.CODE.EMAIL_DOMAIN:
            return ERROR_MESSAGES.EMAIL.DOMAIN;
        default: throw new Error(UNEXPECTED_ENUM_MESSAGE);
    }
}

export function password(code) {
    switch (code) {
        case validation.CODE.SUCCESS: return null;
        case validation.CODE.PASSWORD_EMPTY: return ERROR_MESSAGES.PASSWORD.EMPTY;
        case validation.CODE.PASSWORD_MINLENGTH: return ERROR_MESSAGES.PASSWORD.MINLENGTH;
        case validation.CODE.PASSWORD_MAXLENGTH: return ERROR_MESSAGES.PASSWORD.MAXLENGTH;
        case validation.CODE.PASSWORD: return ERROR_MESSAGES.PASSWORD.PATTERN;
        case validation.CODE.PASSWORD_LOWER_LETTER: return ERROR_MESSAGES.PASSWORD.LOWER_LETTER;
        case validation.CODE.PASSWORD_UPPER_LETTER: return ERROR_MESSAGES.PASSWORD.UPPER_LETTER;
        case validation.CODE.PASSWORD_DIGIT: return ERROR_MESSAGES.PASSWORD.DIGIT;
        case validation.CODE.PASSWORD_SYMBOL: return ERROR_MESSAGES.PASSWORD.SYMBOL;
        default: throw new Error(UNEXPECTED_ENUM_MESSAGE);
    }
}
