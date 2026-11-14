export const RULES = Object.freeze({
    NAME: Object.freeze({
        MAXLENGTH: 20,
        PATTERN: /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/,
    }),
    NAME_FIRST_LETTER: Object.freeze({
        PATTERN: /^[A-ZА-ЯІЇЄҐ]/,
    }),
    EMAIL: Object.freeze({
        MAXLENGTH: 254,
    }),
    EMAIL_USER: Object.freeze({
        MAXLENGTH: 64,
        PATTERN: /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.]+(?<!\.)$/,
    }),
    EMAIL_DOMAIN: Object.freeze({
        MAXLENGTH: 254,
        PATTERN: /^((?!-)[A-Za-z0-9-]{1,63}(?<!-))((?!-)\.[A-Za-z0-9-]{1,63}(?<!-))+(?<!\.)$/,
    }),
    PASSWORD: Object.freeze({
        MINLENGTH: 8,
        MAXLENGTH: 32,
        PATTERN: /^[A-Za-z0-9!@#$%^&amp;*_\-=+?]+$/,
    }),
    PASSWORD_UPPER: Object.freeze({
        PATTERN: /[A-Z]/,
    }),
    PASSWORD_LOWER: Object.freeze({
        PATTERN: /[a-z]/,
    }),
    PASSWORD_DIGIT: Object.freeze({
        PATTERN: /[0-9]/,
    }),
    PASSWORD_SYMBOL: Object.freeze({
        PATTERN: /[!@#$%^&amp;*_\-=+?]/,
    }),
})

export const CODE = Object.freeze({
    SUCCESS: 0,
    NAME_EMPTY: 1,
    NAME_MAXLENGTH: 2,
    NAME: 3,
    NAME_FIRST_LETTER: 4,
    EMAIL_MAXLENGTH: 5,
    EMAIL_AT_SIGN: 6,
    EMAIL_USER_MAXLENGTH: 7,
    EMAIL_USER: 8,
    EMAIL_DOMAIN_MAXLENGTH: 9,
    EMAIL_DOMAIN: 10,
    PASSWORD_EMPTY: 11,
    PASSWORD_MINLENGTH: 12,
    PASSWORD_MAXLENGTH: 13,
    PASSWORD: 14,
    PASSWORD_LOWER_LETTER: 15,
    PASSWORD_UPPER_LETTER: 16,
    PASSWORD_DIGIT: 17,
    PASSWORD_SYMBOL: 18,
})

const EMAIL_SEPARATOR = "@";

export function checkName(content) {
    if (content.length === 0) {
        return CODE.NAME_EMPTY;
    }

    if (content.length > RULES.NAME.MAXLENGTH) {
        return CODE.NAME_MAXLENGTH;
    }

    if (!RULES.NAME.PATTERN.test(content)) {
        return CODE.NAME;
    }

    if (!RULES.NAME_FIRST_LETTER.PATTERN.test(content)) {
        return CODE.NAME_FIRST_LETTER;
    }

    return CODE.SUCCESS;
}

export function checkEmail(content) {
    if (content.length === 0) {
        return CODE.SUCCESS;
    }

    if (content.length > RULES.EMAIL.MAXLENGTH) {
        return CODE.EMAIL_MAXLENGTH;
    }

    const parts = content.split(EMAIL_SEPARATOR);

    if (parts.length !== 2) {
        return CODE.EMAIL_AT_SIGN;
    }

    const [user, domain] = parts;

    if (user.length > RULES.EMAIL_USER.MAXLENGTH) {
        return CODE.EMAIL_USER_MAXLENGTH;
    }

    if (!RULES.EMAIL_USER.PATTERN.test(user)) {
        return CODE.EMAIL_USER;
    }

    if (domain.length > RULES.EMAIL_DOMAIN.MAXLENGTH) {
        return CODE.EMAIL_DOMAIN_MAXLENGTH;
    }

    if (!RULES.EMAIL_DOMAIN.PATTERN.test(domain)) {
        return CODE.EMAIL_DOMAIN;
    }

    return CODE.SUCCESS;
}

export function checkPassword(content) {
    if (content.length === 0) {
        return CODE.PASSWORD_EMPTY;
    }

    if (content.length < RULES.PASSWORD.MINLENGTH) {
        return CODE.PASSWORD_MINLENGTH;
    }

    if (content.length > RULES.PASSWORD.MAXLENGTH) {
        return CODE.PASSWORD_MAXLENGTH;
    }

    if (!RULES.PASSWORD.PATTERN.test(content)) {
        return CODE.PASSWORD;
    }

    if (!RULES.PASSWORD_UPPER.PATTERN.test(content)) {
        return CODE.PASSWORD_UPPER_LETTER;
    }

    if (!RULES.PASSWORD_LOWER.PATTERN.test(content)) {
        return CODE.PASSWORD_LOWER_LETTER;
    }

    if (!RULES.PASSWORD_DIGIT.PATTERN.test(content)) {
        return CODE.PASSWORD_DIGIT;
    }

    if (!RULES.PASSWORD_SYMBOL.PATTERN.test(content)) {
        return CODE.PASSWORD_SYMBOL;
    }

    return CODE.SUCCESS;
}
