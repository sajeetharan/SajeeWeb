---
title: Covid Escape - How to built a Game with Python and Cosmosdb
Date: '2020-02-28'
categories:
  - appinsights
  - cloud
  - microsoft
  - vscode
tags:
  - azure
  - cosmosdb
  - game
  - nosql
  - python
  - sql
coverImage: pygame.jpg
utcDate: '2025-04-24T09:52:37.756Z'
---

I've been gaming since 2003 till now.I remember those sleepless nights and how much fun i had playing PC games. I always wanted to be a game designer since my childhood days and have built lot of small games during my university days. After a very long time i invested some time and built a simple game using Python and Azure cosmosdb. I wanted to write how to build the game "Corona escape" with others in this blog post.

### PreRequisities:

- Python 3 Installed
- VScode or Pycharm
- Azure Subscription

**Game Structure :**

The coronavirus is fairly new that has taken the world by shock. It’s been two months since the outbreak started and it has shown that it isn’t as deadly as the SARS virus. This game "Corona Escape" is built using [Pygame](https://www.pygame.org/news) which is a library for beginners to cut their teeth on to get comfortable with learning programming and the process of game development and feel successful in making games. It's also a great rapid prototyping tool. This game is very similar to any jump game. The idea is that to escape from the virus as much as you can, user will be provided with a capsule to make the move fast and a mask to escape from the virus. I will not go in detail on the logic side of it as the source code is published [here](https://github.com/sajeetharan/Corona-escape/blob/master/main.py).

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/game-01.jpg?w=1024)

<figcaption>

Corona Escape Game

</figcaption>

</figure>

Architecture below is fairly easy, its just a diagram with Cosmosdb to store the data and application insights to gather the user details (type of device,location etc). If you have plan to expand the game, you could add other components in the architecture such as azure functions etc.

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/demo.jpg?w=809)

Highest score is pushed to a text file and Azure cosmosdb for sharing the score across the users in the world. The related code resides in the [cosmos.py](https://github.com/sajeetharan/Corona-escape/blob/master/cosmos.py) which as follows,

```
def getLeaderBoard(self):
        options = {}
        options['enableCrossPartitionQuery'] = False
        options['maxItemCount'] = 100
        query = {'query': 'SELECT * FROM server s'}

        results = self.client.QueryItems(self.container['_self'], query, options)

        for result in results:
            print(result['message'])


def pushData(self,username,highscore):
        data = self.client.CreateItem(self.container['_self'], {
            "username": str(username),
            "highscore": str(highscore),
            "message" : str(username) + " got " + str(highscore)
        })

 
```

Make sure to create a cosmosdb account with the SQL API and pass those credentials under config.

```
self.config = {
            'ENDPOINT': 'your endpoint',
            'PRIMARYKEY': 'your cosmosdb primary key',
            'DATABASE': 'your db',
            'CONTAINER': 'your container'
        }
```

#### How to run the Game:

- Clone the repository from [here](https://github.com/sajeetharan/Corona-escape)
- Make sure to install the dependencies using pip such as pygame
- Run the game with the command **python main.py**

Hope this helps someone who want to build games using python and cosmosdb. Play the game and add your comments below. cheers!
