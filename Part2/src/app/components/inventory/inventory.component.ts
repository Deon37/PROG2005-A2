// Title: Inventory Component
// Author: Deon Miller
// Student ID: 23748590
// Unit: PROG2005
// Assignment: Assessment 2 Part 2

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/item.model';

// this component handles all inventory management including add, edit, update and delete
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['../../app.css']
})
export class InventoryComponent implements OnInit {

  all_items: InventoryItem[] = [];
  popular_items: InventoryItem[] = [];
  active_table: string = 'all';

  // form field variables bound to the input fields
  form_id: string = '';
  form_name: string = '';
  form_category: string = '';
  form_quantity: string = '';
  form_price: string = '';
  form_supplier: string = '';
  form_stock: string = '';
  form_popular: string = '';
  form_comment: string = '';

  edit_name_input: string = '';
  delete_name_input: string = '';

  message_text: string = '';
  message_type: string = '';

  show_confirm: boolean = false;
  pending_delete_index: number = -1;
  pending_delete_name: string = '';

  constructor(private inventory_service: InventoryService) {}

  // this function runs on page load and fetches the inventory lists
  ngOnInit(): void {
    this.refresh_lists();
  }

  // this function gets the latest all items and popular items from the service
  refresh_lists(): void {
    this.all_items = this.inventory_service.get_all_items();
    this.popular_items = this.inventory_service.get_popular_items();
  }

  // this function shows a message and clears it after 4 seconds
  show_message(type: string, text: string): void {
    this.message_type = type;
    this.message_text = text;
    setTimeout(() => {
      this.message_text = '';
      this.message_type = '';
    }, 4000);
  }

  // this function clears all form fields
  clear_form(): void {
    this.form_id = '';
    this.form_name = '';
    this.form_category = '';
    this.form_quantity = '';
    this.form_price = '';
    this.form_supplier = '';
    this.form_stock = '';
    this.form_popular = '';
    this.form_comment = '';
  }

  // this function checks all required fields and returns an error message if something is wrong
  // should use a switch case next time lol
  validate_form(): string {
    if (this.form_id.trim() === '')       return 'Item ID is required.';
    if (this.form_name.trim() === '')     return 'Item Name is required.';
    if (this.form_category === '')        return 'Please select a category.';
    if (this.form_quantity === '')        return 'Quantity is required.';
    if (isNaN(Number(this.form_quantity)) || Number(this.form_quantity) < 0) return 'Quantity must be a valid number.';
    if (this.form_price === '')           return 'Price is required.';
    if (isNaN(Number(this.form_price)) || Number(this.form_price) < 0) return 'Price must be a valid number.';
    if (this.form_supplier.trim() === '') return 'Supplier Name is required.';
    if (this.form_stock === '')           return 'Please select a stock status.';
    if (this.form_popular === '')         return 'Please select yes or no for Popular Item.';
    return '';
  }

  // this function finds an item by name and loads its values into the form
  load_for_edit(): void {
    if (this.edit_name_input.trim() === '') {
      this.show_message('error', 'Please enter an item name to load.');
      return;
    }
    const index: number = this.inventory_service.find_by_name(this.edit_name_input.trim());
    if (index === -1) {
      this.show_message('error', 'Could not find an item named ' + this.edit_name_input + '.');
      return;
    }
    const found: InventoryItem = this.inventory_service.get_all_items()[index];
    this.form_id       = found.item_id;
    this.form_name     = found.item_name;
    this.form_category = found.category;
    this.form_quantity = found.quantity.toString();
    this.form_price    = found.price.toString();
    this.form_supplier = found.supplier_name;
    this.form_stock    = found.stock_status;
    this.form_popular  = found.popular_item;
    this.form_comment  = found.comment;
    this.show_message('info', found.item_name + ' loaded. Make your changes then click Update Item.');
  }

  // this function validates the form and adds a new item to the inventory
  add_item(): void {
    const error: string = this.validate_form();
    if (error !== '') { this.show_message('error', error); return; }

    const new_item: InventoryItem = {
      item_id:       this.form_id.trim(),
      item_name:     this.form_name.trim(),
      category:      this.form_category,
      quantity:      Number(this.form_quantity),
      price:         Number(this.form_price),
      supplier_name: this.form_supplier.trim(),
      stock_status:  this.form_stock,
      popular_item:  this.form_popular,
      comment:       this.form_comment.trim()
    };

    const success: boolean = this.inventory_service.add_item(new_item);
    if (!success) {
      this.show_message('error', 'An item with ID ' + this.form_id + ' already exists. Please use a different ID.');
      return;
    }
    this.show_message('success', new_item.item_name + ' was added successfully.');
    this.clear_form();
    this.refresh_lists();
  }

  // this function validates the form and updates the existing item found by name
  update_item(): void {
    const error: string = this.validate_form();
    if (error !== '') { this.show_message('error', error); return; }

    const index: number = this.inventory_service.find_by_name(this.form_name.trim());
    if (index === -1) {
      this.show_message('error', 'Could not find ' + this.form_name + '. Please load the item first.');
      return;
    }

    const updated: InventoryItem = {
      item_id:       this.form_id.trim(),
      item_name:     this.form_name.trim(),
      category:      this.form_category,
      quantity:      Number(this.form_quantity),
      price:         Number(this.form_price),
      supplier_name: this.form_supplier.trim(),
      stock_status:  this.form_stock,
      popular_item:  this.form_popular,
      comment:       this.form_comment.trim()
    };

    this.inventory_service.update_item(index, updated);
    this.show_message('success', updated.item_name + ' was updated successfully.');
    this.clear_form();
    this.refresh_lists();
  }

  // this function finds the item by name and shows a confirmation box before deleting
  initiate_delete(): void {
    if (this.delete_name_input.trim() === '') {
      this.show_message('error', 'Please enter an item name to delete.');
      return;
    }
    const index: number = this.inventory_service.find_by_name(this.delete_name_input.trim());
    if (index === -1) {
      this.show_message('error', 'Could not find an item named ' + this.delete_name_input + '.');
      return;
    }
    this.pending_delete_index = index;
    this.pending_delete_name = this.inventory_service.get_all_items()[index].item_name;
    this.show_confirm = true;
  }

  // this function deletes the item after the user confirms
  confirm_delete(): void {
    this.inventory_service.delete_item(this.pending_delete_index);
    this.show_message('success', this.pending_delete_name + ' was deleted.');
    this.show_confirm = false;
    this.pending_delete_index = -1;
    this.pending_delete_name = '';
    this.delete_name_input = '';
    this.refresh_lists();
  }

  // this function cancels the delete and hides the confirmation box
  cancel_delete(): void {
    this.show_confirm = false;
    this.pending_delete_index = -1;
    this.pending_delete_name = '';
    this.show_message('info', 'Delete cancelled.');
  }

  // this function switches the displayed table between all items and popular items
  switch_table(which: string): void {
    this.active_table = which;
    this.refresh_lists();
  }
}