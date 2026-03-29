// Title: App Routing Module
// Author: Deon Miller
// Student ID: 23748590
// Unit: PROG2005
// Assignment: Assessment 2 Part 2

import { Routes } from '@angular/router';
import { HomeComponent }      from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SearchComponent }    from './components/search/search.component';
import { PrivacyComponent }   from './components/privacy/privacy.component';
import { HelpComponent }      from './components/help/help.component';

// this array defines the url paths and which component to load for each page
export const routes: Routes = [
  { path: '',          component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'search',    component: SearchComponent },
  { path: 'privacy',   component: PrivacyComponent },
  { path: 'help',      component: HelpComponent },
  { path: '**',        redirectTo: '' }
];