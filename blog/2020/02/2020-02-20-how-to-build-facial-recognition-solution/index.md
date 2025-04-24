---
title: "Architecture reference for Facial Recognition solution for the fraud prevention using Azure AI and Cosmosdb"
utcDate: "2020-02-20"
categories: 
  - "ai"
  - "azure"
  - "azurefunction"
  - "cloud"
  - "cosmosdb"
  - "eventgrid"
  - "reference-architecture"
tags: 
  - "architecture"
  - "azurefunctions"
  - "cognitiveservice"
  - "facerecognition"
  - "identification"
  - "reference"
coverImage: "appservice-1-1.jpg"
---

**Biometric Face Recognition** is the process and ability of a bio metric machine to identify and recognize the face of an individual. It deals with either to grant access to a secured system or to find out the details of a person by matching the face with existing data in the machine’s system.

Facial recognition is full of potential and can be easily incorporated to increase the security measures of any device/object. Apart from all the excitement, this technology is still developing, the more faces are fed in the algorithm, the more accurate it becomes. Therefore, there’s no need to be afraid of facial technology as it is being used for good ethical uses and safe practices.

Industries around the globe have already started to use face detection for several purposes. As a series of my ideas, [continuation with Architecture for traffic problem.](https://sajeetharan.wordpress.com/2019/06/13/how-azure-cosmosdb-functions-powerbi-iot-hub-could-solve-the-burning-traffic-problem/)

This post focuses on one of the solution with Azure by using various services such as Cognitive Service, Blob Storage, Event Grid, Azure Functions and Cosmosdb to build the right architecture that would solve the above mentioned use case.

## Overall Architecture:

#### Components used:

- Azure CosmosDB
- Azure Functions
- EventGrid
- Cognitive Face API
- Storage (Queue,Blob)

## Architecture:

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/02/face-detection-1.png?w=900)

The above architecture is very self explanatory, it comprises of two main components/flow.

- Training Faces of Individuals
- Identifying faces of Individuals

Every process is achieved in the above case using Azure function. Each operation will have separate function to achieve result. Main operations such as RegisterUser,TrainFace,TriggerTrain are simple Azure functions in the above diagram. Images are uploaded to Blob Storage using SAS token and face detection is done using cognitive service and references are stored in CosmosDB. EventGrid is used to route the events according to the invokes, for ex, to train image whenever a user uploads while registration and tag the face of the individual in the database.

I have used the above architecture with one case study and hope it will help someone out there who wants to build similar solution. Cheers!
