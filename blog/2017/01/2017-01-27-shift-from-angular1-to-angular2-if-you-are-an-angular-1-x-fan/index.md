---
title: "Shift from Angular1 to Angular2 if you are an Angular 1.x fan"
utcDate: "2017-01-27"
categories: 
  - "developer"
tags: 
  - "angular1-x"
  - "angular2"
  - "angularjs"
  - "components"
  - "directive"
---

I am a big fan of AngularJS over the years and involved in developing enterprise applications using Angular1. To all the angular1.x developers out there, am going to write about my experience on migrating from Angular 1.x to Angular 2. 

  

Let's find out the differences ,

  

(i) To those who think Angular2 is the **updated version** of Angular1, No it is not . Only the names are same,  **Angular 2** is completely **rewritten**.

  

  
  

(ii) **Angular1** is using **javascript** whereas **Angular** 2 is using **Typescript** which is super set of javascript

  

  
  

(iii) Most of us are familiar with the **$scope** in Angular1, one core concept was $scope, and you the saddest part is we **don't find $scope** in **angular 2**. Angular 2 use  **zone.js** to detect changes.

  

  
  

(iv) If you are a mobile developer Angular1.x does not provide much, where **Angular 2 is mobile oriented.**

  

  
  

(v) Angular 1.x use controllers to handle the logic part, which are gone. And  controllers are replaced with “Components” in Angular 2.

  

  

 ////Angular 1.x using Controller and $scope.........  

 `var myApp = angular        .module("myModule", [])      var prods = { name: "Prod1", quantity: 1 };    .controller("productController", function($scope) {       $scope.products = prods;      });`  

 ///Angular 2 Components using TypeScript........  

 ``import { Component } from ‘angular2/core’;      template: `{{prods.name}}`    @Component({       selector: ‘prodsdata’,      })      prods = { name: ‘Prod1’, quantity: 1 };    export class ProductComponent {      }``  

  

(vi) One of the favourite directive for generating elements was **ng-repeat** with Angular 1.x

ng-repeat is replaced with **\*ngFor.**

 ///Angular 1.x structural directives:........  

   `{{item.name}}    - ///Angular 2 structural directives:.............                              {{item.name}}    -`               

  

(vii) Declaring the local variables also changed with angular2  using hash(#) prefix.  
  
  

(viii) Even though most of the concepts remains the same Two-way data binding: **ng-model** replaced with **\[(ngModel)\]** in angular 2.

  

  

(ix) Concept of **bootstraping** has changed too.Angular 1.x has 2 ways to bootstrap angular. One using ng-appattribute and other via code. In Angular 2, The only way to bootstrap angular is via code.

```
 import { bootstrap } from 'angular2/platform/browser';   import { ProductComponent } from './product.component';   bootstrap(ProductComponent);  
```

  
  

(x) Apart from all the above, main concepts such as ways of **Routing** and **Depdency** injects has been changed drastically with angular2.

  

  

In Angular 1.x, we use `$routeProvider.when()` to configure routing.  
In Angular 2, `@RouteConfig({...})` is used instead.  
Also, `ng-view` from Angular 1.x is replaced with `<router-outlet>` in Angular 2+.
  

  

One of the advantages of Angular1 Dependency Injection. In angular 2 everything is ‘class’ , so DI is achieved via **constructors**.

  

  

To begin with Angular 1.x you should be well versed with java script. Angular 1.x is simpler and easy to learn/coding based on Javascript, whereas Angular 2 just got released LIVE version and it is easy for Java developers to grasp the concepts of Angular 2.To begin with Angular 2 first start with the basic concepts of AngularJS to understand things in Angular 2 better. Happy Learning!
