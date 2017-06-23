import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '../../interfaces/order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  private orderHistory: Array<IOrder> = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderHistory = this.route.snapshot.data['history']
  }

}
