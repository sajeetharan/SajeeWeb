---
title: "Tip : Connect/Navigate to Microsoft Teams From any Web App"
utcDate: "2020-04-09"
categories: 
  - "azure"
  - "azuread"
tags: 
  - "angular"
  - "graph"
  - "integration"
  - "microsoft"
  - "react"
  - "teams"
coverImage: "azureblog.jpg"
---

I was working with a partner recently in developing Apps and integrated them as a part of Teams. At times there are questions from customers whether they would be able to utilize the features of teams within their application. The simple answer for the will be [NO](https://stackoverflow.com/questions/45727094/integrating-microsoft-team-into-my-web-app) as Teams Platform Architecture is enabling developers to bring adoption to teams by building more applications from different industry verticals which can be embedded inside teams

However there are two ways you can make the user to navigate to Microsoft Teams from the web application or even from Outlook.

**Make a clickable link for Teams chat** :

Here is a handy tip on how to make a one-click link that will open up Teams chat to you or the person who is already logged in. Say if you are using a web application which is on Angular, simply you can add a click event to navigate to teams with the code,

```
 takeUserToTeams() {
    window.location.href='http://teams.microsoft.com/l/chat/0/0?users=someone@domain.com';
  }
```

When the user click on the button it will open a web page where the user will sign-in with their Microsoft account. If the Teams app is installed on the client's computer, the web page will offer to open the chat in the Teams client, otherwise they can use the Teams web browser experience

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/blog1.png?w=1024)

<figcaption>

User Navigation from web app to Teams

</figcaption>

</figure>

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/3.jpg?w=1024)

<figcaption>

Opening chat seamlessly once user login

</figcaption>

</figure>

This is a very simple tip but most of the customers are asking for a way to do the same.

### Create a Share to Microsoft Teams

Third-party websites can also use the launcher script to embed Share to Teams buttons on their webpages which will launch the Share to Teams experience in a popup window when clicked. This will allow you to share a link directly to any person or Microsoft Teams channel without switching context.

**Step 1: Add  `launcher.js` script on your webpage.**

```
https://teams.microsoft.com/share/launcher.js
```

Step 2 : add an HTML element on your webpage with the `teams-share-button` class attribute and the link to share in the `data-href` attribute.

```
<div
  class="teams-share-button"
  data-href="https://<link-to-be-shared>">
</div>
```

This will add the Microsoft Teams icon to your website.

![Share to Teams icon](images/share-to-teams-icon.png)

That's it whenever user click the button content will be posted on the user directly from your apps to teams.

Hope these 2 tips helps someone out there to integrate teams with your application easily to navigate the users to teams!
