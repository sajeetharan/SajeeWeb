---
title: "Build a web API with .NET Core using CLI Tools"
utcDate: "2018-01-31"
categories: 
  - "asp-net-core"
  - "developer"
  - "visualstudio"
tags: 
  - "azure"
  - "c"
  - "cli"
  - "crossplatform"
  - "dotnet"
  - "mac"
  - "microsoft"
  - "netcore"
  - "vscode"
---

In this blog i will start with an introduction to .NET Core CLI tools with an example of how to create a web API using the CLI tools provided with .NET Core. At the end we will set up a solution grouping an API project and a test project. Let's dive into the steps,

**Step 1 :  Installing the tools**

Need to install [.NET Core](https://www.microsoft.com/net/learn/get-started/windows?utm_expid=.-Fmi9Q05Ry2oXQgdtPElHw.0&utm_referrer=https%3A%2F%2Fwww.google.lk%2F) and [Visual Studio Code](https://code.visualstudio.com/) that are supported on Mac, Unix and Windows. You can read more on how it works on [multi-platform/framework](https://blogs.msdn.microsoft.com/dotnet/2016/09/26/introducing-net-standard/).

**Step 2 :  Creating the solution**

Let's open the terminal/Powershell as a administrator to create our solution. Lets create a solution named DotNetCoreDemoApi

```
  dotnet new sln -o DotNetCoreDemoApi  
```

The above command will create a new folder and DotNetCoreDemoApi a solution file with the  name DotNetCoreDemoApi sln .

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/266c3-2018-01-31_10-54-54_1.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/266c3-2018-01-31_10-54-54_1.png)

Lets get into that folder.

**Step 3: Creating the web API project**

Run the following command,

```
 cd DotNetCoreDemoApi 
```

Now that the solution is here, we can create our API project. Lets name the web API as **DotNetCoreDemoApi**. Run the following command to create the project.

```
dotnet new webapi -o DotNetCoreDemoApi  
```

That command will create a sub folder named **DotNetCoreDemoApi**  inside the solution **DotNetCoreDemoApi** and the ouput is as follows.

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/2962a-2018-01-31_11-11-34_2.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/2962a-2018-01-31_11-11-34_2.png)

The web API folder should contain a few files generated as above  but what we require right now is **DotNetCoreDemoApi.csproj**. We will add a reference to it in our solution. To do so, run the following command:

```
 dotnet sln add ./DotNetCoreDemoApi/DotNetCoreDemoApi.csproj
```

 

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/a4836-2018-01-31_11-21-30_3.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/a4836-2018-01-31_11-21-30_3.png)

 

**Step 4: Run the Web API** After getting a confirmation message as above , lets start the API by running that command:

```
 dotnet run --project DotNetCoreDemoApi  
```

 

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/aa088-2018-01-31_11-25-50_4.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/aa088-2018-01-31_11-25-50_4.png)

After a few seconds, it should display a message  that the API is now running locally as above. You may access it at [http://localhost:5000/api/values](http://localhost:5000/api/values) which is the Values API default endpoint.

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/5c320-2018-01-31_11-27-55_5.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/01/5c320-2018-01-31_11-27-55_5.png)

That's all , API is ready and it is up and running locally. I will continue setting up the **TestProject** in the same solution in the upcoming blog. With the DotNet core it is very feasible to get your web api setup and running in 5 minutes.
