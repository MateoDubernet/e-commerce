import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public currentUserId: number;
  public currentUser: User;
  public orders: Order[] = [];

  constructor(private userService: UserService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem('userId'));

    this.userService.getUserById(this.currentUserId).subscribe(data => {
      this.currentUser = data[0];
    });

    this.orderService.getOrderByUserId(this.currentUserId).subscribe(orders => {
      orders.forEach(order => {
        this.orderService.getOrderItemsByOrderId(order.id).subscribe(items => {
          if (items) {
            order.items = items;
            this.orders.push(order);
          }
        })
      })
    })
  }
}
