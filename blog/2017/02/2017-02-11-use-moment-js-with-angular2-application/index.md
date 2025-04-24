---
title: "Use Moment.js with angular2 application"
utcDate: "2017-02-11"
categories: 
  - "developer"
---

Recently i was developing an application in angular2 where i had to use a calendar which shows the results for this **month**, this **week** and this **weekend**. I was finding a solution in pure javascript but it was time consuming. I decided to go on with moment.js , this is how i have embedded moment with angular2 application.  
  
**Step 1 :** npm install moment --save  
  
**Step 2 :** In your `systemjs.config.js` file's `map` array add:  
  
'moment': 'node\_modules/moment'  
  
to `packages` array add:  
  
```js
'moment': { defaultExtension: 'js' }
```
  
**Step 3 :** In your component.ts use: `import * as moment from 'moment/moment';`  
  
and that's it. Now you should be able to use moment with your application.  
  
**Example:**  

```ts
public setDate(term: string) {
  var status: string;
  status = term;
  switch (status) {
    case "today":
      this.fromDate = moment().toDate();
      break;
    case "tomorrow":
      this.fromDate = moment(new Date()).add(1, 'days').toDate();
      break;
    case "weekend":
      this.fromDate = moment().startOf('week').add(6, 'days').toDate();
      this.toDate = moment().startOf('week').add(7, 'days').toDate();
      break;
    case "thisweek":
      this.fromDate = moment().startOf('week').toDate();
      this.toDate = moment().startOf('week').add(7, 'days').toDate();
      break;
    case "nextweek":
      this.fromDate = moment().startOf('week').add(7, 'days').toDate();
      this.toDate = moment().startOf('week').add(14, 'days').toDate();
      break;
    case "thismonth":
      var date = new Date(), y = date.getFullYear(), m = date.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      this.fromDate = moment(firstDay).toDate();
      this.toDate = moment(lastDay).toDate();
      break;
  }
}
```