import { PossibleTypesEnum } from './enums/PossibleTypesEnum';

export type SchemaItem = {
    name: string;
    type: PossibleTypesEnum;
};

export class ElectronicDataInterchangeSchema {
    public static 'H' = {
        '0': { name: 'identifier', type: PossibleTypesEnum.STRING } as SchemaItem,
        '1': {
            name: 'fileGenerationDate',
            type: PossibleTypesEnum.DATE_WITHOUT_TIME,
        } as SchemaItem,
        '2': { name: 'totalSalesValue', type: PossibleTypesEnum.DECIMAL } as SchemaItem,
        '3': { name: 'salesQuantity', type: PossibleTypesEnum.INTEGER } as SchemaItem,
    };
    public static 'S' = {
        '0': { name: 'identifier', type: PossibleTypesEnum.STRING } as SchemaItem,
        '1': { name: 'date', type: PossibleTypesEnum.DATE_WITH_TIME } as SchemaItem,
        '2': { name: 'commercialCode', type: PossibleTypesEnum.INTEGER } as SchemaItem,
        '3': { name: 'grossAmount', type: PossibleTypesEnum.DECIMAL } as SchemaItem,
        '4': { name: 'netAmount', type: PossibleTypesEnum.DECIMAL } as SchemaItem,
        '5': { name: 'mdr', type: PossibleTypesEnum.DECIMAL } as SchemaItem,
        '6': { name: 'cardDigits', type: PossibleTypesEnum.STRING } as SchemaItem,
        '7': { name: 'authorizationCode', type: PossibleTypesEnum.STRING } as SchemaItem,
        '8': { name: 'cardBrand', type: PossibleTypesEnum.STRING } as SchemaItem,
        '9': { name: 'fundingAccount', type: PossibleTypesEnum.STRING } as SchemaItem,
        '10': { name: 'city', type: PossibleTypesEnum.STRING } as SchemaItem,
        '11': { name: 'country', type: PossibleTypesEnum.STRING } as SchemaItem,
        '12': { name: 'bonusLevel', type: PossibleTypesEnum.DECIMAL } as SchemaItem,
        '13': { name: 'merchantCode', type: PossibleTypesEnum.INTEGER } as SchemaItem,
        '14': { name: 'futureCharge', type: PossibleTypesEnum.DECIMAL } as SchemaItem,
        '15': { name: 'totalInstallmentsNumber', type: PossibleTypesEnum.INTEGER } as SchemaItem,
    };
    public static 'T' = {
        '0': { name: 'identifier', type: PossibleTypesEnum.STRING } as SchemaItem,
        '1': {
            name: 'fileGenerationDate',
            type: PossibleTypesEnum.DATE_WITHOUT_TIME,
        } as SchemaItem,
        '2': { name: 'totalSalesValue', type: PossibleTypesEnum.DECIMAL } as SchemaItem,
        '3': { name: 'salesQuantity', type: PossibleTypesEnum.INTEGER } as SchemaItem,
    };
}
