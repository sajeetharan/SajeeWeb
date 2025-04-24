---
title: "Deploy Angular Applications to Azure with Github Actions - Emotion Detection App"
utcDate: "2019-11-24"
categories: 
  - "angularcli"
  - "appservice"
  - "cosmosdb"
  - "developer"
  - "microsoft"
  - "visualstudio"
  - "vscode"
tags: 
  - "angular"
  - "artificiallintelligence"
  - "azure"
  - "azure-cosmosdb"
  - "ci-cd"
  - "cognitiveservice"
  - "github"
coverImage: "azure2.jpg"
---

The first ever [Github Universe viewing party in SriLanka](https://www.facebook.com/pg/GitHubCommunityLK/photos/?tab=album&album_id=117412043051475&__xts__%5B0%5D=68.ARD0AqdfH6U5QAgDeeCdwuCnXplpBNaJcXpoel6Hrwjtvb4LyHd5mBQ5n6wS-qlWrXnEJGHlZSAFY32t8vnE4GZkSEqLAeKeYq_8b4td4GavjoEkJfiwoeipIemWyuUJRNLWYnenlFp7GP-4odhPya5plxFCHNTFNwbT9DDrkMl5zM_p1yx-xyI_p41kMhCyuWyTGngXc5FihXpgNtntmRW6XlvH10QU0KBEeY-t3JIwBanTuetuk1FNl63_-1xnEfCtZ-ZzZ9BW2OJt_WYCkK-A9fV2HpOICSAtuXQVBbvY6npHHMA-btBkYK9v-mrxPmnF9XICPoQ&__tn__=-UCH-R) took place on last Thursday organized by the Github Campus Experts in the country. It was an event to share all the exciting news and updates on Github and it was a great success. I decided to write this blog based on the session i presented on “Github Actions”. It’s amazing to see the new features announced by the Github over the span of last 12 months out of which Github actions was the latest one and it was made generally available on  few days ago (November 13, 2019) to build CI/CD pipelines from GitHub itself. I was excited about this announcement and tested it with two of my projects and I have to say I’m impressed.

As a example, in this post I will explain about how to build a “Emotion detection app” with angular and deploy it on one of the public cloud(Azure) with Github Actions. Below is the simple architecture diagram to get an understanding on how I am going to leverage Github action to deploy my Angular application to the Cloud. Here is the simple architecture of the application that i have demonstrated.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/action.png?w=793)

#### PreRequisities:

- Github Account
- Azure Account ( [Use your $200 Azure Credit](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fazure.microsoft.com%2Fen-ca%2Ffree%2Fsearch%2F%3Fcdn%3Ddisable&data=02%7C01%7CSajeetharan.Sinnathurai%40microsoft.com%7C724c745f6f294d93e1d908d6b1dae67a%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C636891952416842379&sdata=dAfe2fIuwhjdnY3s4nJBn8UQucbDeIqYDfdG1u4n1wA%3D&reserved=0))
- Visual Studio Code

#### Step 1 : Create the Resource group On Azure :

As the first step, we need to create the AppService on Azure to Deploy the Angular application.Navigate to [https://portal.azure.com/](https://portal.azure.com/) and you will be directed to the home page on the portal. Let’s create a resource group to group the resources we create.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/1.jpg?w=1024)

#### Step 2: Create the App service to deploy the Angular app.

As the second step, create an app service to deploy the Angular application

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/2.jpg?w=1024)

#### Step 3: Create the Cognitive Service

Create Cognitive service to integrate the emotion detection part. We will use detect api to detect the attributes in a picture.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/3.jpg?w=1024)

If you want to store the data , you can create a new cosmosdb to store the results which i have not included here.

#### Step 4: Code the Angular App

You need to create the component to upload a file and pass the file to the cognitive service to detect the attributes and use ngFor on the template to display the results.

Get the keys of the cognitive service and the url from the portal as follow

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/4.jpg?w=1024)

You can access the whole code from [here](https://github.com/sajeetharan/github_action_angular). Make sure to replace the Ocp-Apim-Subscription-Key and the url according to the endpoint you created above.

```
makeRequest() {
    let data, contentType;
    if (typeof this.image === 'string' && !this.image.startsWith('data')) {
      data = { url: this.image };
      contentType = 'application/json';
    } else {
      data = this.fileToUpload;
      contentType = 'application/octet-stream';
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        'Ocp-Apim-Subscription-Key': 'eb491c17bd874d2f9d410eedde346366'
      })
    };

    this.http
      .post(
        'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion',
        data,
        httpOptions
      )
      .subscribe(body => {
        if (body && body[0]) {
          console.log(body);
          this.output = body;
          this.thing = body[0].faceAttributes.emotion;
          this.result = this.getTop();
          this.noFace = false;
        } else {
          this.noFace = true;
        }
      });
  }
```

#### Step 5: Push the Code to Github

You can push the code to your own repository on GitHub and let’s create the build and deploy pipeline via the GitHub actions. Navigate to your repository and click on Actions

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/6.jpg?w=1024)

#### Step 6: Create Github Action with Workflow

Create a new workflow by clicking on the new workflow. You will get to see different templates by default to build the pipeline according to the application language as below

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/8.jpg?w=1024)

In this case, I will create my own workflow by clicking on the setup workflow for yourself. Name the workflow as angular.yaml. You can see a new file being generated under your repository as [github\_action\_angular](https://github.com/sajeetharan/github_action_angular)/[.github](https://github.com/sajeetharan/github_action_angular)/[workflows](https://github.com/sajeetharan/github_action_angular)/azure.yml

```
name: Deploy to Azure
on:
  push:
    branches:
      - master
env:
  AZURE_WEBAPP_NAME: github-actions-spa
  AZURE_WEBAPP_PACKAGE_PATH: './dist/angulargithubaction'
  NODE_VERSION: '10.x'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master
    - name: Use Node.js ${{ env.NODE_VERSION }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ env.NODE_VERSION }}
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build -- --prod
    - name: 'Deploy to Azure WebApp'
      uses: azure/webapps-deploy@v1
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}
```

The workflow is really simple. As you see it includes a name and few actions starting with when you need to do the build and deploy. Buildon: push indicates that whenever there is a new commit the code needs to be built again. Also you have to define NodeJS version and will run our build on ubuntu server. And you have a few regular steps that we usually do with building angular application if we are familiar with Angular apps development.

Also as an option you  run that configuration only for branches other than `master`. For `master` branch we have separate configuration (with deployment to Azure). So it is flexible to maintain different workflows to different branches/environments. Is not that cool?

#### Step 7: Configure the Pipeline,Secrets

As the next step you need to create in GitHub Secrets page new secrets. It’s important to save the secret name whenever you need to deploy to production/development using secrets is one of the best practice. You can get the the keys from the publish profile of the app service.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/9.jpg?w=1024)

Create new secret as above with the values got from profile.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/10.jpg?w=1024)

  We have to configure the values in angular.yaml as follows:

- app-name — application name in Azure
- publish-profie — name of the secret from GitHub
- package — path to directory which we would like to deploy (in above example: ./dist/yourSPAApp.

And that’s it. Really clear and simple! You can just check if the deployment has been successful or not by navigating to the Kudu.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/12.jpg?w=1024)

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/14.jpg?w=1024)

And you can see the application working successfully on Azure. As the next step you can include unit tests to run when you do the build. Using the Angular CLI and Github Actions, it has become very easy to create and test frontend Web apps. Check out the fulling working demo repo below as well as the current [build status](https://github.com/coryrylan/angular-github-actions/actions) for the demo!.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/op.jpg?w=664)

Start using Github Action and deploy your app within few seconds. You can use Github actions to deploy any application to any cloud as i've explained above.

You can access the Session Slides from [here](https://slides.com/sajeetharan/githubopensource-enterprise/live#/) and the repository from [here](https://github.com/sajeetharan/github_action_angular).
