import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Card } from './Card';
import { BrandTypes } from './enums/BrandTypes';

@Entity(Brand.TABLE_NAME)
export class Brand {
    public static TABLE_NAME = 'brand';

    @PrimaryColumn({
        type: 'varchar',
        unique: true,
    })
    public name: BrandTypes;

    @OneToMany((_type) => Card, (card) => card.brand)
    public cards: Card[];
}
