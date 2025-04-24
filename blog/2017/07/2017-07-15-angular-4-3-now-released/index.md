---
title: "Angular 4.3 Now released"
utcDate: "2017-07-15"
categories: 
  - "angular"
  - "developer"
  - "typescript"
  - "vscode"
---

Angular version 4.3 has been released. This is a very minor release.

**What’s new?**

- It has **HttpClient**, a smaller, easier to use, and more powerful library for making HTTP Requests. [Learn more about it from the docs](https://angular.io/guide/http)
- New router life cycle events for Guards and Resolvers. Four new events: **GuardsCheckStart**, **GuardsCheckEnd**, **ResolveStart**, **ResolveEnd** join the existing set of life cycle event such as **NavigationStart**
- [Conditionally disable animations](https://github.com/angular/angular/issues/16483) via a new attribute, **\[@.disabled\]**
- Support for the emulated **/deep/** CSS Selector (the Shadow-Piercing descendant combinator aka **\>>>**) has been deprecated to match browser implementations and [Chrome](https://www.chromestatus.com/features/6750456638341120)’s intent to remove. **::ng-deep** has been added to provide a temporary workaround for developers currently using this feature. 

Wondering what have changed ? For the complete list of features and bugfixes check [the changelog](https://github.com/angular/angular/blob/master/CHANGELOG.md).
