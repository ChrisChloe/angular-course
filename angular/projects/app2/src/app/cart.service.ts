import { ItemCart } from './shared/cart-item.model';

class CartService {
  public itens: ItemCart[] = [];

  public showItems(): ItemCart[] {
    return this.itens;
  }
}


export default CartService;
