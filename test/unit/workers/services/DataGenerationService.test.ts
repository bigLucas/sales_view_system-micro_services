/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DataGenerationService } from '../../../../src/workers/services/DataGenerationService';

describe('Unit tests for DataGenerationService', () => {
    describe('generate', () => {
        it('should return an ElectronicDataInterchange object with dummy data', (done) => {
            const result = DataGenerationService.generate();
            expect(result).toBeDefined();
            expect(result.header).toEqual(
                expect.objectContaining({
                    identifier: 'H',
                    fileGenerationDate: expect.any(Date),
                    totalSalesValue: expect.any(Number),
                    salesQuantity: expect.any(Number),
                })
            );
            expect(result.tail).toEqual(
                expect.objectContaining({
                    identifier: 'T',
                    fileGenerationDate: expect.any(Date),
                    totalSalesValue: expect.any(Number),
                    salesQuantity: expect.any(Number),
                })
            );
            expect(result.sales).toEqual(
                expect.arrayContaining([
                    {
                        identifier: 'S',
                        date: expect.any(Date),
                        commercialCode: expect.any(Number),
                        grossAmount: expect.any(Number),
                        netAmount: expect.any(Number),
                        mdr: expect.any(Number),
                        cardDigits: expect.any(String),
                        authorizationCode: expect.any(String),
                        cardBrand: expect.any(String),
                        fundingAccount: expect.any(String),
                        city: expect.any(String),
                        country: expect.any(String),
                        bonusLevel: expect.any(Number),
                        merchantCode: expect.any(Number),
                        futureCharge: expect.any(Number),
                        totalInstallmentsNumber: expect.any(Number),
                    },
                ])
            );
            done();
        });

        it('should return an ElectronicDataInterchange object with valid properties', (done) => {
            const result = DataGenerationService.generate();
            const totalSalesValue = result.sales.reduce((previousValue, currentSale) => {
                return (previousValue = parseFloat(
                    (previousValue + currentSale.grossAmount).toFixed(2)
                ));
            }, 0);
            expect(result).toBeDefined();
            expect(result.header.salesQuantity).toEqual(result.sales.length);
            expect(result.tail.salesQuantity).toEqual(result.sales.length);
            expect(result.header.fileGenerationDate.toISOString()).toEqual(
                result.tail.fileGenerationDate.toISOString()
            );
            expect(result.header.totalSalesValue).toEqual(result.tail.totalSalesValue);
            expect(result.header.totalSalesValue).toEqual(totalSalesValue);
            done();
        });

        it('should return an EDI object with valid values for sales property', (done) => {
            let result = DataGenerationService.generate();
            while (result.sales.length < 1) {
                result = DataGenerationService.generate();
            }

            expect(result).toBeDefined();
            expect(result.sales.length).toBeGreaterThanOrEqual(1);
            const MAX_DATE_AND_TIME = new Date(result.header.fileGenerationDate);
            MAX_DATE_AND_TIME.setHours(23, 59, 59);
            const NET_AMOUNT = parseFloat(
                (result.sales[0].grossAmount * (1 - result.sales[0].mdr / 100)).toFixed(2)
            );
            expect(result.sales[0].netAmount).toBeLessThan(result.sales[0].grossAmount);
            expect(result.sales[0].date.getTime()).toBeLessThan(MAX_DATE_AND_TIME.getTime());
            expect(result.sales[0].netAmount).toEqual(NET_AMOUNT);
            done();
        });
    });
});
