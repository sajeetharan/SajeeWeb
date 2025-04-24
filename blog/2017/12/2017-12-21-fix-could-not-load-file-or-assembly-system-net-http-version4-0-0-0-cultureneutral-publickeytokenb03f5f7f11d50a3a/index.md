---
title: "Fix : Could not load file or assembly “System.Net.Http, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a”"
utcDate: "2017-12-21"
categories: 
  - "developer"
---

Even though there are several answers on stackoverflow, nothing helped me to solve this issue and found the solution as follows,

1\. Update Visual studio if you have older version to 15.5.4 _(Optional)_

2\. Remove all binding redirects from web.config

3\. Add this to the csproj file:

[![](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/0fadc-capture.jpg?w=300)](https://sajeetharan.wordpress.com/wp-content/uploads/2017/12/0fadc-capture.jpg)

4\. Build.

5\. In the bin folder, there should be a **\`(WebAppName).dll.config\`** file.

6\. It should have redirects in it. Copy these to the web.config

7\. Remove the above snipped from the csproj file again

8\. It should work
