import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from './../purchase-order.service';
import { CartService } from '../cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Order } from '../shared/order.model';
import { ItemCart } from '../shared/cart-item.model';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
  providers: [ PurchaseOrderService ]
})
export class PurchaseOrderComponent implements OnInit {

  public idPurchaseOrder: number;
  public itemsCart: ItemCart[] = [];

  public form: FormGroup = new FormGroup({
    'address': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'number': new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complement': new FormControl(null),
    'payMethod': new FormControl(null, [ Validators.required ])
  });

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private cartService: CartService
    ) { }

  ngOnInit() {
    this.itemsCart = this.cartService.showItems();
    console.log(this.itemsCart);
  }
  public confirmPurchase(): void {
    if (this.form.status === 'INVALID') {
      console.log('formulário está inválido');
      this.form.get('address').markAsTouched();
      this.form.get('number').markAsTouched();
      this.form.get('complement').markAsTouched();
      this.form.get('payMethod').markAsTouched();

    } else {

      if (this.cartService.showItems().length === 0) {
        alert('Seu carrinho está vazio!');
      } else {

      const order: Order = new Order(
        this.form.value.address,
        this.form.value.number,
        this.form.value.complement,
        this.form.value.payMethod,
        this.cartService.showItems()
        );

        this.purchaseOrderService.confirmPurchase(order)
        .subscribe((idOrder: number) => {
          this.idPurchaseOrder = idOrder;
          this.cartService.clearCart();
          });
      }
    }
  }
  public add(item: ItemCart): void {
    this.cartService.addQuantity(item);

  }
  public reduce(item: ItemCart): void {
    this.cartService.reduceQuantity(item);
  }
}
