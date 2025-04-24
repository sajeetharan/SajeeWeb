---
title: Angular Language Service - A handy extension for angular developers
Date: '2017-11-10'
categories:
  - angularcli
  - developer
tags:
  - angular
  - developers
  - plugins
  - typescript
  - vscode
  - webdevelopment
utcDate: '2025-04-24T09:52:37.458Z'
---

Even though there have been plenty of tools/extension to check the typescript/javascript code, but there have not been any extension to validate the HTML code or related features to it. [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) was released to make the developers more productive and reduce the errors by offering better code completion.

This service is available in the market place for installation for the Visual Studio as well as other code editors that support Type Script. Errors can be detected at the time of code creation . Hints are also provided for code completion. This effectively allows us to use the Intellisence for variables defined and used in the template. The navigation service is provided to link properties and their definition. This extension provides a rich editing experience for Angular templates, both inline and external templates including:

 

- Completions lists
- AOT Diagnostic messages
- Quick info
- Go to definition

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/11/c8c31-language-service.gif?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/11/c8c31-language-service.gif)

The language service is developed by the Angular core team. At the time of writing, it is ready to use in VSCode, Sublime Text and WebStorm.

Language service uses the Angular compiler for parsing our application and producing diagnostics. It decorates the TypeScript language service in and uses its logic again. The coolest feature about the service is that it is not coupled to a specific Angular version and can be used in any text editor and IDE as soon as there’s an available plugin.

More about the language service can be found in the ng-conf talk by Chuck Jazdzewski (the creator of the language service) [“Using the Angular Template Language Service”.](https://www.youtube.com/watch?v=ez3R0Gi4z5A)

Start using in your angular projects and be more productive. Cheers!
