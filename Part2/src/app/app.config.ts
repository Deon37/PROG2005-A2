// Title: App Config
// Author: Deon Miller
// Student ID: 23748590
// Unit: PROG2005
// Assignment: Assessment 2 Part 2

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing-module';

// this config provides the router to the app using the routes defined in app-routing-module
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};