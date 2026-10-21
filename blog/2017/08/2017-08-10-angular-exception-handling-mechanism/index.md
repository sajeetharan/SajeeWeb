---
title: "Angular - Exception Handling Mechanism"
date: "2017-08-10"
slug: angular-exception-handling-mechanism
authors:
  - Sajeetharan
tags:
  - angular
  - development
description: "An archived Angular 2 article on intercepting errors with a custom ErrorHandler, restored from the original WordPress post published in August 2017."
---

> **Archive notice:** This article was originally published on August 10, 2017,
> and restored from my WordPress archive in October 2026. It describes Angular 2,
> not current Angular guidance. The original repeats the same code snippet for
> the registration and extension examples; those snippets are preserved below
> and do not demonstrate those additional steps.

<!-- truncate -->

One of the main issue which i came across with angular was exception handling.
When you are developing an application, you are in full control, and you will
be able to see the errors and handle them accordingly.

But as you soon deploy it in the production, you can't see what your user is
seeing and experiencing and you not capable of knowing about errors unless
you find a way to be notified about the exceptions.

This solution i have implemented recently and it worked pretty well. Angular 2
has his own way to catch and handle errors. The default implementation of
`ErrorHandler` prints errors messages to the console. You can intercept the
default error handling and write a custom exception handler that replaces this
default as appropriate for your app.

If you have a production server and you want to send the errors to the server,
let's see how we can do it.

You need to create your own ErrorHandler class that implements the default
ErrorHandler. The only method that required is the `handleError` method that
takes the error as an argument.

```typescript
import { ErrorHandler } from "@angular/core";
export default class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    // send the error to the server
  }
}
```

The next step you can go is to change your injector to use your implementation
instead of the default. So code will be something like this,

```typescript
import { ErrorHandler } from "@angular/core";
export default class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    // send the error to the server
  }
}
```

That's all folks. If you don't want to ignore the Angular default handler,
you can extend the `ErrorHandler` class and also call the default handler like this:

```typescript
import { ErrorHandler } from "@angular/core";
export default class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    // send the error to the server
  }
}
```

That's it guys! You can apply this method on your application.

You can check the [original sample on Plunker](https://plnkr.co/edit/844kqsn11xysAavRShru?p=preview)
and play with it!
