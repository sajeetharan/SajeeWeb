---
title: Retrieve documents without  Metadata properties in Azure CosmosDB
Date: '2019-11-16'
categories:
  - cloud
  - database
  - developer
  - vscode
tags:
  - azure
  - azure-cosmosdb
  - cassandra
  - cosmosdb
  - mongodb
  - nosql
  - sql
coverImage: banner.jpg
utcDate: '2025-04-24T09:52:37.614Z'
---

One of the interesting queries that i got from my colleague is that how to get rid of the [metadata properties](https://docs.microsoft.com/en-us/azure/cosmos-db/databases-containers-items) when retrieving documents from Cosmosdb. It seemed like a very reasonable expectation to have the option with the document "GET" API call to be able to retrieve exactly what he created using the document "POST" API call, without these Cosmosdb [Metadata properties](https://docs.microsoft.com/en-us/azure/cosmos-db/databases-containers-items) mixed in:

> "\_rid":"ehszALxRRgACAAAAAAAAAA==", "\_ts":1408340640, "\_self":"dbs\\/ehszAA==\\/colls\\/ehszALxRRgAALxRRgACAAAAAAAAAA==\\/", "\_etag":"00002500-0000-0000-0000-53f192a00000", "\_attachments":"attachments\\/"

As of now there is no direct way to omit these properties when you are querying the documents. However, cosmosdb team is aware of this feature request, understand the reasons for it, and are considering it for a future [release](https://feedback.azure.com/forums/263030-azure-cosmos-db/suggestions/8120997-metadata).

For those who are wondering how to omit these system generated properties, you can simply handle this with a [User Defined Function](https://docs.microsoft.com/bs-latn-ba/azure/cosmos-db/sql-query-udfs).

```
function stripMeta(doc) {
    var metaProps = ["_rid", "_ts", "_self", "_etag", "_attachments"];    
    var newDoc = {};
    for(var prop in doc) {
        if (metaProps.indexOf(prop) == -1) {
            newDoc[prop] = doc[prop];
        }
    }
    
    return newDoc;
 }
```

And you can retrieve your documents with whatever queries as follows,

```
select value udf.stripMeta(c) from c
```

Hope this helps someone out there.
