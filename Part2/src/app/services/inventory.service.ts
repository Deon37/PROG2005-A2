import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventory_list: InventoryItem[] = [
    {
      item_id: 'ITM001',
      item_name: 'Samsung 65 TV',
      category: 'Electronics',
      quantity: 15,
      price: 1299.99,
      supplier_name: 'Samsung Australia',
      stock_status: 'In Stock',
      popular_item: 'Yes',
      comment: 'Best seller this month'
    },
    {
      item_id: 'ITM002',
      item_name: 'LG Washing Machine',
      category: 'Electronics',
      quantity: 5,
      price: 899.00,
      supplier_name: 'LG Electronics',
      stock_status: 'Low Stock',
      popular_item: 'No',
      comment: ''
    },
    {
      item_id: 'ITM003',
      item_name: 'Leather Sofa',
      category: 'Furniture',
      quantity: 3,
      price: 2499.00,
      supplier_name: 'Harvey Norman Furniture',
      stock_status: 'Low Stock',
      popular_item: 'Yes',
      comment: 'Floor model available'
    },
    {
      item_id: 'ITM004',
      item_name: 'Makita Drill Set',
      category: 'Tools',
      quantity: 0,
      price: 149.99,
      supplier_name: 'Makita',
      stock_status: 'Out of Stock',
      popular_item: 'No',
      comment: 'Restock pending'
    },
    {
      item_id: 'ITM005',
      item_name: 'Winter Jacket',
      category: 'Clothing',
      quantity: 25,
      price: 199.00,
      supplier_name: 'Kathmandu',
      stock_status: 'In Stock',
      popular_item: 'Yes',
      comment: ''
    }
  ];

  get_all_items(): InventoryItem[] {
    return this.inventory_list;
  }

  get_popular_items(): InventoryItem[] {
    const popular: InventoryItem[] = [];
    for (let i: number = 0; i < this.inventory_list.length; i++) {
      if (this.inventory_list[i].popular_item === 'Yes') {
        popular.push(this.inventory_list[i]);
      }
    }
    return popular;
  }

  id_exists(item_id: string): boolean {
    for (let i: number = 0; i < this.inventory_list.length; i++) {
      if (this.inventory_list[i].item_id === item_id) {
        return true;
      }
    }
    return false;
  }

  add_item(new_item: InventoryItem): boolean {
    if (this.id_exists(new_item.item_id)) {
      return false;
    }
    this.inventory_list.push(new_item);
    return true;
  }

  find_by_name(item_name: string): number {
    for (let i: number = 0; i < this.inventory_list.length; i++) {
      if (this.inventory_list[i].item_name.toLowerCase() === item_name.toLowerCase()) {
        return i;
      }
    }
    return -1;
  }

  update_item(index: number, updated_item: InventoryItem): void {
    this.inventory_list[index] = updated_item;
  }

  delete_item(index: number): void {
    this.inventory_list.splice(index, 1);
  }

  search_by_name(search_term: string): InventoryItem[] {
    const results: InventoryItem[] = [];
    for (let i: number = 0; i < this.inventory_list.length; i++) {
      if (this.inventory_list[i].item_name.toLowerCase().indexOf(search_term.toLowerCase()) !== -1) {
        results.push(this.inventory_list[i]);
      }
    }
    return results;
  }
}