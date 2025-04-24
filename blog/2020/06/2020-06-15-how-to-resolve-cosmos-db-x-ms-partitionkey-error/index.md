---
title: "How to resolve : Cosmos DB x-ms-partitionkey Error"
date: "2020-06-15"
categories: 
  - "azure"
  - "cosmosdbsdk"
  - "microsoft"
  - "nodejs"
  - "python"
  - "vscode"
tags: 
  - "cosmosdb"
  - "javascript"
  - "partitionkey"
  - "sdk"
coverImage: "azure2.jpg"
---

One of the most repeated question that i came across on stackoverflow on the tag #Cosmosdb is that how to resolve the error **"The partition key supplied in x-ms-partitionkey header has fewer components than defined in the the collection"**

This error could occur when you are attempting to get a Document from Cosmosdb using the REST API or using SDK. If you are using using a partitioned Collection and therefore you need to add the **"x-ms-documentdb-partitionkey"** header. Even after adding the header if you get the error you can fix it by the following methods,

Partition key must be specified as an array (with a single element). For example:

in C#

```
  requestMessage.Headers.Add("x-ms-documentdb-partitionkey", " [ \"" + partitionKey + "\" ] ");
```

In Javascript

```
headers['x-ms-documentdb-partitionkey'] = JSON.stringify([pkey]);
```

Partition key for a partitioned collection is actually the path to a property in Cosmosdb. Thus you would need to specify it in the following format:`/{path to property name} e.g. /abc`

Hope this helps someone out there who is struggling to fix this issue!
