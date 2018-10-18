import { ItemCart } from './cart-item.model';

export class Order {

  constructor(
    public address: string,
    public number: string,
    public complement: string,
    public payMethod: string,
    public items: Array<ItemCart>
  ) { }

}
