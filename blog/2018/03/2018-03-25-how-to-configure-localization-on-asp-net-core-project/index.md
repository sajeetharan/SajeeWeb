---
title: How to configure localization on Asp.Net Core project
Date: '2018-03-25'
categories:
  - developer
  - visualstudio
  - vscode
tags:
  - asp-net-core
  - c
  - dotnetcore
  - localization
  - mvc
  - nuget
  - razor
  - sample
utcDate: '2025-04-24T09:52:37.500Z'
---

In this post I'll walk through the process of adding localization to an **ASP.NET Core** application. Localization in ASP.NET Core is almost similar to the way it works in the ASP.NET 4.X. You have to define a number of .resx resource files in your application, one for each culture you support. You then reference resources via a key, and depending on the current culture, the appropriate value is selected from the closest matching resource file.

As I stated above, concept of a .resx file per culture remains in ASP.NET Core, the way resources are used has changed quite a lot. In the previous version, when you added a .resx file to your solution, a designer file would be created, providing static strongly typed access to your resources through calls such as Resources.LoginString. In ASP.NET Core, resources are accessed through two abstractions, IStringLocalizer and IStringLocalizer, which are injected where needed via dependency injection. These interfaces have an indexer, that allows you to access resources by a string key. If no resource exists for the key (i.e. you haven't created an appropriate .resx file containing the key), then the key itself is used as the resource. ASP.NET Core introduced two interfaces namely **IStringLocalizer** and **IStringLocalizer** for implementing or developing localized applications. IStringLocalizer interface uses the ResourceManager and ResourceReader to provide user defined culture-specific resources at run time. This simple interface contains an indexer and an IEnumerable for returning localized strings to the application. IStringLocalizer doesn't require we to store the default language strings in a resource file.

Lets see how to add localization to your application step by step.

**Step 1:** As first step, add the **Microsoft.AspNetCore.Localization** NuGet package.  

- _**Microsoft.AspNetCore.Localization.Routing**_: Localization with routes, e.g. [mysite.com/en-us/Home](http://mysite.com/en-us/Home/Index)
- _**Microsoft.AspNetCore.Mvc.Localization**_: MVC Core Localization components, e.g. view localization, data annotation localization (Included in _Microsoft.AspNetCore.Mvc)_

**Step 2:** Lets configure the **Startup.cs**

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddLocalization(o =>;
    {
       o.ResourcesPath = "Resources";
    });
    services.AddMvc();
}
```

The above configuration adds the necessary services for localization to the service container. It also specifies that we will use a folder called _Resources_ to put our translation resources in.

**Step 3:** Let's add the request localization middleware to Configure in Startup:

 

```
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseStaticFiles();
 
    IList<CultureInfo> supportedCultures = new List<CultureInfo>;
    {
        new CultureInfo("en-US"),
        new CultureInfo("no"),
    };
    app.UseRequestLocalization(new RequestLocalizationOptions
    {
        DefaultRequestCulture = new RequestCulture("en-US"),
        SupportedCultures = supportedCultures,
        SupportedUICultures = supportedCultures
    });
 
    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

The three options we specify for the middleware are all important:The above step is necessary so that the culture for the request is set correctly. Note that it must be before any middleware that depends on the culture, such as MVC.

- **DefaultRequestCulture**: This is the fallback that is used if we can't figure out which one should be used
- **SupportedCultures** & **SupportedUICultures**: The cultures we wish to support

The above  middleware adds 3 providers for the request culture by default:

- **QueryStringRequestCultureProvider**: Gets the culture from query string values
- **CookieRequestCultureProvider**: Gets the culture from a cookie
- **AcceptLanguageHeaderRequestCultureProvider**: Gets the culture from the Accept-Language request header

Most browsers send the **Accept-Language** header by default to all pages. 

**Step 4:** Adding the **resource** file

Last thing we need before we get to actually using the localization is _a_ **resource** _file_.All we need to do is:

- Create a folder called Resources(Can be any name) in the project.
-      Add a Resources file called SharedResources.en.resx .
-      Add a line in the resource file with the **Name** set to Login and the **Value** to "Login To My System"

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/cce31-2018-03-25_10-55-09.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/cce31-2018-03-25_10-55-09.png)

**Step 5:** Create a file named **SharedResources.cs** to configure the type of Resource 

```
namespace SharedResourcesExample
{
    public class SharedResources
    {
    }
}
```

**Step 6:** Modify the constuctor of your controller say "HomeController" give us an **IStringLocalizer**



**Step 7**: To make the **localization** reflects on the HTML , you need to add the following  on the view

```csharp
private IStringLocalizer<SharedResources> _sharedLocalizer;

public HomeController(IStringLocalizer<SharedResources> sharedLocalizer)
{
    _sharedLocalizer = sharedLocalizer;
}
```

**NOTE:** I was stuck in an issue that localization worked on controller but not on the view. The fix is to check the namespace of SharedResource in the view, it should be the one that corresponds to the class we added.

If you are stuck with any of the steps, find the code in the [sample project.](https://github.com/sajeetharan/AspNetCoreLocalization) That's all about setting up localization on an ASP.NET CORE project.

**References :**

[https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization)

[https://github.com/aspnet/Localization](https://github.com/aspnet/Localization)

[https://stackoverflow.com/questions/49424452/aspnetcore2-0-localization-not-working-on-html](https://stackoverflow.com/questions/49424452/aspnetcore2-0-localization-not-working-on-html)
