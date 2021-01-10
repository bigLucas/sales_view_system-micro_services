import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Card } from './Card';
import { FundingAccountTypes } from './enums/FundingAccountTypes';

@Entity(FundingAccount.TABLE_NAME)
export class FundingAccount {
    public static TABLE_NAME = 'funding_account';

    @PrimaryColumn({
        type: 'varchar',
        unique: true,
    })
    public name: FundingAccountTypes;

    @OneToMany((_type) => Card, (card) => card.funding_account)
    public cards: Card[];
}
