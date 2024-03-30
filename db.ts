// db.ts
import Dexie, { Table } from 'dexie';


export interface Friend {
  id?: number;
  name: string;
}
export interface Basket {
    id?: number;
    customer: string;
    discount: number;
    products:  Product[];
  }
  export interface Product {
    name: string;
    brand: string;
    code:  string;
  }

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  friends!: Table<Friend>;
  basket!: Table<Basket>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
        friends: '++id, name',
        basket: '++id, discount, customer, products'
      });
  }
}

export const db = new MySubClassedDexie();