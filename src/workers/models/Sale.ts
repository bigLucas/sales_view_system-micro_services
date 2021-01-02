export class Sale {
    public identifier: 'S' = 'S';
    public date: Date;
    public commercialCode: number;
    public grossAmount: number;
    public netAmount: number;
    public mdr: number;
    public cardDigits: string;
    public authorizationCode: string;
    public cardBrand: string;
    public fundingAccount: string;
    public city: string;
    public country: string;
    public bonusLevel: number;
    public merchantCode: number;
    public futureCharge: number;
    public totalInstallmentsNumber: number;
}
