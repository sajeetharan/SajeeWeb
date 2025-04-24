---
title: "Ace Angular Interview in 20 minutes - PART1"
date: "2018-09-15"
categories: 
  - "typescript"
  - "visualstudio"
tags: 
  - "angular"
  - "angular6"
  - "angularcli"
  - "interview"
coverImage: "angular_interview.jpg"
---

This should help all the Angular developers out there to test yourself on the knowledge on Angular. I have listed down the concepts/questions from various sources such as Stackoverflow,Medium etc. Will be continuing this with 2 more posts.

### **1\. What's new in Angular 6**

- **Angular Elements** **-** Angular Elements is a project that lets you wrap your Angular components as Web Components and embed them in a non-Angular application.
- New Rendering Engine: Ivy - increases in speed and decreases in application size.
- **Tree-shakeable providers** **-** a new, recommended, way to register a provider, directly inside the @Injectable() decorator, using the new providedIn attribute
- **RxJS 6** **-** Angular 6 now uses RxJS 6 internally, and requires you to update your application also. RxJS released a library called rxjs-compat, that allows you to bump RxJS to version 6.0 even if you, or one of the libraries you’re using, is still using one of the “old” syntaxes.
- **ElementRef** **-** in Angular 5.0 or older, is that the said ElementRef had its nativeElement property typed as any. In Angular 6.0, you can now type ElementRef more strictly.
- **Animations** **-** The polyfill web-animations-js is not necessary anymore for animations in Angular 6.0, except if you are using the AnimationBuilder.
- **i18n** **-** possibility to have “runtime i18n”, without having to build the application once per locale

### **2.** **Difference between "Constructor" and "ngOnInit**

- The **Constructor** is a default method of the class that is executed when the class is instantiated and ensures proper initialization of fields in the class and its subclasses.

- **ngOnInit** is a life cycle hook called by Angular to indicate that Angular is done creating the component. We have to import OnInit in order to use like this (actually implementing OnInit is not mandatory but considered good practice).

### **3\. Difference between "declarations", "providers" and "import" in NgModule**

- **imports** makes the exported declarations of other modules available in the current module. It is also used to import supporting modules likes FormsModule, RouterModule, CommonModule, or any other custom-made feature module.
- **declarations** are to make directives (including components and pipes) from the current module available to other directives in the current module. Selectors of directives, components or pipes are only matched against the HTML if they are declared or imported.
- **providers** are to make services and values known to DI. They are added to the root scope and they are injected to other services or directives that have them as dependency.

 

A special case for **`providers`**are lazy loaded modules that get their own child injector. **`providers`**of a lazy loaded module are only provided to this lazy loaded module by default (not the whole application as it is with other modules).

**Example :** 

https://gist.github.com/sajeetharan/c3e872abd22fe0b43e7b8ae47289d018

### 4.Ahead of Time Compilation

 Angular Ahead-of-Time compiler pre-compiles application components and their templates during the build process.Apps compiled with AOT launch faster for several reasons

- Application components execute immediately, without client-side compilation.
- Templates are embedded as code within their components so there is no client-side request for template files.
- You don't download the Angular compiler, which is pretty big on its own.
- The compiler discards unused Angular directives that a tree-shaking tool can then exclude.
- Also has small bundle size and faster load time.

### **5\. Need of lazy loading modules in Angular.**

Lazy loading is useful when the application size is growing. In lazy loading, feature module will be loaded on demand and hence application start will be faster.To load a feature module lazily we need to load it using **loadChildren property** in route configuration and that feature module must not be imported in application module.
