---
title: "Partial Document Update Samples with Cosmos DB REST Operation"
date: "2022-02-22"
tags:
  - "azure"
  - "azure-cosmosdb"
  - "cosmosdb"
  - "partialupdate"
  - "patch"
  - "postman"
  - "rest"
coverImage: "3.jpg"
---

**Overview :**

In last November 2021, Cosmos DB team has announced support for [patching documents](https://docs.microsoft.com/en-us/azure/cosmos-db/partial-document-update) with SQL API which was the top requested features in the user voice. This is a useful and long-awaited feature among users. Prior to this announcement the only way to change the stored document was to completely **replace** it. Users will be able to perform Partial updates with all the Cosmos DB SDKs ( JAVA, . Net , JS ) and also [Cosmos DB REST API](https://docs.microsoft.com/en-us/rest/api/cosmos-db/patch-a-document).

**Use Case:**

Let's look at a scenario of a dashboard application where user need to display the System and it's features. User has decided to use Cosmos DB as a database to store the data of a **System and it's features**. A sample document would look as follows.

```
{
    "ApplicationId": "App-01",
    "ApplicationName": "New Cosmos Client",
    "Description": "This shows the users and interactions",
    "IsDraft": 0,
    "IsSaved": 1,
    "Features": [
        {
            "SystemID": 1,
            "Features": [
                {
                    "FeatureID": 4,
                    "FeatureName": "Patch",
                    "IsActive": false
                },
                {
                    "FeatureID": 35,
                    "FeatureName": "Feature-a-2",
                    "IsActive": false
                },
                {
                    "FeatureID": 36,
                    "FeatureName": "test-feature-a-3",
                    "IsActive": true
                }
            ]
        }
    ],
    "id": "af3dfd7a-b7e9-4467-a2ca-9c6be7ad5b9f",
    "_rid": "S1xQAKKOTBABAAAAAAAAAA==",
    "_self": "dbs/S1xQAA==/colls/S1xQAKKOTBA=/docs/S1xQAKKOTBABAAAAAAAAAA==/",
    "_etag": "\"31003582-0000-0700-0000-6213cb6b0000\"",
    "_attachments": "attachments/",
    "_ts": 1645464427
}
```

Let's look at some of the scenarios where user needs to perform patch operations.

**Patch Scenario 1:**  Add a new record (JSON object) under **Features** parent array

**JSON object to Add:**

```
{
       "SystemID": 2,
       "Features": [
       {
          "FeatureID": 1,
          "FeatureName": "Reports",
          "IsActive": false
       }
     ]
 }
```

You can refer my previous blog on How to setup Rest Operations with [Postman](https://sajeetharan.com/2019/07/01/easily-explore-cosmos-db-rest-apis-with-postman/). Once you've configured the setup with the underlying database and container. Here we need to insert a new Object within the Features array, certainly we can leverage the **Single Add** Operation. And the sample request Body will be like,

**Patch Url :** [https://account/dbs/dbName/colls/Patch/docs/id of the document](https://account/dbs/dbName/colls/Patch/docs/id of the document) and the header "**x-ms-documentdb-partitionkey**" is set to the partition key value which is the "**ApplicationId**" **"App-01"**. And we need to specify the path as **"/Features/-"**

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2022/02/image-1.png?w=1024)

<figcaption>

Add new JSON object under Features Array

</figcaption>

</figure>

On a successful response, in the backend you will see that a new Object that is shown above will be added to the Features array.

**Patch Scenario 2:**  Update the Application Description in the root Object to **"Testing Patch with REST API"**

![](https://sajeetharan.wordpress.com/wp-content/uploads/2022/02/image-3.png?w=1024)

**Patch Scenario 3:**  Update only a specific **Feature object** in array for a given **Features** parent object like **FeatureName** . Let's assume if we need to update the Object at the 0th index and then update the First **Features** Object,

![](https://sajeetharan.wordpress.com/wp-content/uploads/2022/02/image-4.png?w=1024)

**Patch Scenario 4 :** Perform all the above operations as a single request

Since Partial document update supports up to 10 operations in a single request, all the above operations can be merged. User needs to combine all the operations as one as below,

```
{
   "operations":[
     {
         "op":"replace",
         "path":"/Features/0/Features/0/FeatureName",
         "value":"Patch Testing"
    },
    {
         "op":"set",
         "path":"/Description",
         "value":"Testing Patch with REST API"
    },
    {
    "op":"add",
    "path":"/Features/-",
    "value":{
       "SystemID": 2,
       "Features": [
           {
               "FeatureID": 1,
               "FeatureName": "Reports",
               "IsActive": false
           }
       ]
    }
   }
 ]
}
```

Hope these samples help you to perform different operations at different path using Cosmos Rest API. Cheers!
