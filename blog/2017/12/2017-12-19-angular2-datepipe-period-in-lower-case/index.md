---
title: Angular2 - DatePipe period in lower case.
Date: '2017-12-19'
categories:
  - developer
utcDate: '2025-04-24T09:52:37.469Z'
---

There are several occasions customer would have requested to change the date format in your application to be in small case as follows.

```
Tuesday, December 19, 7:00 am 
```

Since the date format does not support the above format, either we can display entire thing in small case with the  lowercase pipe

Since it converts the whole format in lowercase, you can split it in two and apply the lowercase only for the period as follows

```
{1234567 | Date:'EEEE, MMMM d, h:mm '} {1234567 l Date:' a' | lowercase }
```

that's it, it is easier rather than using a custom pipe! Here is the working [demo](https://stackblitz.com/edit/angular-fr614c?file=app/app.component.html)
