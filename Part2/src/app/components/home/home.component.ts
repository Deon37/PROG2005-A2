// Title: Home Component
// Author: Deon Miller
// Student ID: 23748590
// Unit: PROG2005
// Assignment: Assessment 2 Part 2

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/item.model';

// this component displays the home page with a welcome message and the full inventory table
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['../../app.css']
})
export class HomeComponent implements OnInit {

  all_items: InventoryItem[] = [];

  constructor(private inventory_service: InventoryService) {}

  // this function runs on page load and gets all items from the service
  ngOnInit(): void {
    this.all_items = this.inventory_service.get_all_items();
  }

  // this function returns the correct badge class for a stock status value
  get_badge_class(stock_status: string): string {
    if (stock_status === 'In Stock')  return 'badge in_stock';
    if (stock_status === 'Low Stock') return 'badge low_stock';
    return 'badge out_stock';
  }
}