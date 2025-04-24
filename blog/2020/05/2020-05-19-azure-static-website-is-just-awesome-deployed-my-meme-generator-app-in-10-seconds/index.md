---
title: >-
  Azure static web app is simply AWESOME : Deployed MEME generator app in 10
  seconds!
Date: '2020-05-19'
categories:
  - azurefunction
  - ci-cd
  - githubactions
  - vscode
tags:
  - angular
  - azure
  - spas
  - staticwebapp
coverImage: azure2.jpg
utcDate: '2025-04-24T09:52:37.812Z'
---

One of the highlight among the announcements made at Microsoft Build 2020 was announcement of the new Azure service in the keynote: Azure App Static Web Apps. **Azure** **Static** **Web Apps** is a service that automatically builds and deploys full stack **web apps** to **Azure** from a GitHub repository. This service allow web developers to publish websites to a production environment by building apps from a GitHub repository for free. developers can use modular and extensible patterns to deploy apps in minutes while taking advantage of the built-in scaling and cost-savings offered by serverless technologies.

It provides the **killer features** for developers such as:

- **Free web hosting** for static content like HTML, CSS, JavaScript, and images.
- **Integrated API** support provided by Azure Functions as backend APIS
- **First-party GitHub integration** where repository changes trigger builds and deployments with Github Actions
- **Globally distributed** static content, putting content closer to your users.
- **Free SSL certificates**, which are automatically renewed.
- **Custom domains**\* to provide branded customizations to your app.
- **Seamless security model** with a reverse-proxy when calling APIs, which requires no CORS configuration.
- **Authentication provider integrations** with Azure Active Directory, Facebook, Google, GitHub, and Twitter.
- **Customizable authorization role definition** and assignments.
- **Back-end routing rules** enabling full control over the content and routes you serve.
- **Generated staging versions** powered by pull requests enabling preview versions of your site before publishing.

## How i deployed Meme-Generator App:

I was building this [meme generator app](https://github.com/sajeetharan/meme4fun) for an angular session today with Azure cognitive service to detect persons in the image and also to generate a meme by adding a text as the user wanted. As soon as Azure static web apps was announced I wanted to check it out with this application on how easy it is to deploy. Experience was seamless and easy to deploy and generate a url in few seconds.

Let me explain, how i achieved this in quick time.

**Step 1. Sign-in to the Azure Portal, Search for “Static Web Apps”, and click the Create button**

Visit [https://portal.azure.com](https://portal.azure.com/), sign-in, and use the search box at the top to locate the **Static Web Apps** service (note that it’s currently in “preview”). click the **Create** button to get started.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/meme.png?w=856)

<figcaption>

Create Static Web App

</figcaption>

</figure>

In this step you’ll fill out the Static Web Apps form and sign-in to your Github account to select your repository.

- Select your Azure subscription.
- Create a [Resource Group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)
- Name your app , in my case its meme4fun
- Select a region (as of now its not available in all regions)
- Sign-in to Github and select your org, repo, and branch. 

Once you’re done filling out the form click the **Next: Build >** button.

#### **Step 2: Define Angular App location, API, and Build Output**

The next step is to define the path where my app is located in the repository, and i did not have any azure function integrated and i will keep it as empty, and the directory where my build artifacts (your bundles) are located(i.e dist/meme-4-fun). After entering that information click the **Review + create** button.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/meme6.jpg?w=798)

<figcaption>

Defining Paths

</figcaption>

</figure>

#### Step 3:  Click the Create and Look for the Magic !

Once you are good with everything you can go ahead and click the create button and you will see the application successfully gets deployed and end point generated to access it public.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/meme2.png?w=1024)

<figcaption>

Deployment complete

</figcaption>

</figure>

Once the deployment is done, if you go the resource and click on overview you will see a configuration as follows,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/overview.png?w=1024)

<figcaption>

Overview

</figcaption>

</figure>

It has the urls of the [Github Actions](https://sajeetharan.com/2019/11/24/build-and-deploy-angular-applications-to-the-cloud-with-github-actions/) and as well as Github source code and also the url of the application deployed. If you’d like to see the build in action on Github, click the **Workflow file** above.

You can access the meme generator application and create your own memes from [https://lively-forest-0fd67f010.azurestaticapps.net/](https://lively-forest-0fd67f010.azurestaticapps.net/)

Here are some great links you can visit to learn more. 

- Static Web Apps docs:   
    [https://aka.ms/swadocs](https://aka.ms/swadocs)  
- Static Web Apps Learn modules (Angular, React, Svelte, or Vue JavaScript app and API):   
    [https://aka.ms/swaframeworks](https://aka.ms/swaframeworks)  
- Static web app with the Gatsby static site generator:   
    [https://aka.ms/staticsitegen](https://aka.ms/staticsitegen)  
- Blog post:   
    [https://aka.ms/swapreview](https://aka.ms/swapreview)  

The above app is also available in the [Microsoft's sample static web app Gallery.](https://github.com/microsoft/static-web-apps-gallery-code-samples)

If you're a web dev you need to check out this cool service for sure. Cheers!
