---
title: "Build a select dropdown with *ngFor in Angular 2"
date: "2017-06-11"
categories: 
  - "angular"
  - "developer"
  - "typescript"
---

One of the most repeated questions with angular2 i have come across Stack overflow is "how to generate a select dropdown with an array or object". Hence, i decided to write a sample post with sample code to ease the search.

I will be posting two samples with one simple array and other with object.

Assume you want to generate a dropdown select by having an array with years.

```
years = ['2016','2015','2014'];  
```

The app.component.ts code will look like,

```
 import {Component} from '@angular/core';  
 import {Http} from '@angular/http'  
 import {bootstrap} from '@angular/platform-browser-dynamic';  
 import { Component } from './Component';  
 @Component({  
  selector: 'material-app',  
  templateUrl: 'app.component.html'  
 })  
 export class AppComponent {  
  years = ['2016','2015','2014'];  
  selectedyear = '2015' ;  
  onChange(year) {  
   alert(year);  
  }  
 } 
```

In the above cocde **selectedyear** indicates the default value of the dropdown whenever the app is loaded.  onChange is the event gets fired whenever a option is changed, you can capture the selected value with the event.

\*ngFor is being used to repeat the items as options. It's simple as above.

[DEMO USING ARRAY](https://plnkr.co/edit/dYowSFfMUy6uCwAvtyGJ?p=preview)

Next we will see how to bind a object using \*ngFor . Assume  if you have a object and want to bind the keys as drop down values,

```
 currencyList = {  
 "USD": {  
 "symbol": "$",  
 "name": "US Dollar",  
 "symbol_native": "$",  
 "decimal_digits": 2,  
 "rounding": 0,  
 "code": "USD",  
 "name_plural": "US dollars"  
 },  
 "CAD": {  
 "symbol": "CA$",  
 "name": "Canadian Dollar",  
 "symbol_native": "$",  
 "decimal_digits": 2,  
 "rounding": 0,  
 "code": "CAD",  
 "name_plural": "Canadian dollars"  
 }  
 };  
```

to get the keys of object you can use  **Object.keys(this.currencyList);** and the rest is same as above sample.

[DEMO USING OBJECT](https://plnkr.co/edit/jwXs374LmYYsq4GxCGka?p=preview)
