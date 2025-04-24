---
title: "A checklist for building Angular web applications in the correct way"
date: "2018-08-04"
categories: 
  - "javascript"
  - "visualstudio"
tags: 
  - "angular"
  - "angularcli"
  - "typescript"
coverImage: "angular_checklist.jpg"
---

Hey guys, There has not been a  proper resource to have a checklist to make sure that applicaiton is flawless.I decided to write a simple tips on checklist items needed before you deploy your app to production.Following are a few Angular Code Review Checklists useful while doing a peer review of Angular code. Make sure to check these when you are building a production ready application

### **#1 - Code modularity**  

Layered Code with good Modularity.

### #2 - Component per file 

Each file must not contain more than one Component/Controller, etc.

### #3 - Routing

Always configure routing with lazy loading

### #4 - Shared resources at centralized location

Store images/language translations under assets

### #5 - 3rd Party libraries 

 If you are integrating with any 3rd party libraries make sure to check for Security Flaws

### #6 - Data security 

Use  Encryption of Sensitive Data

### #7 - Offline data security

Consider security if you are storing Data in localstorage or session storage.

### #8 - Cookies data and handwiring of secrets 

 Security Flaws

### #9 - Don't use pipe/functions in the template

Calling function binding in the template will lead to  performance issue

### #10 - Change detection + state management & reactive extensions

Use RxJS, NgRx/Store (or Redux)

### #11 - Use javascript or typescript

 Stick to ONE & Avoid Hybrid

### #12 - Don't use pipe/functions in the template

 Bundling, Chunking, Treeshaking, Minification, Uglification, Compression

### #13 - ECMAscript compatibility - ES7

### #14 - Angular Style Guide (Official Reference)

 [https://angular.io/guide/styleguide](https://angular.io/guide/styleguide)

### #15 - Async service

 Adequate and Appropriate use of it.

### #16 - Hierarchical components,models,interfaces etc

### #17 - Constants

No-Scattered Hard-Coded constants data but must be at one place.

### #18 - Images,fonts and other static files

Place them in respective directories and not scattered across.

### #19 - TSLint.json

To follow Angular Style Guide in order to run SonarQube or Codelyzer. Follow [https://github.com/Angular-Projects-V-1-to-X/codelyzer](https://github.com/Angular-Projects-V-1-to-X/codelyzer)

### #20 - Finally to improve performance 

### Refer the steps  - [https://github.com/mgechev/angular-performance-checklist](https://github.com/mgechev/angular-performance-checklist)

Hope it helps all the developers out there.
