---
title: "Deploy Angular9 App to Azure with Github Actions"
date: "2020-02-14"
categories: 
  - "agile"
  - "ci-cd"
  - "githubactions"
  - "typescript"
  - "vscode"
tags: 
  - "angular"
  - "angular9"
  - "angularcli"
  - "azure"
  - "github"
  - "githubaction"
  - "hexa"
coverImage: "appservice-1.jpg"
---

It's been almost a week since Angular 9 was released which included several new features such as new Ivy Renderer, SSR, Type checking etc. In this post, i will be going through on how to build and deploy an Angular9 application as a static website to Azure with GitHub Actions.

### **Prerequisites:**

- Github Account
- Azure Account
- VSCode

#### Step 1: Install latest Angular CLI

In order to create the Angular application , you need to install the latest angular cli, which could be done with the following command,

```
 npm install -g @angular/cli@latest
```

#### Step 2: Create new Angular9 App

Run the following command to create the Angular9 app with the default template. Let's name the application as **ga-azure**

```
ng new ga-azure
```

#### Step 3: Install the Hexa.run CLI

We will use the package by [Wassim Chegham](https://twitter.com/manekinekko) to deploy the application to Azure. Next step in your Angular project make sure to install the [Hexa.run CLI](https://hexa.run/) as a prod dependency as you can see from the [package.json](https://github.com/manekinekko/github-action-angular-hexa/blob/master/package.json#L29) of this project.

```
npm i -g @manekinekko/hexa
```

#### Step 4: Login to Azure account

Next step is to create the necessary resources to deploy the angular application. In this way, we will deploy our application to static website for Azure Storage which is the optimum option to host a single page application (SPA) on Azure.Hosting a SPA in pure Storage is by far the cheapest and most efficient way of running in Azure.

You can login to azure account with the command,

```
npm run hexa:login
```

which will list down the available subscriptions and you need to pick the subscription where you want to deploy the application.

#### Step 5: Initiate the Hexa Settings

Next step is to initiate the configuration needed for the deployment of the application. Run the Hexa CLI command as follows,

```
npm run hexa:init
```

which will ask for few inputs from the user such as the project name, storage account name and the destination folder. Eventually, you will see a new file generated as hexa.json which will look like the below,

```
{
  "subscription": {
    "name": "Azure Demo"
  },
  "project": {
    "location": "westeurope",
    "name": "ga-azure"
  },
  "storage": {
    "location": "westeurope",
    "name": "gaazure10940"
  },
  "hosting": {
    "folder": "./gist/ga-azure"
  }
}
```

Now you are good with all the necessary things needed to deploy the application with github action.

#### Step 6: Generate Service Principal

You need to use the service principal identity mechanism to do the authorization of the deployment. In order to generate the service principal using hexa, run the below command,

```
npm run hexa:ci
```

Hexa.run will automatically:

1. create an Azure resource group (or lets you choose an existing one)
2. create the Azure storage account
3. configure the storage account and make it `static-website` ready
4. upload the angular bundle.
5. prints the generated URL from the Azure service.

Also it will generate the necessary credentials as a JSON and make a note of them.

```
{
  appId: 'xx4362xx-aaxx-40xx-8bxx-xx6ea0c351xx',
  displayName: 'ga-azure',
  name: 'http://ga-azure',
  password: 'xxce72xx-1axx-44xx-81xx-35xxb15xxa1e',
  tenant: 'xxf988xx-86xx-41xx-91xx-2d7cd011dbxx'
}
```

**Step 7 : Commit and push to the Github Repository**

Once you are done with all the above steps , you can commit your changes and push to the remote repository on Github.

```
git remote add origin https://github.com/sajeetharan/ga-azure.git
git add -A && git commit -m "First commit"
git push origin master
```

**Step 8 : Create Github Actions Workflow**

Now it's the time to create the Actions workflow, you can create a new workflow by navigating to actions and click **New Worfklow**. There are few sample template workflows available , in this case we will use own workflow. So you need to click on **setup workflow yourself**.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/1-3.jpg?w=1024)

<figcaption>

Setting up own workflow GitHub Actions

</figcaption>

</figure>

Immediately you could see new workflow.yml file created where you need to add the steps and actions needed to deploy the app. Here is the workflow file look like after adding all the steps.

```
name: Deploy to Azure with Hexa.ru
on:
  push:
    branches:
    - master
    - release/*

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: npm install
      run: |
        npm install
    - name: npm build, and deploy
      env:
        AZURE_SERVICE_PRINCIPAL_ID: ${{ secrets.AZURE_SERVICE_PRINCIPAL_ID }}
        AZURE_SERVICE_PRINCIPAL_PASSWORD: ${{ secrets.AZURE_SERVICE_PRINCIPAL_PASSWORD }}
        AZURE_SERVICE_PRINCIPAL_TENANT: ${{ secrets.AZURE_SERVICE_PRINCIPAL_TENANT }}
      run: |
        npm run hexa:login
        npm run build -- --prod
        npm run hexa:deploy
```

As you could see, the steps are very much simple starting with installing the dependencies and deploying the angular application using the hexa:deploy command.

Also you need to configure the secrets in the github repository which were generated in the step 6. You can create a new secret by navigating to settings and then secrets. you need to define the below secrets which are associated with the service principal.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/2-2.jpg?w=1015)

<figcaption>

Github Secrets

</figcaption>

</figure>

The rest in the workflow can be easily understood as its about the environment and the trigger(whenever someone push the changes to master/release there should be a build)

**Step 9 : See Github Actions in Action**

Immediately when you save the workflow.yml you can see there will be a new build triggered and the steps are executed, which you can notice in the Actions tab as follows,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/3-1.jpg?w=1024)

<figcaption>

Deploy using hexa:run

</figcaption>

</figure>

You will be able to access the application in the url generated once the application is deployed which will look like [https://gaazure10940.z6.web.core.windows.net/](https://gaazure10940.z6.web.core.windows.net/)

That's all you need to do inorder to deploy the Angular application to Azure. If you need to include end to end testing and different tasks you could simply modify the flow and it. Github Actions definitely a future to believe in! Try this out and let me know if you have any queries! Cheers!
