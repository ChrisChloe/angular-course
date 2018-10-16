import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../purchase-order.service';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
  providers: [ PurchaseOrderService ]
})
export class PurchaseOrderComponent implements OnInit {

  // order
  public order: Order = new Order('', '', '', '');

  public address: string = '';
  public number: string = '';
  public complement: string = '';
  public payMethod: string = '';

  // field validation
  public validAddress: boolean;
  public validNumber: boolean;
  public validComplement: boolean;
  public validPayMethod: boolean;

  // pristine states
  public addressPristine: boolean = true;
  public numberPristine: boolean = true;
  public complementPristine: boolean = true;
  public payMethodPristine: boolean = true;

  // control confirm button
  public formState: string = 'disabled';

  constructor(private purchaseOrderService: PurchaseOrderService) { }

  ngOnInit() {
    // this.purchaseOrderService.confirmPurchase();
  }

  public updateAddress(address: string): void {
    this.address = address;
    this.addressPristine = false;

    if (this.address.length > 3) {
      this.validAddress = true;
    } else {
      this.validAddress = false;
    }
    this.availableForm();
  }

  public updateNumber(number: string): void {
    this.number = number;
    this.numberPristine = false;

    if (this.number.length > 0) {
      this.validNumber = true;
    } else {
      this.validNumber = false;
    }
    this.availableForm();
  }

  public updateComplement(complement: string): void {
    this.complement = complement;
    this.complementPristine = false;

    if (this.complement.length > 0) {
      this.validComplement = true;
    }
    this.availableForm();
  }

  public updatePayMethod(payMethod: string): void {
    this.payMethod = payMethod;
    this.payMethodPristine = false;

    if (this.payMethod.length > 0) {
      this.validPayMethod = true;
    } else {
      this.validPayMethod = false;
    }
    this.availableForm();
  }

  public availableForm(): void {
    if (this.validAddress === true && this.validNumber === true && this.validPayMethod === true) {
      this.formState = '';
    } else {
      this.formState = 'disabled';
    }
  }

  public purchaseConfirm(): void {

    this.order.address = this.address;
    this.order.complement = this.complement;
    this.order.number = this.number;
    this.order.payMethod = this.payMethod;

    this.purchaseOrderService.confirmPurchase(this.order).subscribe();
  }

}
