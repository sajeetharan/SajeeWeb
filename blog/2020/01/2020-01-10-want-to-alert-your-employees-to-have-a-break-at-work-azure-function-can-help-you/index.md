---
title: "Want to alert your boyfriend/girlfriend to have break at work? Azure function can help you!"
date: "2020-01-10"
categories: 
  - "appservice"
  - "azurefunction"
  - "developer"
  - "typescript"
  - "vscode"
tags: 
  - "azure"
  - "microsoft"
  - "outputbinding"
  - "reminderapp"
  - "twilio"
coverImage: "twillio.jpg"
---

A programmer can code for days continously without a break. I have done it when I started my career as a programmer. In IT field, it gets worse if you continously work without taking 5 minutes break every 30 minutes. In this blog I will explain how you can find yourself to remind someone to get up and take that mandatory break.

### PreRequisites:

**Sign up Twilio**

In order to yse [Twilio](https://www.twilio.com/), you need to sign up and purchase a voice enabled phone number. If you’re new user to Twilio, you can start with a [free trial](https://www.twilio.com/try-twilio).

**Sign up Azure:**

In order to deploy your Azure function, you need to have Azure subscription. You can create a FREE Azure subscription to setup your Azure function. The free trial will provide you with 12 months of free services.

### Steps to Create the Function:

### Step 1 : Create the Function app

Let's start off by creating an app for our requirement. In the [Azure portal](http://portal.azure.com/), click + **Create a Resource**

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/1.jpg?w=634)

When the **Azure Marketplace**  appears and in the list, click **Compute**. In the **Featured** list, click **Function App** (note: if **Function App** does not appear, then click **See all**).

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/2.jpg?w=570)

Then you need to fill the function app settings, you can follow the image to setup your funciton,

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/final.jpg?w=1024)

### Step 2 : Add Function

We just completed creating the function app and we need to add a function that provides the capability of alerting the user that is configured with a trigger. The trigger will start the function which sends the Twilio SMS message. We’ll be using a Timer trigger for this tutorial.

In the left menu, click **Resource groups** and select the resource group you created in the last step.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/b33.jpg?w=1024)

Click on the **App Service** which is highlighted. Once the page loads, click the **+** button next to **Functions** to create a new function.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/b34.jpg?w=250)

<figcaption>

Add a Function

</figcaption>

</figure>

On the next screen, you’ll need to choose a development environment. Since we’ll be creating the function in the Azure Portal, select **In-Portal** and **Continue**.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/b35.jpg?w=1024)

<figcaption>

Select In Portal

</figcaption>

</figure>

Since we want to create a Timer trigger, you’ll need to select **Timer** and click **Create**.

You should now see **TimerTrigger1** listed under **Functions** in the left menu.

### Step 3 : Integrate with Twilio SMS

As the next step we need to integrate Twilio SMS with the function App we created. Under **TimerTrigger1** click **Integrate**

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/b4.jpg?w=245)

<figcaption>

Integrate Function

</figcaption>

</figure>

under **Outputs**, click **\+ New Output** and select **Twilio SMS**.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/b5.jpg?w=1024)

When you click on that, you will get a warning saying Extensions not installed. You’ll need to install the **Mirosoft.Azure.WebJobs.Extensions.Twilio** extension. You can do so by clicking **Install**. This process can take up to 20 minutes so just give it a moment to complete installation.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/install-twillio.png?w=1024)

While the function extensions are getting installed, you need to update the values in the relevant fields, the values can be obtained from your Twilio dashboard as shown below,

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/twillio_dash-1.jpg?w=1024)

and fill them in the environment variables after you installed the extension, you need to set the environment variables which will be used within the function.

### Step 4: Set Environment variables

It's ok to hardcode the Twilio credentials in the output environment variables. However, if you are running this app in production you should always use environment variables so that you dont expose the credentials to others. As you obtained the values from the Twilio dashboard, copy and save those values,

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/b36.jpg?w=1024)

You can create environment variables in the Azure Portal by going to the **Overview** tab for your function and click **Configuration**.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/b7.jpg?w=1024)

Add the environment variables one by one,

<figure>

<table><tbody><tr><td>Key</td><td>Value</td></tr><tr><td>TWILIO_SID</td><td>ACXXXXXXXXXXX</td></tr><tr><td>TWILIO_TOKEN</td><td>Auth token obtained from the Twilio dashboard</td></tr><tr><td>SENDER_NUMBER</td><td>Your twilio number <strong>+94 77 330 </strong>XXXXX</td></tr><tr><td>RECIPIENT_NUMBER</td><td>Phone number that recieves the message</td></tr></tbody></table>

<figcaption>

Environment variables

</figcaption>



</figure>

You can create the first envrionment variable by clicking on the New Application Setting and repeat the same for rest of those variables as shown above,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/g_settings.png?w=561)

<figcaption>

New appsettings Configuration

</figcaption>

</figure>

Add the first setting TWILIO\_SID

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/5dc5ff806ade63e0deed7820_sid_env_var.png?w=528)

<figcaption>

TWILIO\_SID Environment Variable

</figcaption>

</figure>

Once you are done with each setting value click OK. When you are adding both SENDER\_NUMBER and RECIPIENT\_NUMBER be extra careful as it can be tricky and make sure to use the E.164 format referenced above. After all environment variables have been added click **Save** to save the updates that were made to the **Application Settings**.

### Step 5 : Timer settings

Whenever you create a timer function, By default, Azure sets your function to trigger the text message every **5 minutes**. You can change how frequent the timer triggers by going to the **Integrate** and updating the values in **Timer trigger**.

Goto your function and select on Integrate and then you need to update the value of the interval as you need. The **Schedule** field contains a sequence that using [CRON expressions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer#cron-expressions). For the purpose of testing the function, change the number **5** to the number **2** and click **Save**. You can later change the frequency after you confirm that the function works properly.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/timer.png?w=1024)

<figcaption>

CRON Expression

</figcaption>

</figure>

If you're creating the Function App using Visual Studio code, follow this [sample app to create a timer function](https://sajeetharan.wordpress.com/2019/12/22/simple-azure-function-that-can-get-you-200-followers-in-a-month/) which is more easier with Visual Studio Code.

### Step 6: Modify function.json File

As we are done with all the configuration steps, now we need to update the function.json within our TimerTrigger1 function.  Go back over to the function app and click **TimerTrigger1**. On the far-right side of the screen, click **View Files**.

You will see two files:

- function.json
- index.js

Click **function.json** to open the file. Since the file is currently missing the **“to”:** “**RECIPIENT\_NUMBER”**, we’ll need to add this to our file.

Now we need to add the logic to create the message and send the message using the Twilio to the relevant reciever.

Navigate to my [Github](https://github.com/sajeetharan/az-func-doc247/blob/master/TimerTrigger/function.json) repo and grab the code for this file. You’ll want to replace the existing code in the **function.json** file with the new code that you just copied from GitHub.

```
{
  "bindings": [
    {
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in",
      "schedule": "0 */2 * * * *"
    },
    {
      "type": "twilioSms",
      "name": "message",
      "accountSidSetting": "REPLACE_WITH_YOUR_ACCOUNT_SID",
      "authTokenSetting": "REPLACE_WITH_YOUR_AUTH_TOKEN",
      "from": "SENDER_NUMBER",
      "to": "RECIPIENT_NUMBER",
      "direction": "out"
    }
  ]
}
```

### Step 7 : Let's Add logic to the index.js file

When Azure creates a function, it adds default code to help setup your function. We will the code for the Twilio SMS message to this code.

In the **View Files** menu, click the **index.js** file. You’ll want to replace the existing code in the **index.js** file with the code below.

```
const twiAccountSid = process.env.TWILIO_SID;
const twiAuthToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(twiAccountSid, twiAuthToken);
module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();    
    if (myTimer.IsPastDue)
    {
        context.log('JavaScript is running late!');
    }
    client.messages
    .create({ from: process.env.SENDER_NUMBER,
           body: "Time to have cofee and take a break for 5 minutes!",
           to: process.env.RECIPIENT_NUMBER
       })
        .then(message => {             
           context.log("Message sent");
           context.res = {
               body: 'Text successfully sent'
           };
           context.log('JavaScript timer trigger done!', timeStamp);
           context.done();
        }).catch(err => {
          context.log.error("Twilio Error: " + err.message + " -- " + err.code);
          context.res = {
                   status: 500,
                   body: `Twilio Error Message: ${err.message}\nTwilio Error code: ${err.code}`
               };
          context.done();
        });
    }
```

### Step 8 : Install the dependencies (Twilio)

As you can see the first line of the code is required to use [twilio helper library](https://www.twilio.com/docs/libraries/node). We’ll need to install the twilio-node from [npm](https://www.npmjs.com/) so that it’s available to our function. To do so, we’ll need to first add a new file to our function.

##### Add package.json file

In the **View Files** window, click **Add**. Type the file name **package.json** and click enter. You will see an empty content page in the middle of the screen.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/package.jpg?w=1024)

<figcaption>

Add Package.json

</figcaption>

</figure>

Add the code below to the **package.json** file.

```
{
  "name": "doc247",
  "version": "1.0.0",
  "description": "Alert an employee with an SMS to take a break",
  "main": "index.js",
  "scripts": {
    "test": "echo \"No tests yet...\""
  },
  "author": "Sajeetharan",
  "dependencies": {},
  "devDependencies": {
    "twilio": "^3.0.0"
  }
}
```

Now we have added Twilio as a dependency to the package.json file , as the next step we need to install it as a dependency on the environment itself. As you are aware you can install the dependencies using the deploy command as well as you can install it using the Kudu.

**Note** : Make sure to stop the Function app before you head over to Kudu.

Click on the **Platform Features** tab. Under **Development Tools**, click **Advanced tools (Kudu)**. Kudu will open on it’s own in a new window.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/kudu.jpg?w=1024)

<figcaption>

Navigate to Kudu from the function app

</figcaption>

</figure>

In the top menu of the Kudu Console, click **Debug Console** and select **CMD**

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/debugconsole.jpg?w=893)

<figcaption>

Kudu Debug Console

</figcaption>

</figure>

In the command prompt, we’ll want to navigate to **D:\\home\\site\\wwwroot**. You can do so by using the command **cd site\\wwwroot** and press **enter** on your keyboard. Once you’re in **wwwroot**, run the command **npm i twilio** to install the package.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/twilio_complete.jpg?w=1024)

<figcaption>

Install Dependencies Twilio

</figcaption>

</figure>

You will also notice a new **node\_modules** folder added to the file structure. Back in the **Overview** tab for the function app, click **Start**.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/dependencies_extension.jpg?w=1024)

<figcaption>

node\_modules Folder

</figcaption>

</figure>

### Step 9 : Run and Test the Function

Back in the **Overview** tab for the function app, click **Start**. App and click **TimerTrigger1**. Make sure that you’re in the **index.js** file. Click **Test** next to **View Files** (far right-side of the screen). At the top of the index.js file, click **Run**

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/run_fun.jpg?w=1024)

If everything was successful, the personshould receive a text message after 20 minutes with your message!  
  
You can change the frequency for your timer by heading back to **Integrate** and changing the **Schedule** field. Be sure to read up on [CRON expressions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer#cron-expressions) before entering a new frequency.

If you’re curious to learn more about Azure Functions, I would suggest taking [this](https://docs.microsoft.com/en-us/learn/paths/create-serverless-applications/) Microsoft Learn module. You can access complete source code from [here](https://github.com/sajeetharan/az-func-doc247). If you want to learn more on Azure visit [http://azure360.info/](http://azure360.info/) .Happy Coding!
