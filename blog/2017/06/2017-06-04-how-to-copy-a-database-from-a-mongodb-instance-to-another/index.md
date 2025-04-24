---
title: How to copy a Database from a MongoDB instance to another?
Date: '2017-06-04'
categories:
  - developer
utcDate: '2025-04-24T09:52:37.426Z'
---

While recently i was working in an application i had to copy the database from a mongoDB  hosted in an mlab instance to my local. I will share an easy step in MongoDB Shell which support to copy database from remote instance to current one with a single command.

  

**DEMO with steps :**

  

I made  two instances of MongoDB from following commands.

```
 //Instance 1   mongod --port 9998 --dbpath /data/db1   //Instance 2   mongod --port 9999 --dbpath /data/db2  
```

  

In instance 1 there is a database called "**dsampledb1**".

and i started the instance with the following command,  
  

```
 mongo localhost:9998  
```

  

I create a database with one collection with the following command,

```
 use dsampledb1   db.users.save({id:1, name:"sample name"})  
```

  

Then I log in to next MongoDB instance using MongoDB Shell.

```
 mongo localhost:9999  
```

  

Now to copy the database from the instance 1 to instance 2 , we can simply use the following command,

```
 db.copyDatabase("dsampledb1","dsampledb2","localhost:9999")  
```

  

Syntax is as follows,

```
 db.copyDatabase(sourcedb, destinationdb, fromhost, username, password)  
```
