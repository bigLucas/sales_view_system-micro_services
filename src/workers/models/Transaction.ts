import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './Card';
import { City } from './City';

@Entity(Transaction.TABLE_NAME)
export class Transaction {
    public static TABLE_NAME = 'transaction';

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'decimal',
    })
    public gross_amount: number;

    @Column({
        type: 'decimal',
    })
    public net_amount: number;

    @Column({
        type: 'timestamp',
    })
    public date: string;

    @Column({
        type: 'decimal',
    })
    public mdr: number;

    @Column({
        type: 'integer',
    })
    public total_installments: number;

    @Column({
        type: 'varchar',
    })
    public merchant_code: string;

    @Column({
        type: 'varchar',
    })
    public authorization_code: string;

    @ManyToOne(_type => Card, card => card.transactions)
    @JoinColumn({
        name: 'card_id',
    })
    public card: Card;

    @ManyToOne(_type => City, city => city.transactions)
    @JoinColumn({
        name: 'city_id',
    })
    public city: City;
}
