---
title: Running Python Inside SQL Server
Date: '2017-08-01'
categories:
  - asp-net-core
  - developer
  - sql
  - sqlserver
tags:
  - algorithm
  - analaytics
  - bigdata
  - iot
  - machinelearning
  - mssql
  - visualstudio
  - vscode
utcDate: '2025-04-24T09:52:37.442Z'
---

One of the valuable addition to data analytics by Microsoft was adding python into SQL server.Now SQL Server will support the two primary languages of Data Science within SQL Server R and Python. I am a fan of Python and  [Python](http://spectrum.ieee.org/computing/software/the-2017-top-programming-languages) is near the top of the most popular programming language charts, many people are interested in learning more about it.  As many professionals are unfamiliar with Python, i wanted to this post about the same.  
  
**Installing Python in SQL Server**  
  

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/08/b6867-pythoninstallsqlserver.png?w=262)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/08/b6867-pythoninstallsqlserver.png)

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

If you have already used R with SQL server then the process for using Python in SQL Server is very similar to it.  Microsoft renamed R Services to Machine Learning Services, and now allows both R and Python to be installed, as shown in the screen.  Microsoft’s version of Python uses Anaconda, which is an open source analytics platform created by Continuum. This is where Python differs from other open source languages, as Continuum is providing the version of Python as it contains data science components which are not included in the standard distribution of Python. Continuum also sells an enterprise version of Anaconda, with of course more features than come with the free version. Also it is mandatory and  important to remember the python environment as you will need select the same distribution when running Python code outside of SQL Server.

  

**Configuration Changes for Python**

  

The last thing needed to run Python is to configure and restart the SQL Server Services. In a new query type the following command

  

```
 sp_configure 'external scripts enabled', 1   GO   Reconfigure   GO  
```

  

After restarting the SQL Server Service, SQL Server will now run Python code. Since Python is easy to learn for even a novice developer. Code is easy to read and you can do a lot of things just by looking at it. Lets dig into python with sql server and do wonders with data analytics.
