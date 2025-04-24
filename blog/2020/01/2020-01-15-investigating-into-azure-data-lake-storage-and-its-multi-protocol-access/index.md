---
title: "Investigating into Azure Data Lake Storage and its Multi-protocol Access"
date: "2020-01-15"
categories: 
  - "adls"
  - "datalake"
  - "datalakes"
  - "datawarehouse"
  - "developer"
  - "sqlserver"
tags: 
  - "azure"
  - "bigdata"
  - "blobstorage"
coverImage: "blog34.jpg"
---

We have a wide variety of options to store data in Microsoft Azure. Nevertheless, every storage option has a unique purpose for its existence. In this blog, we will discuss ADLS (Azure Data Lake Storage) and its multi-protocol access that Microsoft introduced in the year 2019.

###   
Introduction to ADLS (Azure Data Lake Storage)

> According to the Microsoft definition, it is an enterprise-wide hyper-scale repository for big data analytics workloads and enables you to capture data of any size and ingestion speed in one single space for operational and exploratory analytics.

The main purpose of its existence is to enable analytics on the stored data (it may be of any type structured, semi-structured and unstructured data) and provide enterprise-grade capabilities like scalability, manageability, reliability, etc.

### Where does it build?

ADLS is built on the top of the Azure [Blob Storage](https://www.serverless360.com/blog/azure-blob-storage-vs-file-storage). Blob Storage is one of the storage services under the suite of Storage accounts. Blob storage lets you store any type of data and it doesn’t necessarily to be a specific data type.

### Does the functionality of ADLS sound like the Blob storage?

From the above paragraphs, it looks like both ADLS and Blob storage has the same functionality. Because, both the services can be used to store any type of data. But, as I said before, every service has its purpose for its existence. Let us explore, what is the difference between ADLS and Blob storage in the following.

### Difference between ADLS and Blob storage

#### Purpose

It is optimized for analytical purposes on the data stored in the ADLS, but Blob storage is a usual way of storing file-based information in Azure where the data which will not be accessed very often also called as cold storage.

#### Cost

In both the storage options, we need to pay the amount for the data stored and I/O operations. In the case of ADLS, the cost is slightly higher than the Blob.

#### Support for Web HDFS interface

ADLS supports a standard web HDFS interface and can access the files and directories in Hadoop. Blob does not support this feature.

#### I/O performance

ADLS is built for running large scale systems that require massive read throughput when queried against the DB at any pace. Blob is used for store data which will be accessed infrequently.

#### Encryption at rest

Since ADLS GA, it supports encryption at rest. It encrypts data flowing in public networks and at rest. Blob Storage does not support encryption at rest. See more details on the comparison [here](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-comparison-with-blob-storage).

Now, without any further delay let us dig on the Multi-protocol access for ADLS.

### Multi-protocol access for ADLS

This is one of the significant announcements that Microsoft has done in the year 2019 as far as ADLS is concern. Multi-protocol access to the same data allows you to leverage existing object storage capabilities on Data Lake Storage accounts, which are hierarchical namespace-enabled storage accounts built on top of Blob storage. This allows you to put all your different types of data in the data lake so that the users can make the best use of your data as the use case evolves.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/image.png?w=512)

The multi-protocol concept can be achieved via Azure Blob storage API and Azure Data Lake Storage API. The convergence of both the existing services, ADLS Gen1 and blob storage, paved the path to a new term called Azure Data Lake Storage Gen 2.

### Expanded feature set

With the announcement of multi-protocol access, existing blob features such as access tiers and lifecycle management policies are now unlocked for ADLS. Furthermore, it enables many of the features and ecosystem support of blob storage is now supported for your data lake storage.

This could be a great shift because your blob data can now be used for analytics. The best thing is you don’t need to update the existing applications to get access to your data stored in Data Lake Storage. Moreover, you can leverage the power of both your analytics and object storage applications to use your data most effectively.

_While exploring the expanded feature sets, one of the best things I could found is that ADLS can now be integrated with Azure Event Grid_.

Yes, we have one more publisher on the list for Azure Event Grid. Azure Event Grid can now be used to consume events generated from Azure Data Lake Storage Gen2 and routed to its subscribers with webhooks, Azure Event Hubs, Azure Functions, and Logic Apps as endpoints.

### Modern Data Warehouse scenario

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/01/image-1.png?w=602)

The above image depicts the use case scenario of ADLS integration with Event Grid. First off, there are a lot of data comes from different sources like Logs, Media, Files and Business apps. Those data are ending up in the ADLS via Azure Data Factory and the Event Grid which listens to the ADLS gets triggered once data reaches it. Further, the event gets routed via Event Grid and Functions to Azure Databricks. The file will be processed by the databricks job and writes the output back to Azure Data Lake Storage Gen2. Meanwhile, Azure Data Lake Storage Gen2 pushes a notification to Event Grid which triggers an Azure Function to copy data to Azure SQL Data Warehouse. Finally, the data will be served via Azure Analysis Services and PowerBI.

### Wrap-up

In this blog, we have seen an introduction about the Azure Data Lake Storage and the difference between ADLS and blob storage. Further, we investigated the multi-protocol access which is one of the new entrants in ADLS. Finally, we looked into one of the extended feature sets - integration of ADLS with Azure Event Grid and its use case scenario.

I hope you enjoyed reading this article. Happy Learning!

Image Credits: **Microsoft**

This article was contributed to my site by [Nadeem Ahamed](https://www.linkedin.com/in/nadeem-ahamed-r/) and you can read more of his articles from [here](https://www.serverless360.com/blog/author/nadeem).
