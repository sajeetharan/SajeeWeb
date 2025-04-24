---
title: "Resolve Issue : ASP.NET Core 2.1 runs fine locally but when publishing to Azure says “An error occurred while starting the application.”"
date: "2018-10-21"
categories: 
  - "asp-net-core"
  - "c"
  - "visualstudio"
tags: 
  - "error"
coverImage: "0_lonwwnvxmmcfy-i6.png"
---

After building my first production ready application with ASP.NET Core 2.1 and tested locally when i tried to deploy for the first time on Azure, I was stuck with the following page.

Since many different problems can cause this error page, I would strongly recommend the following in order to determine the root cause quickly and easily, without meddling with Azure.

You can enable extremely helpful developer friendly error messages at startup by setting the **.UseSetting("detailedErrors", "true")** and .**CaptureStartupErrors(true)** actions in your Program.cs file.

https://gist.github.com/sajeetharan/a186641a8f7c7e00159e190f1fe97d80

With the above settings publish your application to azure. Once you identify the root cause and resolve your issue, These above settings should be removed as soon as your troubleshooting is complete so as not to expose your application to malicious attacks.

Hope this helps someone out there.
