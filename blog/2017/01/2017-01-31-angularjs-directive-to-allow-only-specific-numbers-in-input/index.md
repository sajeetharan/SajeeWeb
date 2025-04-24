---
title: AngularJS directive to allow only specific numbers in input
Date: '2017-01-31'
categories:
  - developer
utcDate: '2025-04-24T09:52:37.401Z'
---

I came across this question on stackoverflow to allow the user to type only specific numbers such as 3,6,9,12 and so on. You can use the following directive which checks for the key and allows as input.  
  
**Directive Code**  

```
 angular.module('demo').directive('restrictTo', function() {     return {       restrict: 'A',       link: function (scope, element, attrs) {         var include = /3|6|9|12/;         element[0].addEventListener('keydown', function(event) {           if (!include.test(event.key)) {             event.preventDefault();           }         });       }     }   });  
```

  
Demo:  
  
https://plnkr.co/edit/oogjTylyl2MTS91nFyxk?p=preview  
  
Also we can use the ng-pattern as follows,  
  

```
 input name="numberField" type="number" data-ng-model="model.number" data-ng-pattern="/^(3|6|9|12|15)$/"/>  
```
