import { Header } from './Header';
import { Sale } from './Sale';
import { Tail } from './Tail';

export class ElectronicDataInterchange {
    public header: Header;
    public sales: Sale[];
    public tail: Tail;

    public constructor() {
        this.sales = [];
    }
}
