---
title: Automate Azure Resources with PowerApp
Date: '2020-02-08'
categories:
  - flow
  - powerapp
  - vscode
tags:
  - automationjobs
  - azure
  - microsoft
  - powerplatform
  - resources
  - virtualmachines
coverImage: post1.jpg
utcDate: '2025-04-24T09:52:37.720Z'
---

Microsoft's Power Platform is a low code platform which enable the organization to analyse data from multiple sources, act on it through application and automate business process. Power Platform contains 3 main aspects (Power Apps,Power BI and Microsoft Flow) and it also integrates two main ecosystems(Office 365 and Dynamics 365). In this blog we will see in detail about Power Apps which helps to quickly build apps that connects data and run on web and mobile devices.

### **Overview :**

We wills see how to build a simple Power App to automate scaling of resources in Azure in a simple yet powerful fashion to help save you money in the cloud using multiple Microsoft tools. In this post, we will use Azure Automation run books to code Azure Power Shell scripts, MS Flow as orchestration tool and MS Power Apps as the simple interface. If you have an Azure Environment with lot of resources it becomes hassle to manage the scaling part of it if you don't have the auto scaling implemented. The following Power App will help to understand how easy it is to build the above scenario.

### Prerequisites :

We will use the following Azure resources to showcase how scaling and automation can save lot of cost.

- AppService Plan
- Azure SQL database
- Virtual Machines

### Step 1: Create and Update Automation Account :

First we need to create the Azure Automation account. Navigate to Create **Resources -> search for Automation Account** on the search bar. Create a new resource as follows,

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/1-2.jpg?w=403)

Once you have created the resource, you also need to install the required modules for this particular demo which includes  
**\-AzureRM.Resources  
\-AzureRM.Profile**

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/2-1.jpg?w=1024)

<figcaption>

Installing necessary Modules

</figcaption>

</figure>

### Step 2: Create Azure PowerShell RunBooks

Next step is to create the run books by going to the Runbooks blade, for this tutorial lets create 6 run books one for each resources and its purpose. We need to create PowerShell scripts for each of those types

**Scale Up SQL  
\-Scale Up ASP  
\-Start VM  
\-Scale Down SQL  
\-Scale Down ASP  
\-Stop VM**

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/3.jpg?w=1024)

<figcaption>

Creating RunBook

</figcaption>

</figure>

PowerShell scripts for each of these are found in the [Github repository.](https://github.com/sajeetharan/Az-PowerApp-Automation) We need to create runbook for each of the scripts.

All the runbooks above can be scheduled and automated to run for desired length of time, particular days of the week and time frame or continuously with no expiry. For an enterprise for non-production you would want it to scale down end of business hours and at the weekend.

### Step 3: Create and Link Microsoft Flow with Azure Automation Run books

Once we tested with the above Powershell scripts and the runbooks, tested and published now we can move on the next step to create the Flow. Navigate to Flow and Create New App from the template.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/8.jpg?w=729)

<figcaption>

New Flow from the template

</figcaption>

</figure>

Select the template as PowerApps Button and the first step we need to add is the automation job. When you search for automation you will see the list of jobs available. Select Create Job and pick the one you created above. If you want to all the actions in one app, you can add one by one, If not you need to create separate flows for each one.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/9-1.jpg?w=637)

In this one, i have created one with the ScaleUpDB job which will execute the Scale up command of the database.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/10-1.jpg?w=625)

Once you are done with all the steps save the flow with necessary name.

### Step 4 : Create Power Apps and and link to your Flow button

Once we create PowerApp flow buttons login to MS PowerApps with a work/school account. Navigate to Power Apps which will give a way to create a blank canvas for Mobile or tablet. Next you can then begin to customise the PowerApp with text labels, colour and buttons as below

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/12-1.jpg?w=894)

<figcaption>

PowerApps Name

</figcaption>

</figure>

In this case we will have a button to increase/decrease the count of instances of the sql db, my app looked like below with few labels and buttons.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/13-1.jpg?w=334)

<figcaption>

AutoMateApp

</figcaption>

</figure>

Next is to link the flow to the button of the power App by navigating to the Actions -> Power Automate

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/15-1.jpg?w=831)

<figcaption>

Linking Button Action

</figcaption>

</figure>

Once both Scale Up/Scale down actions are linked, save the app and publish

### Step 5 : Verify Automation

Inorder to verify if things are working correctly, click on scale up and scale down few times and navigate to Azure Portal and open the Automation account we created.

Navigate to the overview tab to see the requests for each job made via the power app as below.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/17-1.jpg?w=1024)

<figcaption>

Jobs executed.

</figcaption>

</figure>

In order to look at the history navigate to the Jobs blade

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/18-1.jpg?w=1024)

<figcaption>

Jobs Execution

</figcaption>

</figure>

further you can build a customized app for different environments with different screens using Power App. With the help of [Azure Alert](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/alerts-overview), whenever you get an alert regarding the heavy usages of resources/spikes, with single click of button you will be able scale up and scale down the resources as you need.

### Improvements and things to consider:

This is just a starting point to explore more on this functionality, but there are improvements you could add to make this really useful.

(i) Sometimes the azure automation action fails to start the runbook. When you are implementing flow needs to handle this condition.

(ii) Sometimes a runbook action will be successful, but the runbook execution errored. Consider using **try/catch** blocks in the PowerShell and output the final result as a JSON object that can be parsed and further handled by the flow.

(iii) We should update your code to use the Az modules rather than AzureRM.

**Note :** The user who executes the PowerApp also needs permission to execute runbooks in the Automation Account.

With this App, It becomes handy for the operations team to manage the portal without logging in. Hope it helps someone out there! Cheers.
