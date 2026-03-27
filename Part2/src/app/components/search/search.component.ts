import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['../../app.css']
})
export class SearchComponent {

  search_term: string = '';
  category_filter: string = '';
  stock_filter: string = '';
  search_results: InventoryItem[] = [];
  has_searched: boolean = false;

  constructor(private inventory_service: InventoryService) {}

  run_search(): void {
    let results: InventoryItem[] = this.inventory_service.get_all_items();

    if (this.search_term.trim() !== '') {
      const lower: string = this.search_term.toLowerCase();
      const filtered: InventoryItem[] = [];
      for (let i: number = 0; i < results.length; i++) {
        if (results[i].item_name.toLowerCase().indexOf(lower) !== -1) {
          filtered.push(results[i]);
        }
      }
      results = filtered;
    }

    if (this.category_filter !== '') {
      const filtered: InventoryItem[] = [];
      for (let i: number = 0; i < results.length; i++) {
        if (results[i].category === this.category_filter) {
          filtered.push(results[i]);
        }
      }
      results = filtered;
    }

    if (this.stock_filter !== '') {
      const filtered: InventoryItem[] = [];
      for (let i: number = 0; i < results.length; i++) {
        if (results[i].stock_status === this.stock_filter) {
          filtered.push(results[i]);
        }
      }
      results = filtered;
    }

    this.search_results = results;
    this.has_searched = true;
  }

  clear_search(): void {
    this.search_term = '';
    this.category_filter = '';
    this.stock_filter = '';
    this.search_results = [];
    this.has_searched = false;
  }

  get_badge_class(stock_status: string): string {
    if (stock_status === 'In Stock')  return 'badge in_stock';
    if (stock_status === 'Low Stock') return 'badge low_stock';
    return 'badge out_stock';
  }
}