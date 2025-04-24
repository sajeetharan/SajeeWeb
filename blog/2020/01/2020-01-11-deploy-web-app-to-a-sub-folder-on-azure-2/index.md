---
title: "How to deploy Web App to a Sub-folder on Azure Appservice"
utcDate: "2020-01-11"
categories: 
  - "appservice"
  - "asp-net-core"
  - "cloud"
tags: 
  - "angular"
  - "azure"
  - "deployment"
  - "publish"
  - "virtualdirectory"
  - "webapp"
coverImage: "appservice.jpg"
---

I came across this question about "How to deploy a web app within a sub folder on Azure" in Stackoverflow many times. Even though there is an official [documentation](https://docs.microsoft.com/en-us/archive/blogs/tomholl/deploying-multiple-virtual-directories-to-a-single-azure-website), this question has not been addressed in general. With Virtual Directories, You could keep your web sites in separate folders and use the ‘virtual directories and applications’ settings in Azure to publish the two different projects under the same site.

However, say if you have an ASP.NET Core/Angular app to a sub-folder inside Azure Web App (App Service), and wanted to deploy on Azure inside a sub-folder. You can simply navigate to **Azure portal -> Select the Web App** -> **Overview**

- Download the publish profile
- Import in Visual Studio
- Edit the web-deploy profile(Normally the publish profile will have Web Deploy as well as FTP profile)
    - Change Site Name from `your-site` to `your-site\folder\sub-folder`
    - Change the Destination URL from `http://your-site.azurewebsites.net` to `http://your-site.azurewebsites.net/folder/sub-folder`
- Publish

You should be getting an error as follows,

> **_System.TypeLoadException: Method ‘get\_Settings’ in type ‘Microsoft.Web.LibraryManager.Build.HostInteraction’ from assembly ‘Microsoft.Web.LibraryManager.Build_**

You can resolve the above issue by updating the nuget package named **Microsoft.Web.LibraryManager.Build** in your project.

One other thing that you should be aware is tha**t, Go to portal > demo-site App Service > Configuration > Path Mappings > Virtual applications and directories**. And add the following,

<figure>

<table><tbody><tr><td><strong>Virtual Path</strong></td><td><strong>Physical Path</strong></td><td><strong>Type</strong></td></tr><tr><td>/folder</td><td>site\wwwroot\folder</td><td>Folder</td></tr><tr><td>/folder/sub-folder</td><td>site\wwwroot\folder\sub-folder</td><td>Application</td></tr></tbody></table>

<figcaption>

Configuration Virtual Directory

</figcaption>



</figure>

Now publish from Visual Studio. If you only need to publish to a first level folder, i.e to `your-site\folder`, then all you have to do is, change the **Type** to `Application` in the Path mappings for `/folder`, and skip the sub-folder entry since you don’t need it. And correct the **Site Name** and **Destination URL** in the publish profile accordingly.

Hope there will be no more questions on the same. Happy Coding!
