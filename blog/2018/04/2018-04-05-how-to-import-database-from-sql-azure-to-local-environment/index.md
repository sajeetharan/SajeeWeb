---
title: "How to Import database from SQL Azure to local environment"
date: "2018-04-05"
categories: 
  - "c"
  - "database"
  - "mssql"
  - "sql"
---

One of the most frequent thing that developers always wanted to have a copy of the development database in local. In this blog i will pen down the steps on how to export and import a database from SQL azure instance to local machine and restore it on SQL server. **Prerequisites:** You will need an Azure account and get the credentials  from Azure web portal. 

**Step 1:**

Get the backup from the azure instance as follows,  Select the **database → Right click → Tasks →  Export Data Tier Application.**

 

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/92552-2018-02-07_11-45-17.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/92552-2018-02-07_11-45-17.png)

**Step 2:**

Give a specific name for the backup file and save it in your desired location as follows,

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/c0546-2.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/c0546-2.jpg)

**Step 3:** That's it you have taken a backup of the database from sql instance to your local. Lets restore it to the local. Copy the backed up database to your C drive. Now open the

**PowerShell** with administrator rights and navigate to C drive

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/dcbbc-2018-02-07_11-51-192b252812529.png?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/dcbbc-2018-02-07_11-51-192b252812529.png)

**Step 4:** Lets download the powershell script to remove the master key**[RemoveMasterKey.ps1](https://adramatch.jira.com/wiki/download/attachments/327647301/RemoveMasterKey.ps1?version=1&modificationDate=1517984577463&cacheVersion=1&api=v2)**have the script on the same drive in this case its C.

**Step 5 :** Run the script as follows,

 **.\\RemoveMasterKey.ps1 -bacpacPath "C:\\identity.bacpac"**

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/50fbf-2018-02-07_11-56-47.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/50fbf-2018-02-07_11-56-47.jpg)

That's it, now you can restore it on MSSQL 2017 in your local environment.

**Step 6:** Connect to your local server**,** and click **Databases → Import-Data-Tier-Application**

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/c6b0c-ewes.jpg?w=236)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/c6b0c-ewes.jpg)

**Step 7 :** Give a name for your database to restore. 

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/a8914-2018-02-07_12-00-48.png?w=292)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/a8914-2018-02-07_12-00-48.png)

Now you will see everything in green!

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/ff633-2018-02-07_12-01-40.jpg?w=292)](https://sajeetharan.wordpress.com/wp-content/uploads/2018/04/ff633-2018-02-07_12-01-40.jpg)

That's it folks, now you should be easily able to restore your development database in your local environment.
