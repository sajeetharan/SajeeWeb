---
title: Simple Azure Function that can get you 200+ Twitter followers in a month!
Date: '2019-12-22'
categories:
  - appservice
  - azurefunction
  - developer
  - tips
  - vscode
tags:
  - applicationinsights
  - azure
  - azurefunctions
  - function
  - monitor
  - python
coverImage: bannerq.jpg
utcDate: '2025-04-24T09:52:37.643Z'
---

I have been using twitter for the past 10 years and it took nearly 5 years to get those 100 followers. I was not an active user till before 2 years. One great tip i learnt in recent times is that first thing you need to do is to get a really complete and professional profile. Most users look at profiles before following. Another best way is to increase followers on Twitter is being consistent with posting quality content. Automating your posts will help a lot with this. In this blog, i will explain how you could build a simple function and deploy it on Azure to increase your followers count and to be consistent with quality content.

**PreRequisites:**

- An [Azure subscription](https://docs.microsoft.com/en-us/azure/python/tutorial-vs-code-serverless-python-01#azure-subscription).
- The [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/python/tutorial-vs-code-serverless-python-01#azure-functions-core-tools).
- [Visual Studio Code with the Azure Functions extension](https://docs.microsoft.com/en-us/azure/python/tutorial-vs-code-serverless-python-01#visual-studio-code-python-and-the-azure-functions-extension).

**Step 1 :** Navigate to [https://portal.azure.com/](https://portal.azure.com/) and search for Function App in the search bar.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/step-1.jpg?w=1024)

**Step 2 :** Create a Function app with the following settings, make sure you are setting the Consumption Plan and enable Application Insights.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/step-2.jpg?w=754)

**Step 3 :** Open Visual Studio Code(Make sure you have already installed the VSCode with the function core tools and extension). Select Ctrl + Shif + P to create a new Function Project and select the language as Python

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/step-6-1.png?w=1024)

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/new-1-2.jpg?w=874)

**Step 4 :** Select the template as Timer trigger as we need to run every 15 minutes and you need to configure the cron expression (0 \*/15 \* \* \* \*) as well.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/new-2.jpg?w=865)

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/new-4.jpg?w=866)

Give the function name as twitter\_followers,

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/new-3-1.jpg?w=863)

**Step 5 :** You will see the project template getting created. Next step is to edit the \_\_init\_\_.py, thats where you are going to add the logic. We will be using Tweepy library to get the data from twitter and to follow the person who is tweeting the tweet. The methods we will use in the function as retweet and create\_friendship. Here is the whole logic of the function. As you can see any tweet that has the hashtag #azure will get retweeted and you will automatically follow the user who has tweeted the tweet.

```
import tweepy, time, datetime, logging, os
from datetime import date
import azure.functions as func
def main(mytimer: func.TimerRequest) -> None:
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()
    if mytimer.past_due:
        logging.info('The timer is past due!')
    logging.info('Python timer trigger function ran at %s', utc_timestamp)
    auth = tweepy.OAuthHandler(os.environ["TWITTER_CONSUMER_KEY"], os.environ["TWITTER_CONSUMER_SECRET"])
    auth.set_access_token(os.environ["TWITTER_ACCESS_TOKEN"], os.environ["TWITTER_ACCESS_TOKEN_SECRET"])
    api = tweepy.API(auth)
    today = str(date.today())
    while True:
        for tweet in tweepy.Cursor(api.search,q="#azure", lang="en", since=today).items(1):
            try:
                api.retweet(tweet.id)
            except:
                pass
            try:
                api.create_friendship(tweet.user.id)
            except:
                pass
```

**Step 6:** As you can see there are few environment variables which we are using in the code, we need to add those variables with the values in the local.settings.json file.

```
{  "IsEncrypted": false, 
   "Values": { 
   "TWITTER_CONSUMER_KEY": "",
   "TWITTER_CONSUMER_SECRET": "",
   "TWITTER_ACCESS_TOKEN": "",
   "TWITTER_ACCESS_TOKEN_SECRET": "",
   "FUNCTIONS_WORKER_RUNTIME": "python",
   "AzureWebJobsStorage": "UseDevelopmentStorage=true"
 }
}
```

You need to get those keys from the twitter application you already created. if you dont have one, create from [here](https://developer.twitter.com/).

Also you need to add the dependencies which are used in the above code inside the requirements.text file. dependencies.txt would have the following,

```
azure-functions
tweepy
```

**Step 7 :** Now we are done with everything, to publish the app to Azure, just press Ctrl+Shift+P and select Deploy to Funciton App

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/step-22.png?w=854)

**Step 8 :** You can navigate to the function app on the Azure portal and make sure Application Insights is configured and as well as AppSettings are correct.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/step-23.jpg?w=1024)

<figcaption>

Make sure all the Environment variables are configured with the values.

</figcaption>

</figure>

Now you can start your function and navigate to Monitor section of the function app. You will see the real live telemetries from the app as follows,

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/12/step-19-1.jpg?w=1024)

All good, you can see the function running and you will see the tweets are automatically retweeted with the particular hasthage in your timeline and also you will see the number of followers increased. Happy Tweeting Folks!

You can get the sourcecode from [here](https://github.com/sajeetharan/azfunc-twitter-followers).
