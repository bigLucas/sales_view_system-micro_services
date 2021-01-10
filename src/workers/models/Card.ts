import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { Brand } from './Brand';
import { FundingAccount } from './FundingAccount';
import { Transaction } from './Transaction';

@Entity(Card.TABLE_NAME)
@Unique(['digits', 'brand', 'funding_account'])
export class Card {
    public static TABLE_NAME = 'card';

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
    })
    public digits: string;

    @ManyToOne((_type) => Brand, (brand) => brand.cards)
    @JoinColumn({
        name: 'brand_id',
    })
    public brand: Brand;

    @ManyToOne((_type) => FundingAccount, (fundingAccount) => fundingAccount.cards)
    @JoinColumn({
        name: 'funding_account_id',
    })
    public funding_account: FundingAccount;

    @OneToMany((_type) => Transaction, (transaction) => transaction.card)
    public transactions: Transaction[];
}
