---
title: "How to restore an Angular application code with dist folder"
date: "2019-05-19"
categories: 
  - "html"
  - "vscode"
tags: 
  - "angular"
  - "coding"
  - "engineering"
  - "programming"
coverImage: "revers_01.jpg"
---

This is going to be a very small blog post, but indeed it will be helpful for lot of Angular developers out there. One of the recent question i answered on Stack overflow on how to reverse engineer an [Angular application](https://stackoverflow.com/questions/56197381/i-want-to-decompile-an-angular-7-built-app/56197497#56197497).

> The question was " I built an Angular app using ng build. I have the built version but I accidently deleted my code. Is there any way I can get my code back from my build version? "

Even though the correct answer is NO, but you will be able to retrieve 80% of the code with the following steps.

**Step 1:** Deploy the app code in the Dist folder

**Step 2:** Use Google Chrome Developer tools (F12).

**Step 3:** Under debugger tab, look under **`Webpack -> Src`** you will see all typescript files. you can copy and past the code provided which would help you to at least build the structure of your application.
