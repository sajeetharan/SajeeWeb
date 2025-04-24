---
title: "Wear out the features of Azure CosmosDB with AspNetCore application"
date: "2018-03-26"
categories: 
  - "developer"
  - "visualstudio"
  - "vscode"
tags: 
  - "azure"
  - "c"
  - "cosmosdb"
  - "course"
  - "crud"
  - "documentdb"
  - "dotnet"
  - "dotnetcore"
  - "emulator"
  - "github"
  - "nosql"
  - "portal"
  - "sql"
---

Azure CosmosDB ([Azure Cosmos DB – Globally Distributed Database Service (formerly DocumentDB) | Microsoft Azure](https://azure.microsoft.com/en-us/services/cosmos-db/)) is a super set of the service once known as “Azure Document Db”. In short: “Azure CosmosDB ” = “Azure Document Db” + new data types + new APIs.

You can try CosmosDB  for free on Azure or you can setup the CosmosDB on your local environment by following my previous [blog](http://sajeetharan.blogspot.com/2018/03/setting-up-azure-cosmos-db-with-visual.html). I am becoming a fan of .NET Core with all the features and it is getting better day by day . In this blog post i just wanted to take that initial steps of how to work with CosmosDB from .NET Core Client context. After reading this blog, you should be able to do the following with CosmosDB programmatically,

- Create Database
- Create Collection
- Create Documents
- Query a Document
- Delete Database

**Pre-Requisities Needed:**

I have the following in my local environment , hope you guys have already have😊, if not start setting up.

- Windows 10 OS
- Azure CosmosDB Emulator
- Visual Studio Code editor with C# plugin
- .NET Core 2.0

Ok folks, lets get started.

**Step 1: Create .Net Core Console Application :**  As other tutorials, to make it simple I will be creating a dotnetcore console app to work with CosmosDB . With **Net Core** , we now  have a **CLI**. Lets create the new app with the following steps. (I’ve mentioned in the previous [blog](http://sajeetharan.blogspot.com/2018/01/build-web-api-with-net-core-using-cli.html))

1. Open command prompt or poweshell (Administrator Mode)
2. Navigate to your folder where you need to create the app
3. Execute the following command

```
dotnet new console -n CosmosCoreClient -o CosmosCoreClient
```

here **\-n** denotes the name of the application, and -**o** tells the CLI to create a **folder** with that name and create the application inside the folder

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/dcd55-2018-03-25_22-31-18.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/dcd55-2018-03-25_22-31-18.png)

Open the newly created project in Visual Studio Code. Execute the following command

Code.

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/853db-2018-03-25_22-32-18.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/853db-2018-03-25_22-32-18.png)

Here is a screenshot of how it should look on your end:

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/4f2bf-2018-03-25_22-33-22.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/4f2bf-2018-03-25_22-33-22.png)

I am using C# 7.1 feature to create a async Main method in my console app. For that, we will need to make a small change in our project file a little. Open **CosmosDBClient.csproj** file to edit. Add the following **XML** node to **PropertyGroup** node.

```
<LangVersion>latest</LangVersion>
```

After changes, your csproj file should look like below:

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/b93d0-2018-03-25_22-35-59.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/b93d0-2018-03-25_22-35-59.png)

Lets move to the core part of integrating CosmosDB with .netCore application and start building the features.

**Step 2: Add CosmosDB Nuget Package**

If you have followed the above steps, we have successfully created the application, next is to add reference to **CosmosDB** nuget package to get the client libraries. Advantage of these packages/libraries are, they make it easy to work with Cosmosdb.

1. Open a command prompt and navigate to root of your project.
2. Execute the following command

```
dotnet add package Microsoft.Azure.DocumentDB.Core
```

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/4aef9-2018-03-25_22-37-20.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/4aef9-2018-03-25_22-37-20.png)

You might wonder the namespace has DocumentDB in it. In fact DocumetDB is where the whole journey started and hence the name sticks in Cosmos world too. If you now look at the project file a new reference for DocumentDB would have been added. Here is the screenshot of my project file.

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/d2538-2018-03-26_07-16-50.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/d2538-2018-03-26_07-16-50.png)

**Step 3: Creating Model for CosmosDB**

Lets build the database. If you are new to CosmosDB you should know that CosmosDB has a query playground here [https://www.documentdb.com/sql/demo](https://www.documentdb.com/sql/demo). It is a sandboxed environment with couple of databases and you can try around with different queries you can write against the database. For this post, lets create the database named **Course** locally.

Since we our application is to deal with the Courses we need 4 Models here.

1. Course
2. Session
3. Teacher
4. Student

Here are the Models of the above 4.

**Course.cs**

```
using Microsoft.Azure.Documents;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
public class Course : Document
{
    [JsonProperty(PropertyName = "CourseId")]
    public Guid CourseId { get; set; }

    [JsonProperty(PropertyName = "Name")]
    public string Name
    {
        get
        {
            return GetPropertyValue<string>("Name");
        }
        set
        {
            SetPropertyValue("Name", value);
        }
    }

    [JsonProperty(PropertyName = "Sessions")]
    public List<Session> Sessions { get; set; }

    [JsonProperty(PropertyName = "Teacher")]
    public Teacher Teacher { get; set; }

    [JsonProperty(PropertyName = "Students")]
    public List<Student> Students { get; set; }
}
```

**Session.cs**

```
using System;

public class Session
{
    public Guid SessionId { get; set; }

    public string Name { get; set; }

    public int MaterialsCount { get; set; }
}
```

**Teacher.cs**

```
using System;

public class Teacher
{
    public Guid TeacherId { get; set; }

    public string FullName { get; set; }

    public int Age { get; set; }
}
```

**Student.cs**

```
using System;

public class Student
{
    public Guid StudentId { get; set; }
    public string FullName { get; set; }

}
```

Lets create the Client as the next step.

**Step 4: Creating the Client**

Next step you will need to instantiate the CosmosDb client before we do anything with the database. In order to connect to the local instance of the cosmosDb, we need to configure 2 things,

1. URL of the CosmosDb instane
2. Authentication key needed to authenticate.

As stated above, When you start the CosmosDb  local emulator, the db instance is available at [https://localhost:8081](https://localhost:8081/). The **authkey** for local emulator is a static key and you can find it here in this article([https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator#authenticating-requests](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator#authenticating-requests)). This key works only with the local emulator and wont work with your Azure instance, you can find the key if you are using azure instance from the portal as mentioned in the [answer](https://stackoverflow.com/questions/49320441/where-is-accountkey-for-cosmosdb-in-azure-portal). Here is the code snippet to instantiate the client:

```
        static string endpointUri = "https://localhost:8081";
        static string authKey = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
        string dbName = "CourseDB";
        string collectionName = "Courses";
        static void Main(string[] args)
        {
            Console.WriteLine("Press any key to run");
            Console.ReadLine();

            Run();

            Console.ReadLine();

        }
        private static async void Run()
        {
            DocumentClient documentClient = new DocumentClient(new Uri(endpointUri),
                authKey);
        }
```

When the method Run is exectued the Client is instantiated with the local CosmosDB emulator.

**Step 5: Lets start building the features**

Next step is to build the features as listed above. Lets add the methods inside the Async method.

**Creating Database:**

To create a new database programmatically, we make use of **CreateDatabaseAsync()** or **CreateDatabaseIfNotExistsAsync()**. When creating the database we pass the database name. Here is the code snippet:

```
private static async Task<Database> CreateDatabase(DocumentClient documentClient)
        {
            Database database = documentClient.CreateDatabaseQuery().Where(c => c.Id == "courseDatabase").AsEnumerable().FirstOrDefault();
            if (database == null)
            {
                database = await documentClient.CreateDatabaseAsync(new Database()
                {
                    Id = "courseDatabase"
                });
            }
            return database;
     }
```

When you refresh the URL of local CosmosDB emulator, You should see the database created in your local db emulator as follows,

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/e1f55-2018-03-26_06-43-15.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/e1f55-2018-03-26_06-43-15.png)

**Creating Collection:**

Once the database is created, we can then create a collection. We make use of **CreateDocumentCollectionAsync()** or **CreateDocumentCollectionIfNotExistsAsync()**.

We will need to provide what is known as the database link (basically the URI at which the db can be reached) and the collection name to the create method. Here is the code snippet.

```
private static async Task<DocumentCollection> CreateDocumentCollection(DocumentClient documentClient, Database database)

        {
            DocumentCollection documentCollection = documentClient.CreateDocumentCollectionQuery(database.CollectionsLink).Where(c => c.Id == "courseDocumentCollection").AsEnumerable().FirstOrDefault();

            if (documentCollection == null)
            {
                documentCollection = await documentClient.CreateDocumentCollectionAsync(database.SelfLink, new DocumentCollection()
                {
                    Id = "courseDocumentCollection"
                });
            }

            return documentCollection;
        }
```

Now you should the the Collection for Course is created as follows,

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/1925c-2018-03-26_06-48-57.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/1925c-2018-03-26_06-48-57.png)

**Creating Document :**  After creating the database and collection, we can now create the documents. We make use of **CreateDocumentAsync()** for this purpose. We will need to pass the URI of the collection under which we want to create the document and the document data itself. In this example we make use of the **Course** data mode i showed earlier and pass it to the create method. Here is the code snippet:

```
private static async Task CreateCourse(DocumentClient documentClient, DocumentCollection documentCollection)
        {
            Course course = new Course()
            {
                CourseId = Guid.NewGuid(),
                Name = "En",
                Teacher = new Teacher()
                {
                    TeacherId = Guid.NewGuid(),
                    FullName = "Scott Hanselman",
                    Age = 44
                },
                Students = new List<Student>()
                {
                    new Student(){
                         FullName = "Trump",
                         StudentId = Guid.NewGuid()
                    }
                },
                Sessions = new List<Session>(){
                    new Session(){
                        SessionId = Guid.NewGuid(),
                        Name = "CosmosDB",
                        MaterialsCount = 10
                    },
                    new Session(){
                        SessionId = Guid.NewGuid(),
                        Name = "Ch1",
                        MaterialsCount = 3
                    }
                }
            };
            Document document = await documentClient.CreateDocumentAsync(documentCollection.DocumentsLink, course);
        }
```

You should see the document inserted in localdb Emulator as follows.

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/e43ea-2018-03-26_06-52-09.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/03/e43ea-2018-03-26_06-52-09.png)

**Querying Document:**

Now that we have created a document, we can see how to query it. We can make use of **CreateDocumentQuery()** method for this purpose. We will need to pass the collection link on which we need to query. We can then build the query as a **LINQ** expression and the client library does the rest. This is the best part of the client library. It has the ability to translate your LINQ expression to cosmos REST URIs without me having to crack my head in constructing those URIs. Here is the code snippet:

```
private Course QueryCourse(Guid guid, String dbName, DocumentClient documentClient, string collectionName)
        {
            Course selectedCourse = documentClient.CreateDocumentQuery<Course>(
                             UriFactory.CreateDocumentCollectionUri(dbName, collectionName))
                             .Where(v => v.Name == "CosmosDB")
                             .AsEnumerable()
                             .FirstOrDefault();
            return selectedCourse;
        }
```

Note that you will need to import System.Linq for the LINQ expression to work.

**Deleting Database:**

Finally, we can make use of **DeleteDatabaseAsync()** method to delete the database programmatically. We will need to provide the database link to the delete method. We can use the **UriFactory.CreateDatabaseUri()** helper method to create the database link. Here is the code snippet:

```
await documentClient.DeleteDatabaseAsync(UriFactory.CreateDatabaseUri(dbName));
```

Well, those are the main features that Azure CosmosDB client provides and if you are stuck with any of the steps above , you can check out the [repository](https://github.com/sajeetharan/AspNetCoreCosmosDB) i have added with the samples.

Happy Coding! Lets spread Azure's CosmosDB to the world.
