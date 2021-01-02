export const COMMERCIAL_CODE_AND_MERCHANT_CODE = [
    {
        commercialCode: 1,
        merchantCode: 101010,
    },
    {
        commercialCode: 2,
        merchantCode: 101011,
    },
    {
        commercialCode: 3,
        merchantCode: 101012,
    },
    {
        commercialCode: 4,
        merchantCode: 101013,
    },
];

export enum CARD_BRAND {
    MASTER_CARD = 'Master Card',
    VISA = 'Visa',
    ELO = 'Elo',
}

export enum FUNDING_ACCOUNT {
    DEBIT = 'Debit',
    CREDIT = 'Credit',
}

export const MDR = {
    [CARD_BRAND.MASTER_CARD]: {
        debit: 3,
        '1': 4,
        '2': 5,
        '3': 6,
        '4': 7,
    },
    [CARD_BRAND.VISA]: {
        debit: 4,
        '1': 3,
        '2': 4,
        '3': 5,
        '4': 6,
    },
    [CARD_BRAND.ELO]: {
        debit: 2,
        '1': 4,
        '2': 5,
        '3': 6,
        '4': 8,
    },
};

export const CARD = [
    {
        digits: '3452********4343',
        brand: CARD_BRAND.MASTER_CARD,
        fundingAccount: FUNDING_ACCOUNT.CREDIT,
        city: 'Sao Paulo',
        country: 'Brazil',
    },
    {
        digits: '3455********4344',
        brand: CARD_BRAND.MASTER_CARD,
        fundingAccount: FUNDING_ACCOUNT.DEBIT,
        city: 'New York',
        country: 'United States of America',
    },
    {
        digits: '5452********4341',
        brand: CARD_BRAND.VISA,
        fundingAccount: FUNDING_ACCOUNT.CREDIT,
        city: 'Campinas',
        country: 'Brazil',
    },
    {
        digits: '5452********4345',
        brand: CARD_BRAND.ELO,
        fundingAccount: FUNDING_ACCOUNT.CREDIT,
        city: 'Araras',
        country: 'Brazil',
    },
];

export const BONUS_LEVEL = [1.5, 3.4, 8.6, 10.1];

export const FUTURE_CHARGE = [3.5, 5.5, 6.7, 8.2];

export const TOTAL_INSTALLMENTS_NUMBER = [1, 2, 3, 4];

export const GROSS_AMOUNT = [1000, 399.99, 300, 555];
