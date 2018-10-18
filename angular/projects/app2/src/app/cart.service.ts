import { map } from 'rxjs/operators';
import { Offer } from './shared/offer.model';
import { ItemCart } from './shared/cart-item.model';

class CartService {
  public items: ItemCart[] = [];

  public showItems(): ItemCart[] {
    return this.items;
  }

  public includeItem(offer: Offer): void {
    const itemCart: ItemCart = new ItemCart(
      offer.id,
      offer.images[0],
      offer.title,
      offer.offer_description,
      offer.value,
      1
    );

    // check if item already exists

   const itemCartFound = this.items.find((item: ItemCart) => item.id === itemCart.id);

   if (itemCartFound) {
    itemCartFound.quantity += 1;
   } else {
    this.items.push(itemCart);
   }
  }


  public totalCartAmount(): number  {

    let total = 0;

    this.items.map((item: ItemCart) => {
      total = total + (item.value * item.quantity);
      });

      return total;
  }

  public addQuantity(itemCart: ItemCart): void {
    const itemCartFound = this.items.find((item: ItemCart) => item.id === itemCart.id);

    if (itemCartFound) {
      itemCartFound.quantity += 1;
    }
  }

  public reduceQuantity(itemCart: ItemCart): void {
    const itemCartFound = this.items.find((item: ItemCart) => item.id === itemCart.id);

    if (itemCartFound) {
      itemCartFound.quantity -= 1;

      if (itemCartFound.quantity === 0) {
          this.items.splice(this.items.indexOf(itemCartFound), 1);
      }
    }

  }

  public clearCart(): void {
    this.items = [];
  }

}
export { CartService };
