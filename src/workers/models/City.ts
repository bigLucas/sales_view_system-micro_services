import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Transaction } from './Transaction';

@Entity(City.TABLE_NAME)
@Unique(['name', 'country'])
export class City {
    public static TABLE_NAME = 'city';

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
    })
    public name: string;

    @Column({
        type: 'varchar',
    })
    public country: string;

    @OneToMany(_type => Transaction, transaction => transaction.city)
    public transactions: Transaction[];
}
