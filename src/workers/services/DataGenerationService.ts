import { ElectronicDataInterchange } from '../models/ElectronicDataInterchange';
import { BrandTypes } from '../models/enums/BrandTypes';
import { FundingAccountTypes } from '../models/enums/FundingAccountTypes';
import { Header } from '../models/Header';
import { Sale } from '../models/Sale';
import { Tail } from '../models/Tail';
import {
    CARD,
    GROSS_AMOUNT,
    MDR,
    COMMERCIAL_CODE_AND_MERCHANT_CODE,
    BONUS_LEVEL,
    FUTURE_CHARGE,
} from './DummyData/EdiDummyData';

export class DataGenerationService {
    private static readonly NUMBER_OF_DECIMAL_PLACES = 2;

    public static generate(): ElectronicDataInterchange {
        const edi = new ElectronicDataInterchange();
        const date = new Date();
        const salesQuantity = this.randomIntFromInterval(0, 99);
        let totalSalesValue = 0;
        for (let i = 0; i < salesQuantity; i++) {
            const sale = this.generateSale(date);
            totalSalesValue = parseFloat(
                (totalSalesValue + sale.grossAmount).toFixed(this.NUMBER_OF_DECIMAL_PLACES)
            );
            edi.sales.push(sale);
        }
        const { header, tail } = this.generateHeaderAndTail(date, totalSalesValue, salesQuantity);
        edi.header = header;
        edi.tail = tail;
        return edi;
    }

    private static generateHeaderAndTail(
        fileGenerationDate: Date,
        totalSalesValue: number,
        salesQuantity: number
    ): { header: Header; tail: Tail } {
        const header = new Header();
        const tail = new Tail();
        header.fileGenerationDate = fileGenerationDate;
        header.totalSalesValue = totalSalesValue;
        header.salesQuantity = salesQuantity;
        tail.fileGenerationDate = fileGenerationDate;
        tail.totalSalesValue = totalSalesValue;
        tail.salesQuantity = salesQuantity;
        return { header, tail };
    }

    private static generateSale(date: Date): Sale {
        const card = CARD[this.randomIntFromInterval(0, CARD.length - 1)];
        const commercial =
            COMMERCIAL_CODE_AND_MERCHANT_CODE[
                this.randomIntFromInterval(0, COMMERCIAL_CODE_AND_MERCHANT_CODE.length - 1)
            ];

        const sale = new Sale();
        sale.totalInstallmentsNumber = this.generateTotalInstallmentsNumber(card.fundingAccount);
        sale.cardDigits = card.digits;
        sale.cardBrand = card.brand;
        sale.fundingAccount = card.fundingAccount;
        sale.city = card.city;
        sale.country = card.country;
        sale.grossAmount = this.generateGrossAmount();
        sale.mdr = this.generateMdr(
            sale.fundingAccount as FundingAccountTypes,
            sale.cardBrand as BrandTypes,
            sale.totalInstallmentsNumber
        );
        sale.netAmount = this.generateNetAmount(sale.grossAmount, sale.mdr);
        sale.commercialCode = commercial.commercialCode;
        sale.merchantCode = commercial.merchantCode;
        sale.bonusLevel = BONUS_LEVEL[this.randomIntFromInterval(0, BONUS_LEVEL.length - 1)];
        sale.futureCharge = FUTURE_CHARGE[this.randomIntFromInterval(0, FUTURE_CHARGE.length - 1)];
        sale.date = this.generateSaleDate(date);
        sale.authorizationCode = this.generateAuthorizationCode();
        return sale;
    }

    private static generateNetAmount(grossAmount: number, mdr: number): number {
        return parseFloat((grossAmount * (1 - mdr / 100)).toFixed(this.NUMBER_OF_DECIMAL_PLACES));
    }

    private static generateGrossAmount(): number {
        return GROSS_AMOUNT[this.randomIntFromInterval(0, GROSS_AMOUNT.length - 1)];
    }

    private static generateMdr(
        fundingAccount: FundingAccountTypes,
        cardBrand: BrandTypes,
        totalInstallmentsNumber: number
    ): number {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return fundingAccount === FundingAccountTypes.DEBIT
            ? MDR[cardBrand].debit
            : MDR[cardBrand][totalInstallmentsNumber];
    }

    private static generateTotalInstallmentsNumber(fundingAccount: FundingAccountTypes): number {
        return fundingAccount === FundingAccountTypes.DEBIT ? 1 : this.randomIntFromInterval(1, 3);
    }

    private static generateSaleDate(date: Date): Date {
        const dateWithTime = new Date(date);
        dateWithTime.setHours(this.randomIntFromInterval(0, 23));
        dateWithTime.setMinutes(this.randomIntFromInterval(0, 59));
        dateWithTime.setSeconds(this.randomIntFromInterval(0, 59));
        return dateWithTime;
    }

    private static generateAuthorizationCode(): string {
        const BASIC_LETTERS = ['H', 'J', 'B', 'Y'];
        let partOne = BASIC_LETTERS[this.randomIntFromInterval(0, BASIC_LETTERS.length - 1)];
        partOne += BASIC_LETTERS[this.randomIntFromInterval(0, BASIC_LETTERS.length - 1)];
        partOne += BASIC_LETTERS[this.randomIntFromInterval(0, BASIC_LETTERS.length - 1)];
        let partTwo = this.randomIntFromInterval(0, 9).toString();
        partTwo += this.randomIntFromInterval(0, 9).toString();
        partTwo += this.randomIntFromInterval(0, 9).toString();
        return `${partOne}${partTwo}`;
    }

    private static randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
