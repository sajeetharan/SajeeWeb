---
title: "Let's build clean and Scalable Angular application"
date: "2018-10-24"
categories: 
  - "typescript"
tags: 
  - "angular"
  - "angular7"
  - "angularcli"
  - "best-practices"
  - "extensions"
  - "lazyloading"
  - "tips"
  - "tricks"
  - "vscode"
coverImage: "angular.jpg"
---

The wait is over and Angular 7 is out, finally time has come to write about some tips to build fast angular application. In this blog i will share my experience with practices that you need to follow when you are starting a new project.

There are three primary things important when you are starting to build an application with Angular.

1. Project Architecture
2. Application Infrastructure
3. Conventions,Formating and Tooling

## **CONVENTIONS,FORMATTING AND TOOLING**

- ### Always place the Angular application outside your backend code
    

Keep the application in its own repository so that can be deployed/version separately. It will also help in tooling. One key rule is to treat it as a real application.

- ### Use VS Code for best experience
    

Encourage your team to switch to VS Code which has immense support for development with Angular. It has strong support for extensions used in Angular projects and well-regarded by front end community.

- ### Use Tooling
    

It will kill all the disagreements. Use VSCode extensions such as TSLint, Angular Language ervice, Prettier, EditorConfig and SCSS intellisence.

- ### Naming and Syntax Conventions
    

Always use Singular for Modules and Singular or Plural for  components/ services/ directives and pipes

- ### Use Angular style commit messages
    

[Examples :](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

'feat(notification.service): add display param'

'refactor(order models): rename couponId to couponCodeId

- ### Use Codelyzer to do statistical analysis on Angular/Typescript code
    

It's a set of tslint rules for static code analysis of Angular TypeScript projects. If you are doing continuous deployment configure with your pipeline.

- ### Follow consistent structure
    

If you are using Angular-Cli always follow the same pattern to generate the necessary files so that it will be consistent throughout the application.

- ### Absolute path for ES Modules
    

Always use absolute path that would help in refactoring(moving files around or renaming) and very easy to organize files.

- ### Do not use null and assign default values
    

In the templates always use safe navigation type operator which can help in preventing the following annoying errors "cannot read property "name" of undefined"

- ### Choose Intelligent defaults and be consistent
    

**''** for string - declare string with default value ""

**0** for number - declare number with default value 0**\[\]** for arrays - declare array with default value \[\]

- ### Build small reusable components
    

Don't make your component code go more than _**300 lines**_. Split the pieces that can be reused in a component and make them as a new component. The component should be made as dumb as possible. It should not dependent on any inputs or outputs provided, it should work simple. General rule of thumb is to make the last child in the component tree to be the dumbest. Reusable components reduce the duplication of code and you can make changes easily.

Components should deal only with the presentation logic Don't have logic other than the presentation logic. Components are designed for presentational purposes and only should focus on what the view should do. Business logics should be separated out to services/methods from the presentation/view logic.

- ### Use trackBy in ngFor Loops
    

DOM manipulations are always expensive, immutable practices always generate a new collection which will result in bad performance. When your array changes, Angular will be rendering the whole DOM tree, when you use **trackBy**, it will know which elements has changed and will make changes only to those particular elements.

- ### const vs let
    

Make use of let and const wherever its appropriate. It will help a lot in identifying issues when a value is reassigned to a constant accidentally with a compile error and it improves the readability of the code.

- ### Pipable Operators
    

With Angular version above 5.5 , you can use pipeable operators which are tree-shakable (only the code need to execute will be included when they are imported) and it will be easy to identify unused code in the component files.

- ### Subscribe in template
    

Rather than subscribe in service or async popes unsubscribe themself automatically it will make the code simpler by stopping the need to manually manage subscriptions which could cause a memory leak. When using subscribe, the risks can be eliminated by using a lint rule to detect unsubscribed observables.

- ### Clean up subscriptions
    

When you subscribe in the component to observables, make sure you unsubscribe from them completely with operators like take,takeUntil,Unsubscribe etc

- ### Use appropriate Operators
    

**switchMap:** when you want to ignore the previous emissions when there is a new emission **mergeMap:** when you want to concurrently handle all the emissions

**concatMap:** when you want to handle the emissions one after the other as they are emitted

**exhaustMap:** when you want to cancel all the new emissions while processing a previous emisssion

- ### Stop using any:type everything in the code
    

Always declare variables or constants with a type other than any. This is the advantage that you have with Typescript when you have good typings in your application which makes refactoring easier and safe and also avoid unintented issues.

- ### Use lint rules as you need
    

TSLINT has various options built-in already like no-any, no-magic-numbers, no-console, etc that you can configure in your **tslint.json to** enforce certain rules in your code base

- ### Dont Repeat Yourself
    

One of the common mistake that i did as a developer was copy paste the same code in all components. Do not repeat or have the same code in different places in the code base. Extract the repeating code and make them as a generic method which could be used in different components.

- ### Avoid Logic in component templates
    

Place the logic in the component file rather than on the template such as && condition since it cannot be possible to unit test also it is prone to more bugs when changing template code

## **APPLICATION INFRASTRUCTURE**

- ### Lazy load everything
    

When you are building application with large number of modules always do lazy loading which could improve your application performance by large margin. Angular CLI makes this easy and helps break up your app into logical bundles. With Lazy loading users only pay for what they want. For example, Sensitive (admin only) code will not be downloaded for users that don't have access.

- ### Analyze your bundle
    

If you are using any bundling mechanism always analyze the size of the bundle generated. You can use webpack-bundle-analyzer for example and you can improve the performance there on.

Install source map explorer

- **npm install -g source-map-explorer**

Build with source map

- **ng build --prod -sm**

Inspect your bundle

- **source-map-explorer dist/vendor\*.js**
- ### Use Debug.Service.ts to track errors
    

It is always good to have a common debug service to assist with the development. This service could replace the calls to **console.log.**  You can use Visual studio extension [codelens](https://docs.microsoft.com/en-us/visualstudio/ide/find-code-changes-and-other-history-with-codelens?view=vs-2017)to track down the calls with console.log.This service can be toggled at run time with local storage value and needs to be switched off with production builds.

- ### **RXJS Operators**
    

When using it becomes handy to handle so many operations with Rxjs operators. Always remember to include/import only the things you need. Also make sure to add **noUnusedLocals** in the tsconfig.

- ### Use ES Modules for helper functions
    

With ES Modules it is really easy to import only available when thy are needed.

- ### Keep environment values in environment files
    

It becomes really easy and very helpful to manage environment values when it comes to continuous improvement and continuous deployment.

- ### Avoid Base classes / Inheritance
    

Even though Angular is build with Typescript, many of the developers tend to use services from a base class. This should be only if necessary. It will result in restricting the flexibility as when your app grows and use cases changes.

Also create a utility.services.ts to contain all the base helper services. For ex: **debug.service.ts , notification.service.ts  session.service.ts can be placed within utility.service.ts** which helps in preventing app wide changes to base constructor.

- ### Use Obseravable/State Management Patterns
    

It is really important to follow Redux patern (RxJS) to have a better state management in application. Also in components use **ngUnsubscribe**for complex Observable management in Components. Use **shareReplay**operator and/or **async pipe** for simpler cases

- ### More things to consider on Application
    

Always consider browser caching and application versioning. Test the update process and the experience across browsers. Always figure out user experience and continuously work on it. Use [global error handler](http://sajeetharan.blogspot.com/2017/08/angular-2-exception-handler.html) to store report errors to API and do not access Document or Window Objects manually.

## PROJECT ARCHITECTURE

- One of the primary thing that you need to consider before starting a project is the architecture on how to build flexible,simple,fast application. It needs lot of planning and consistency to get the basement correct. Building things is really hard enough. When it comes to building Angular application i would recommend to follow the following Guidelines
- One best place to start with good practices is by following the recommended [style guide](https://angular.io/guide/styleguide). You need to take what works for your team and skip what does not work. Also try to learn from others mistakes or any other projects that you've already worked with.
- While designing module,s it is really important to know about how to structure your modules and what should go under **Feature/Core/Shared** Modules.

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/10/24f8c-68747470733a2f2f692e696d6775722e636f6d2f794b4e345a36572e706e67.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/10/24f8c-68747470733a2f2f692e696d6775722e636f6d2f794b4e345a36572e706e67.png)

- Keep a **flat file structure** as long as possible which means you should not add hierarchy with less than 20 files and you can always move files as the app grows larger.
- Maintain your application version using the **package.json** which could be embedded in your app.
- Use package management tooling to guarantee reproducible dev environment and builds.
- Set custom host for the application by changing the default url.
- Use proxies if you are integrating with an API.
- Lets look at what you can do while implementing the above architecture in your application

Follow this [repository](https://github.com/sajeetharan/Angular-Structure) in order to get started

The above are the some of the most important practices that you need to follow when you are starting a  new project with Angular. Hope this helps someone out there.

<!--more-->
