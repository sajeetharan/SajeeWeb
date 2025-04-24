---
title: >-
  Build a BOT in quick time to support COVID Scenario and place it with Teams
  and Your Website!
Date: '2020-03-26'
categories:
  - aibuilder
  - appinsights
  - architecture
  - azure
  - azurefunction
  - bot
  - botservice
  - cloud
  - cognitiveservice
tags:
  - angular
  - covid
  - microsoft
  - teams
coverImage: banner.png
utcDate: '2025-04-24T09:52:37.773Z'
---

### Overview

This is my 2nd post about a Chatbot solution to address the world wide problem "CoronaVirus" panademic. As it is now spreading across the world and its really vital to provide all citizens of the countries with up-to-date information. As we know it has come to a level that certain countries are in lockdown mode , more and more people are started to practice social distancing and work from home. As we have seen in the previous blog about the [sentiment analysis of employees working form home](https://sajeetharan.wordpress.com/2020/03/20/how-i-built-an-application-in-10-minutes-to-see-how-world-reacts-to-work-from-home-using-serverless-with-azure/), in this blog i will explain about how to build a chat bot to provides answers to most of the queries related to health information and latest learning. Chatbot is a platform which can be integrated with Web inteface or any collaboration tools such as MS Teams, Slack or Telegram and it can be operated 24\*7 without any downtime.

### Prerequisites:

You will need to have an Azure Subscription. If you do not have an Azure subscription you can simply create one with free trial.

## How to Build:

If you are new to building Chatbot, it is extremely easy and you can enable access to knowledge base via bot in few minutes.

### S**tep 1:** Create the Resource Group

As the first step, we need to create the resource group that contains all the resources needed. Navigate to Azure Portal and create the resource group named **“rg-chatbot”**

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/1-1.png?w=762)

<figcaption>

Create Resource Group

</figcaption>

</figure>

### Step 2: Create a knowledge base

As the next step, navigate to [QnA maker](https://www.qnamaker.ai/),sign-in with your Microsoft account and then click "Create a knowledge base" option

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/2-1.jpg?w=1024)

<figcaption>

QnA maker

</figcaption>

</figure>

click **"Create a QnA service"** button in "Step 1" as shown below;

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/3.png?w=1024)

<figcaption>

Create QnA service

</figcaption>

</figure>

You will be re-directed to Azure portal. Fill in the template form, and make sure to set pricing tier for "QnA Maker service" to **F0**, and for the supporting Azure Search service to **F**, if you want to host your Bot components for **free**. Then click "Create" button;

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/4.png?w=843)

<figcaption>

Create QnA service

</figcaption>

</figure>

As you could see in the portal Deployment of the relevant resources in your target resource group. If successful, you should get notification as resources deployed. As you will see the following resources under the particular resource group

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/5.png?w=1024)

<figcaption>

Resources in QnA

</figcaption>

</figure>

Click on the App Service Plan you created

**Note** : By Default when you create, App Service Plan for the website is set to S1 pricing tier. You need to change it to the F1 tier if you don't want to have much cost incur on your subscription. You can do this by navigating to Scale Up(App Service Plan) and then select Dev/Test tab and select F1 and Apply.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/6.png?w=1024)

<figcaption>

Change the AppService plan

</figcaption>

</figure>

### Step 3 : Connect your QnA service to your KB.

Navigate to the QnA maker again and click **'Refresh"** button in **"Step 2"**

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/7.png?w=1024)

<figcaption>

Click on Refresh and select the bot we created

</figcaption>

</figure>

Give a meaningful name to **your Knowledge Base (KB**)

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/8-1.png?w=1024)

<figcaption>

Name your KB

</figcaption>

</figure>

### Step 4 : Populate Knowledge base from different sources

You can specify different sources to feed your knowledge base. It can be populated uploaded from files (e.g., in PDF, MS Word, MS Excel, etc. formats) or typed manually or from Web sites (containing FAQ). For this example, we will be using the recommended standard Knowledge base with Covid-19 FAQs from the  [Centers for Disease Control and Prevention](https://www.cdc.gov/coronavirus/2019-ncov/faq.html) and [World Health Organisation](https://www.who.int/news-room/q-a-detail/q-a-coronaviruses) Web sites.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/9.png?w=1024)

<figcaption>

Knowledge Base Sources

</figcaption>

</figure>

Also in the next step chit-chat" section you may choose "personality" for your bot, so that it can answer some additional small talk questions. This option will enrich the knowledge base with additional question/answer details, so you bot may respond to various greetings.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/9-1.png?w=1024)

<figcaption>

Populate KB

</figcaption>

</figure>

Now you can create your KB with a simple button click to setup your knowledge base and populate it with the data from the different configured sources.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/10.png?w=734)

<figcaption>

Select the way it should answer small-talk questions

</figcaption>

</figure>

Once it successfuly created, you will see a window as follows,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/11-1.png?w=1011)

<figcaption>

Create the knowledge base

</figcaption>

</figure>

### Step 5: Test bot's knowledge base

It's time to test bot'ts knowledge base , by clicking -> **Test button**, then type a question and enter,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/13.png?w=770)

<figcaption>

Test Knowledge base

</figcaption>

</figure>

If you are happy with bot's responses, just go ahead and click "Save and train", then switch to "Publish " tab and publish the Knowledge base

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/15-1.png?w=1024)

<figcaption>

Publish the Knowledge base

</figcaption>

</figure>

### Step 6: Create Bot

Once it got successfully published, you can click on Create Bot as follows,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/16.png?w=1024)

<figcaption>

Create Bot

</figcaption>

</figure>

You will be re-directed to Azure portal where you can set the pricing tier of your Azure Bot Service to **F0** (free one) , and you can pick SDK language as the one you are familiar with (either C# or Node) and the click "Create" button;

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/18.png?w=333)

<figcaption>

Create Web Bot

</figcaption>

</figure>

You can obtain the **QnA authKey** by clicking on it and from the deployment details,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/17-1.png?w=639)

<figcaption>

Obtaining AuthKey

</figcaption>

</figure>

Once we filled everything, just hit Create button. Once it get deployed you will be able to see it from the notification.

Once Web App Bot is deployed , you may verify its functionality by selecting **"Test in Web Chat"** in the left navigation bar and then typing your messages in the Test window.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/20.png?w=857)

<figcaption>

Test in Web Chat

</figcaption>

</figure>

If you get replies similar to what is shown on the screenshot above, **congratulations** - you have successfully completed setup and training of your bot !

Next step would be to make it accessible in your platform of choice.

### Step 7 : Embed your bot into any web site of yours

Azure Web App Bot can communicate with external world via so called **"channels"**. The channels are built for the relevant collaborating platforms, e.g. Skype,MS teams or Telegram. To find out more about supported channels, please consult Microsoft documentation [here](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-manage-channels?view=azure-bot-service-3.0). By default, Web App Bot has "**Web Chat**" channel activated. It means that you can easily start using it on your Web site.

Navigate to Channels on the blade of created bot, then click "Get bot embedded codes" and finally click "**Click here to open Web Chat configuration page**" link.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/21-1.png?w=1024)

<figcaption>

Web Chat

</figcaption>

</figure>

Now click the **"Show"** link to reveal one of the secret keys. Use it to replace the `<YOUR_SECRET_CODE>` placeholder in the provided embedded code sample.

You can now paste this embedded code into the source code of your target website.

Now you can embed this into a Web sites can be built using various Web development frameworks: be it Angular,React,Vue,Angular or anything else.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/23-1.png?w=562)

<figcaption>

Copy the code and embed in your site

</figcaption>

</figure>

Simply clone the repository, then replace the `<PUT_YOUR_SECRET_CODE>` placeholder on **line 1059** with the secret code from your Web Chat configuration page (as described above).  
You will then have a fully functional web page with an embedded QnA chatbot.

In this case, i already have built an Covid Tracker application with Angular and this how it looks when i embed the code what we got from the portal.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/37.png?w=1024)

<figcaption>

Covid tracker with BOT in place

</figcaption>

</figure>

### Step 8: Enable Chatbot in Microsoft Teams

Say if you want to serve internal audience such as employees and if you are widely using Microsoft Teams in this crisis situation, you would nee to activate relvant channel in the bot's configuration.

Open **Web App bot** resource in the Azure portal again and select "**Channels**" option from the blade and click Microsoft Teams icon and press Save button

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/24.png?w=986)

<figcaption>

Select the channel you want to integrate with

</figcaption>

</figure>

Once it got successfully published, you can navigate to Channels blade again and see the **Microsoft Teams** channel in running state.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/26.png?w=1024)

<figcaption>

MS teams on running state

</figcaption>

</figure>

Now, switch to Microsoft Teams client, select "App Studio" from the left navigation bar if you dont have App studio, just install it from [here](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/app-studio-overview)

Click "**Manifest Editor**" tab and then click "**Create a new app**" button. 

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/27.png?w=612)

<figcaption>

Create a new App on teams

</figcaption>

</figure>

Fill all the details which are necessary and mandatory,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/28.png?w=1024)

<figcaption>

Add the details and make sure you get through all validation

</figcaption>

</figure>

Next in **Capabilities -> Bots**" choose your Azure bot from "**Existing bot**" tab's drop-down list and then define its scope in MS Teams, e.g. "**Personal**" and "**Team**" for your users to chat with the bot directly and within specific teams.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/29.png?w=608)

<figcaption>

Setup the bot

</figcaption>

</figure>

**Finish -> Test and distribute**", use "Install" button (if you have MS Teams administrator access) or "Download" button (to send .ZIP package with the manifest details to your MS Teams administrator) to make your bot available in your MS Teams environment.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/32.png?w=637)

<figcaption>

We're adone

</figcaption>

</figure>

If successful, then you should be able to chat now with your bot directly from within MS Teams.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/03/31.png?w=1024)

<figcaption>

BOT in Lit Mode

</figcaption>

</figure>

The above can be integrated into any social media platform listed in the channels and its quite easy

You can also consider using [HealthCare Bot](https://www.microsoft.com/en-us/research/project/health-bot/) if you are focused to have the chatbot to handle related scenario only and he is a [detailed article](https://techcommunity.microsoft.com/t5/healthcare-and-life-sciences/updated-quick-start-setting-up-your-covid-19-health-bot/ba-p/1230537) on how to build the same.

### Things to add/Improve:

**Modify your bot with lot more cool features** with images and more content via the code (either c#/Node)

K**eep the knowledge base upto date** : As shown aove it is important to keep your bot's knowledge base up to date. You can just navigate to the QnA maker website and click on Save and Train button and publish as we shown above.

I am sure this would be useful to those who have built COVID trackers , you can just create and embed this chat bot within your web application, and for others to support employees who are working from home you can extend this bot on the respective collaboration tool. Let's fight against COVID with these cool technology and make this world a better place. **Cheers**!
