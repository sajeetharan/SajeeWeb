---
title: "Streaming Live Tweets from Twitter to CosmosDB"
utcDate: "2018-05-27"
categories: 
  - "nodejs"
  - "opensource"
tags: 
  - "analytics"
  - "azure"
  - "cosmosdb"
  - "realtime"
  - "stream"
  - "tweets"
  - "twitter"
coverImage: "stream.jpg"
---

This is time for another blog on cosmosdb explaining how to stream tweets from twitter using hashtags and store them in cosmosdb in real time. You should be able to setup and run this demo within 15 minutes.

#### PRE REQUISITIES:

I have the following in my local environment , hope you guys have already have😊, if not start setting up.

- Windows 10 OS
- Python 2.7
- Visual Studio Code or PyCharm (Any editor)
- Azure subscription

let’s get started.

#### Step 1: Install Python

Hope you have already installed Python in your system , if not download and install from [here](https://www.python.org/downloads/release/python-365/). Once you install run the following command and see if its properly installed.

#### **Step 2: Install Tweepy and PyDocumentDB**

Install the following libraries needed.

**Tweepy:**

[Tweepy](http://docs.tweepy.org/en/v3.5.0/api.html) is a python package which is easy to use for accessing the twitter api. The API class provides access to the entire twitter RESTful API methods. Each method can accept various parameters and return responses. Install it with the following command,

```
Pip install tweepy  
```

If you get an error 'pip' is not recognized as an internal or external command. You should set the path as follows,

C:\\>**set** PATH=C:\\Python27\\Scripts

Now you should be able to install it without any issue,

#### **Pydocumentdb:**

As mentioned above we will be storing the tweets in Azure’s cosmosdb , In order to do that we need the python package for cosmosdb which is pydocumentdb. Install it with the following command.

```
Pip install pydocumentdb
```

Now we have everything needed. Lets dive into coding.

#### Step 3 : **Creating Listener to invoke the cosmosdb client**

Create a listener named CosmosDBListener with the following methods

**\_\_init\_\_** Initializes the client to make sure the connection is available.

**On\_data** will load the data retrieved from the stream and write to the Cosmosdb.

**On\_error** will throw if there is any network/key issues on console.

```
 
from config import *
import json
from tweepy.streaming import StreamListener

class CosmosDBListener(StreamListener):
 
    def __init__(self, client, collLink):
        self.client = client
        self.collLink = collLink
        
    def on_data(self, data):
        try:
            dictData = json.loads(data)
            dictData["id"] = str(dictData["id"])
            self.client.CreateDocument(self.collLink, dictData)
            return True
        except BaseException as e:
            print("Error on data: %s" % str(e))
        return True
 
    def on_error(self, status):
        print(status)
        return True
```

#### Step 4: Stream data from Twitter to CosmosDB

Lets create the real code to connect to twitter and get the related tweets for several hashtags. We will need to authenticate with tweepy to get the twets, so pass the consumer secret and access secret to the api as follows.

```
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_secret)
    api = tweepy.API(auth)
```

Set the connection policy for cosmosdb and create a client as follows,

```
    connectionPolicy = documents.ConnectionPolicy()
    connectionPolicy.EnableEndpointDiscovery 
    connectionPolicy.PreferredLocations = preferredLocations
```

Next step is to read the tweets as follows , we are using .filter method to get tweets related to particular hashtags.

```
client = document_client.DocumentClient(host, {'masterKey': masterKey}, connectionPolicy)
dbLink = 'dbs/' + databaseId
collLink = dbLink + '/colls/' + collectionId

twitter_stream = Stream(auth, CosmosDBListener(client, collLink))
twitter_stream.filter(track=['#CosmosDB', '#Microsoft', '#MVP', '#BigData', '#DataScience', '#Mongo', '#Graph'], async=True)
```

#### Step 5: Creating Configuration File

Create the config file with the following values,

```
# Enter CosmosDB config details below.
masterKey = ' ' 
host = ' '

#Enter your database, collection and preferredLocations here.
databaseId = 'tweepyDemo'
collectionId = 'tweets'
preferredLocations = ''

# Enter twitter OAuth keys here.
consumer_key = ''
consumer_secret = ''
access_token = ''
access_secret = ''
```

You need to have CosmosDB account on azure to get the master key and host values, if you are stuck , read my previous blog on **[How to setup cosmosdb account](http://sajeetharan.blogspot.com/2018/03/setting-up-azure-cosmos-db-with-visual.html)**

You also need to register the script as a new application at [twitter developer portal](http://apps.twitter.com/). After choosing a name and application for your app, you will be provided with a  **consumer key** , **Consumer secret**, **access token** and **access token secret** - which need to be filled into  the above config.py to provide the app programmatic access to Twitter.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/image.png?w=624)

#### **Step 6: Run the script**

That’s it folks now if you goto command prompt and run the following command,

`py cosmosdbdriver.py`

You should see the tweets coming into your cosmosdb collection as follows.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/image-1.png?w=624)

Tweets you need are now in your CosmosDB and use them for further analysis as you need. Hope it helps someone out there. If you are stuck at any point, look at the complete code from [here](https://github.com/sajeetharan/CosmosdbTweetsStream).
