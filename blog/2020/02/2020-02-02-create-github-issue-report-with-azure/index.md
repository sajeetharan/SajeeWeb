---
title: "Create Github Issue Reporter with Azure Function and CosmosDB"
utcDate: "2020-02-02"
categories: 
  - "appinsights"
  - "azurefunction"
  - "ci-cd"
  - "cloud"
  - "cosmosdbsdk"
  - "database"
  - "opensource"
  - "typescript"
  - "vscode"
tags: 
  - "azure"
  - "azurefunctions"
  - "cosmosdb"
  - "github"
  - "issues"
  - "report"
coverImage: "appservice-e1580665144693.jpg"
---

Many times you would have wanted to have one view/dashboard of all the Github issues created for your open source repositories. I have almost 150 repositories and it becomes really hard to find which are the priority ones to be fixed. In this post we will see how you can create a one dashboard/report to view all your github issues in a page using Azure Function(3.X with Typescript) and Azure CosmosDB.

## PreRequisities:

You will need to have an Azure Subscription and a Github Account. If you do not have an Azure subscription you can simply create one with free trial. Free trial provides you with 12 months of free services. We will use Azure Function and CosmosDB to build this solution.

### Step 1 : Create Resource Group

Inorder to manage deploy the function app and cosmosdb we first need to create [Resource Group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-to-subscription). You can create one named "gh-issue-report"

### Step 2: Create the Azure Cosmosdb Account

To store the related data of the GitHub issue we need to create a CosmosDB account. To Create CosmosDB account, navigate to the Azure portal and click the Create Resource. Search for Azure Cosmosdb on the market place and create the account as follows.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/9.jpg?w=1009)

<figcaption>

CosmosDB Creation

</figcaption>

</figure>

### Step 3:  Create the Function app

If you have noticed my [previous blog](https://sajeetharan.wordpress.com/2020/01/10/want-to-alert-your-employees-to-have-a-break-at-work-azure-function-can-help-you/), i have mentioned about how to create an Azure function. Here is an image of the Function App i created.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/1-1.jpg?w=1024)

<figcaption>

Creating Function App

</figcaption>

</figure>

**Create Typescript Function:**

As you see i have selected Runtime stack as Node.js which will be used to run the function written with Typescript.  Open Visual Studio Code(Make sure you have already installed the VSCode with the function core tools and extension). Select Ctrl + Shif + P to create a new Function Project and select the language as Typescript.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/10.jpg?w=1024)

<figcaption>

Create Typescript Function

</figcaption>

</figure>

 Select the template as Timer trigger as we need to run every 5 minutes and you need to configure the cron expression (0 \*/5 \* \* \* \*) as well. (You can have custom time)

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/new-2.jpg?w=865)

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/new-4.jpg?w=866)

Give the function name as [gitIssueReport](https://github.com/sajeetharan/gh-reporter/tree/master/gitIssueReport), You will see the function getting created with the necessary files.

### Step 4 : Add Dependencies to the Function App

Let's try to add the necessary dependencies to the project. We will use bluebird as a dependency to handle the requests. Also gh-issues-api library to interact with Github and get the necessary issues. You need to add the dependencies in the package.json folder under dependencies.

```
 "dependencies": {
    "@types/node": "^13.7.0",
    "bluebird": "^3.4.7",
    "gh-issues-api": "0.0.2"
  }
```

You can view the whole [package.json](https://github.com/sajeetharan/gh-reporter/blob/master/package.json) here.

### Step 5: Set Output Binding

Let's set the output binding to CosmosDB to write the issues to the collection. You can set it by modifying the function.json as

```
{
      "type": "cosmosDB",
      "name": "issueReport",
      "databaseName": "gh-issues",
      "collectionName": "open-issues",
      "createIfNotExists": true,
      "connectionStringSetting": "gh-issue_DOCUMENTDB",
      "direction": "out"
    }
```

Where type cosmosDB denotes the database output binding and you can see that the database name and collection as configured.

### Step 6 : Code to Retrieve the Github Repository Issues

The actual logic of the function is as follows,

```

import Promise = require('bluebird');

import {
  GHRepository,
  IssueType,
  IssueState,
  IssueActivity,
  IssueActivityFilter,
  IssueLabelFilter,
  FilterCollection
} from 'gh-issues-api';

export function index(context: any, myTimer: any) {
  var timeStamp = new Date().toISOString();

  if(myTimer.isPastDue) {
      context.log('Function trigger timer is past due!');
  }

  const repoName = process.env['repositoryName'];
  const repoOwner = process.env['repositoryOwner'];
  const labels = [
    'bug',
    'build issue',
    'investigation required',
    'help wanted',
    'enhancement',
    'question',
    'documentation',
  ];

  const repo = new GHRepository(repoOwner, repoName);
  var report = {
    name: repoName,
    at: new Date().toISOString()
  };

  context.log('Issues for ' + repoOwner + '/' + repoName, timeStamp);   
  repo.loadAllIssues().then(() => {
    var promises = labels.map(label => {
      var filterCollection = new FilterCollection();
      filterCollection.label = new IssueLabelFilter(label);
      return repo.list(IssueType.All, IssueState.Open, filterCollection).then(issues => report[label] = issues.length);
    });
    var last7days = new Date(Date.now() - 604800000)
    var staleIssuesFilter = new IssueActivityFilter(IssueActivity.Updated, last7days);
    staleIssuesFilter.negated = true;
    var staleFilters = new FilterCollection();
    staleFilters.activity = staleIssuesFilter;
    promises.push([
      repo.list(IssueType.Issue, IssueState.Open).then(issues => report['total'] = issues.length),
      repo.list(IssueType.PulLRequest, IssueState.Open).then(issues => report['pull_request'] = issues.length),
      repo.list(IssueType.All, IssueState.Open, staleFilters).then(issues => report['stale_7days'] = issues.length)
    ]);

    return Promise.all(promises);
  }).then(() => {
    var reportAsString = JSON.stringify(report);
    context.log(reportAsString);
    context.bindings.issueReport = reportAsString;
    context.done();
  });;
}
```

You can see that the document is set as a input to the CosmosDB with the binding named **issueReport**.

### Step 7: Deploy the Function

Deploy the Function App. You can deploy the function app to the Azure with the keys Ctrl+Shift+P and select Deploy to the Function App

<figure>

![](images/201af-appservice-e1580665144693.jpg)

<figcaption>

Deploy Function App

</figcaption>

</figure>

### Step 8 : Verify/Install the Dependencies

Once the deployment is succesfful, Navigate to Azure portal and open the function app to make sure that everything looks good. If you dont see the dependencies make sure to install the dependencies manually by navigating to the Kudu Console of the function App.

**Note** : Make sure to stop the Function app before you head over to Kudu.

ick on the **Platform Features** tab. Under **Development Tools**, click **Advanced tools (Kudu)**. Kudu will open on it’s own in a new window.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/12.jpg?w=1024)

<figcaption>

Navigate to KUDU console

</figcaption>

</figure>

In the top menu of the Kudu Console, click **Debug Console** and select **CMD**

![](images/201af-appservice-e1580665144693.jpg)

In the command prompt, we’ll want to navigate to **D:\\home\\site\\wwwroot**. You can do so by using the command **cd site\\wwwroot** and press **enter** on your keyboard. Once you’re in **wwwroot**, run the command **npm i bluebird** to install the package. Also do the same for **gh-issues-api**

### Step 8: Set Environment Variables (Repository)

As you could see in the above code, we are setting two environment variables to read the repository name and the repository owner which are needed to fetch the issues information. You can set those variable son the Azure portal as follows.

Navigate to the **Overview** tab for your function and click **Configuration**. As you can see below I've configured those values.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/13.jpg?w=1024)

<figcaption>

Function App Settings

</figcaption>

</figure>

### Step 9: Verify the Output Binding

Just to make sure that our settings in the function.json has been reflected or not navigate to the Functions and select the Function and make sure all the binding values are correct. If not create a new binding to cosmosdb account you created as mentioned in the step [Step 3](https://sajeetharan.wordpress.com/2020/01/10/want-to-alert-your-employees-to-have-a-break-at-work-azure-function-can-help-you/) (Instead of Twilio select Cosmosdb)

### Step 10 : Run and Test the Function

Now its time to see the function app running and issues being reported. Navigate to your function app and click Run. You can see the Function Running as shown below.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/14.jpg?w=1024)

<figcaption>

Run Function App

</figcaption>

</figure>

### Step 11: Check Live App Metrics

If you see any errors you can always navigate to Monitor section of the Function app and select Live App Metrics

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/15.jpg?w=1024)

<figcaption>

Live metrics of the function app

</figcaption>

</figure>

### Step 12: Verify the data in cosmosdb

If everything goes well, you can navigate to Cosmosdb Account and open the collection with the data Explorer.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/17.jpg?w=1024)

<figcaption>

Data Explorer Cosmosdb

</figcaption>

</figure>

You will see that there are many documents inserted in the collection.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/18.jpg?w=1024)

<figcaption>

Cosmosdb collection with Github repository Issues

</figcaption>

</figure>

Now you can modify this function to retrieve the issues from all of your repositories and use the data stored in the cosmosdb collection to build a dashboard to show the issues with priority. Also you can make use of [this post](https://sajeetharan.wordpress.com/2020/01/10/want-to-alert-your-employees-to-have-a-break-at-work-azure-function-can-help-you/) to send a notification to someone about the issue as well.

Hope [this simple function](https://github.com/sajeetharan/gh-reporter) will help someone to build a dashboard out of the data collected and make them more productive.Cheers!
