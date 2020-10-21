import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderItem } from 'src/app/shared/order-item.model';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[];
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private orderSevice: OrderService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.itemList = [{"ItemID":1, "Name": "True"}, {"ItemID":2, "Name": "False"}]
    // console.log(this.itemList)
    if (this.data.orderItemIndex == null)
      this.formData = {
        id: this.data.ID,
        active: false,
        name:'',
        dateOfBirth:'',
      }
    else
      this.formData = Object.assign({}, this.orderSevice.orderItems[this.data.orderItemIndex]);
  }

  updateActive(ctrl) {
  }

  updateTotal() {
    this.formData.name = this.formData.name;
    // console.log(this.formData)
  }

  onSubmit(form: NgForm) {
    // console.log("form value",form.value)
    if(form.value.active == 1)
    {form.value.active = true;}
    else
    {form.value.active = false;}
    this.orderSevice.updateOrderById(form.value).then(res => {
      // console.log("updated data =", res);
      this.toastr.success('Updated Successfully', 'FrontEnd App');
    });
      if (this.data.orderItemIndex == null)
        this.orderSevice.orderItems.push(form.value);
      else
        this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
  }

}
