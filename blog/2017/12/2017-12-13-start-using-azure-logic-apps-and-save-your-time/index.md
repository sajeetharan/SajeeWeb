---
title: Start using Azure Logic apps and save your time
Date: '2017-12-13'
categories:
  - developer
  - microservices
tags:
  - azure
  - c
  - connectors
  - custom
  - dotnet
  - logicapp
  - microsoft
  - portal
  - visualstudio
utcDate: '2025-04-24T09:52:37.465Z'
---

This is my first blog and Azure and i am inspired to write this one after attending the Microsoft's workshop "App innovation day".There was a cool technology **"Windows Workflow Foundation"** provided by Microsoft with dot net framework to create workflows to cater business logic in dot net applications. With Azure, The Logic Apps service fulfill the purpose to have business processes or workflows take shape of an app.

It required no coding just simple logic that needs to placed in a right way to have right business flow. It was also meant for the purpose of integrating 3rd party apps like Facebook,YouTube, Twitter and Evernote etc. All we need to have is the dynamic work flow.There are different benefits and different use cases in which we can apply azure logic apps. Let's discuss some of the benefits when using logic apps!

**Rapid development**

Logic Apps is great for rapid development.With ever growing list of connectors, we can easily create a workflow to monitor invoice, send for approval to a admin, upload to dropbox and send email notification in matter of few seconds.

**Solutions with Hybrid cloud**

5 years back ,Lot of businesses have invested heavily in on premises solutions and hardware, so it’s not possible to move everything to the cloud. With Logic Apps, it’s easy to have a hybrid cloud during this transition. With its on premises data gateway, you can easily connect your on premises database, file share, BizTalk server to Azure cloud.

It is the new way of Automating business process. You can build long running business process, that orchestrate data and services across all cloud services and not just Azure. It's not only for the developers but for everyone. The best bit you need to write code , you can use Visual editor to build your orchestration.

**Lets Dive into Simple Demo** **Use Case:** Filter twitter feeds with specific hashtags and post the specific tweets on the Facebook wall. In this example , i just created a process that repeats every few minutes to pull some data from twitter feed and post it on your Facebook wall. Even though this feature is already supported with Facebook, here its slightly different since it is filtering only the specific keywords which is a custom filtering.

The entire flow i described about is composted of 3 simple steps , that you can build using a Visual UI.

**Step 1: Select Logic App click "Create" and give a specific name ,resource** 

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/9c30e-step1.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/9c30e-step1.jpg)

 

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/5fd2f-step2.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/5fd2f-step2.jpg)

 **Step 2: There are number of workflow templates will be shown as below and select the appropriate one , in this case i will use "when a new tweet is posted"**

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/5ee39-step3.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/5ee39-step3.jpg)

also authorize with your twitter account from which you want to fetch the feeds

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/21387-step4.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/21387-step4.jpg)

Also configure the conditions by mentioning the filters and the timeline you want to trigger the action.

 

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/26a21-step6.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/26a21-step6.jpg)

**Step 3: Next step is to post on facebook wall , click "Add step"**  

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/8b58f-step7.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/8b58f-step7.jpg)

Search for Facebook and authenticate will your Facebook account as follows,

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/bfdbc-step8.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/bfdbc-step8.jpg)

Click post to my timeline

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/57aa9-step9.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/57aa9-step9.jpg)

Also you can map the fields that you want to fetch from the feed and post it on the wall as below,

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/e57e8-step10.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/e57e8-step10.jpg)

 

That's it folks, once all fields are mapped you need to save the Logic app with the save button.

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/c98c7-step12.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/c98c7-step12.jpg)

With the above 3 steps posting a filtered tweet on Facebook wall is configured and can be scheduled as you need. If the above particular feature needs to be developed without azure means it will need a huge development time and cost, which can be avoided using the Logic app as shown above.

That's the demo. You can explore several steps and several templates provided in the portal without writing a single line of code. I will be writing a separate blog on how to configure custom logic app in the upcoming blog posts. Happy connecting with app logic!
