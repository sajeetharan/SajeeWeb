---
title: "Cosmos DB Pagination &amp; Continuation Tokens with JavaScript"
utcDate: "2022-02-08"
tags:
  - "azure"
  - "cosmosdb"
  - "developers"
  - "microsoft"
coverImage: "cosmos.jpg"
---

#### **Overview:**

As a Developer, If you have a requirement to have list of work items which are approved to be displayed in a Grid View. You would tend to query for all approved work items and display them in the grid, one point to note is that since the amount of approved work items might grow over time, hence loading the data would get slower and slower due to having to download more items. In general, this is where pagination comes into play in front end development, which means you don't need to necessarily download all records, just download a page of records at a time. If you are using Cosmos DB as a backend, this [feature](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/sql-query-pagination) is supported out of the box via the use of [Continuation Token.](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/sql-query-pagination#continuation-tokens) Cosmos DB SDKs utilize a continuation strategy when managing the results returned from the queries.

#### **Pagination with @Azure/cosmos SDK:**

One of the frequent questions I have come across on forums is on How to Implement Pagination with [@azure/cosmos](https://www.npmjs.com/package/@azure/cosmos) SDK with JavaScript. With this post , I wanted to keep it simple and add a [very minimal quick start](https://github.com/sajeetharan/cosmos-db-js-pagination-sample) on how to implementation pagination with .js SDK. You can follow the steps given in the [repository](https://github.com/sajeetharan/cosmos-db-js-pagination-sample).

#### Prerequisites:

- Create a CosmosDB Account of type SQL API and database named 'javascript' and collection named 'products'
- Insert the data 'ProductsData.json' to CosmosDB using the [Data Migration Tool](https://docs.microsoft.com/en-us/azure/cosmos-db/import-data)

**execute.ts** is the start point of the application which invokes the CallPagination method defined in the **pagination.service.ts**.

```
import dotenv from "dotenv"
import { Helper } from './helper';
import PaginationService from './pagination.service';

dotenv.config()

const cosmosDB = new Helper();
const pageMod = new PaginationService(cosmosDB);


const callPagination = async () => {
    const result = await pageMod.executeSample(2, "")
    console.log({
        data: result.result,
        dataLength: result.result.length,
        hasMoreResult: result.hasMoreResults,
        contToken: result.continuationToken
    });
};

callPagination();
```

Implementation is really simple as we are passing a simple query that has more than 40 records and we set the **pageLimit** as 5 which is the max number of items to be returned in single call.

```
 public async executeSample(
    pageLimit: number = 5,
    contToken: string = ""
  ): Promise<{
    result: Array<any>;
    hasMoreResults: boolean;
    continuationToken: string;
  }> {
    const sqlQuery =
      `SELECT * from products where products.CategoryName = "Bikes, Road Bikes"`
    console.log({ sqlQuery })

    const { result, hasMoreResults, continuationToken } =
      await this.cosmosHelper.queryContainerNext(
        {
          query: sqlQuery
        },
        {
          maxItemCount: pageLimit,
          continuationToken: contToken
        },
        process.env.CONTAINER_NAME
      );

    return {
      result: result || [],
      hasMoreResults: hasMoreResults || false,
      continuationToken: continuationToken || "",
    };
  }
```

You can access the whole sample from this [link](https://github.com/sajeetharan/cosmos-db-js-pagination-sample).

#### Steps to Run the application

- Clone the Repository
- Run `npm install`
- Replace the environment COSMOS_ENDPOINT,COSMOS_KEY,COSMOS_DATABASE_NAME,CONTAINER_NAME in the .env file
- Run `npm start` run the application

Hope this helps someone who wants to implement Pagination with JavaScript. Cheers!
