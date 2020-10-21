import { OrderService } from './../../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  isValid: boolean = true;

  constructor(private service: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.service.orderItems = [];
      this.service.getOrderList().then(res => {
      // console.log("res ==", res);
      this.service.orderItems = res;
    });
  }

  AddOrEditOrderItem(orderItemIndex, ID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, ID };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }

  getClass(active){
    console.log("active - ", active, typeof active);
    if (active)
      return 'row-active';
    else
      return 'row-inactive';
  }
}
