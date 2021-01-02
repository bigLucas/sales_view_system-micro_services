/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import { ElectronicDataInterchange } from '../../../../src/workers/models/ElectronicDataInterchange';
import { Header } from '../../../../src/workers/models/Header';
import { Sale } from '../../../../src/workers/models/Sale';
import { Tail } from '../../../../src/workers/models/Tail';
import { EDI } from '../../../../src/workers/libs/EDI';

describe('Unit tests for EDI', () => {
    const headerString = 'H;2020-01-01;100.91;4;';
    const tailString = 'T;2020-01-01;100.91;4;';
    const salesString = [
        'S;2020-01-01T23:59:59;1;25;23.87;4.5;3452********4343;BMW342;Master Card;Credit;New York;United States;1.01;101010;9.5;1;',
        'S;2020-01-01T23:59:59;1;25;23.62;5.5;3455********4344;BMW342;Visa;Credit;New York;United States;1.01;101010;9.5;1;',
        'S;2020-01-01T23:59:59;1;25;23.87;4.5;5452********4341;BMW342;Master Card;Credit;New York;United States;1.01;101010;9.5;1;',
        'S;2020-01-01T23:59:59;1;25.91;23.68;8.6;5452********4345;BMW342;American Express;Credit;New York;United States;1.01;101010;9.5;1;',
    ];
    const file = `${headerString}\n${salesString.join('\n')}\n${tailString}\n`;

    describe('parse', () => {
        it('should return an ElectronicDataInterchange object for a valid string file', (done) => {
            const result = EDI.parse(file);
            expect(result).toBeDefined();
            expect(result.header).toBeDefined();
            expect(result.tail).toBeDefined();
            expect(result.sales.length).toEqual(salesString.length);
            done();
        });

        it('should return an ElectronicDataInterchange object with only header property', (done) => {
            const result = EDI.parse(headerString);
            expect(result).toBeDefined();
            expect(result.header).toBeDefined();
            expect(result.tail).toBeUndefined();
            expect(result.sales.length).toEqual(0);
            expect(result).toEqual(
                expect.objectContaining({
                    header: {
                        identifier: 'H',
                        fileGenerationDate: expect.any(Date),
                        totalSalesValue: 100.91,
                        salesQuantity: 4,
                    },
                    sales: [],
                })
            );
            done();
        });

        it('should return an ElectronicDataInterchange object with only tail property', (done) => {
            const result = EDI.parse(tailString);
            expect(result).toBeDefined();
            expect(result.tail).toBeDefined();
            expect(result.header).toBeUndefined();
            expect(result.sales.length).toEqual(0);
            expect(result).toEqual(
                expect.objectContaining({
                    tail: {
                        identifier: 'T',
                        fileGenerationDate: expect.any(Date),
                        totalSalesValue: 100.91,
                        salesQuantity: 4,
                    },
                    sales: [],
                })
            );
            done();
        });

        it('should return an ElectronicDataInterchange object with only sales property', (done) => {
            const result = EDI.parse(salesString[0]);
            expect(result).toBeDefined();
            expect(result.header).toBeUndefined();
            expect(result.tail).toBeUndefined();
            expect(result.sales.length).toEqual(1);
            expect(result).toEqual(
                expect.objectContaining({
                    sales: expect.arrayContaining([
                        {
                            identifier: 'S',
                            date: expect.any(Date),
                            commercialCode: 1,
                            grossAmount: 25,
                            netAmount: 23.87,
                            mdr: 4.5,
                            cardDigits: '3452********4343',
                            authorizationCode: 'BMW342',
                            cardBrand: 'Master Card',
                            fundingAccount: 'Credit',
                            city: 'New York',
                            country: 'United States',
                            bonusLevel: 1.01,
                            merchantCode: 101010,
                            futureCharge: 9.5,
                            totalInstallmentsNumber: 1,
                        },
                    ]),
                })
            );
            done();
        });

        it('should return an ElectronicDataInterchange object with sales equal to empty', (done) => {
            const result = EDI.parse(`${headerString}\n${tailString}\n`);
            expect(result).toBeDefined();
            expect(result.header).toBeDefined();
            expect(result.tail).toBeDefined();
            expect(result.sales.length).toEqual(0);
            expect(result.sales).toEqual(expect.arrayContaining([]));
            done();
        });
    });

    describe('stringfy: ', () => {
        const headerObject = {
            fileGenerationDate: new Date('2020-01-01T00:00:00'),
            identifier: 'H',
            salesQuantity: 4,
            totalSalesValue: 100.91,
        } as Header;
        const tailObject = {
            fileGenerationDate: new Date('2020-01-01T00:00:00'),
            identifier: 'T',
            salesQuantity: 4,
            totalSalesValue: 100.91,
        } as Tail;
        const saleObject = {
            identifier: 'S',
            date: new Date('2020-01-01T23:59:59'),
            commercialCode: 1,
            grossAmount: 25,
            netAmount: 23.87,
            mdr: 4.5,
            cardDigits: '3452********4343',
            authorizationCode: 'BMW342',
            cardBrand: 'Master Card',
            fundingAccount: 'Credit',
            city: 'New York',
            country: 'United States',
            bonusLevel: 1.01,
            merchantCode: 101010,
            futureCharge: 9.5,
            totalInstallmentsNumber: 1,
        } as Sale;

        const object = new ElectronicDataInterchange();
        object.header = { ...headerObject };
        object.tail = { ...tailObject };
        object.sales.push(saleObject);

        it('should return a formatted string for a valid input object', (done) => {
            const result = EDI.stringfy(object);
            expect(result).toBeDefined();
            expect(result).toEqual(`${headerString}\n${salesString[0]}\n${tailString}\n`);
            done();
        });

        it('should return a formatted string for a valid input object with empty sales', (done) => {
            const result = EDI.stringfy({ ...object, sales: [] });
            expect(result).toBeDefined();
            expect(result).toEqual(`${headerString}\n${tailString}\n`);
            done();
        });

        it('should return a formatted string for a valid input object from EDI.parse', (done) => {
            const input = EDI.parse(file);
            const result = EDI.stringfy(input);
            expect(result).toBeDefined();
            expect(result).toEqual(file);
            done();
        });
    });
});
