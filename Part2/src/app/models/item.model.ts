// Title: Inventory Item Model
// Author: Deon Miller
// Student ID: 23748590
// Unit: PROG2005
// Assignment: Assessment 2 Part 2

// this interface defines the shape of an inventory item used across the whole app
export interface InventoryItem {
  item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: string;
  popular_item: string;
  comment: string;
}