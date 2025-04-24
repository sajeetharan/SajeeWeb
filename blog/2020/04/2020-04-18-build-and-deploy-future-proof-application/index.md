---
title: "Build and Deploy Future Proof Application with Azure Kubernetes Service in 10 Minutes (Nodejs, Go + AKS)"
date: "2020-04-18"
categories: 
  - "appinsights"
  - "appservice"
  - "architecture"
  - "asp-net-core"
  - "azuredevops"
  - "ci-cd"
  - "microsoft"
  - "opensource"
tags: 
  - "aks"
  - "azure"
  - "azurekubernetes"
  - "devops"
  - "devops-starter"
  - "devopslabs"
  - "golang"
  - "kubernetes"
  - "node"
coverImage: "aks_01.jpg"
---

Quarantine, self isolation , social distancing for the past one month, I’m living with these words. While most of us are investing this time to learn new technologies/tools. I challenged myself to skill up myself and have deep knowledge on certain services on Azure.

Kubernetes provides a uniform way of managing containers. Its aim is to remove the complexity of deciding where applications should be scheduled to run, how to locate them, how to ensure they are running, autoscale or deploy. Azure Kubernetes is a service on Azure that help Customer achieve their business goals, by providing a layer of automation on top of their infrastructure. Going towards the technical features, Azure Kubernetes has a lot to offer, but at the end of the day, is a great platform for saving money or growing faster.

Azure Kubernetes service offers great set for microservice architectures. If your application needs to start hundreds of containers quickly or will terminate them just as quickly and to have full control of those services, AKS is a great option. There are other scenarios such as Bigdata, IOT scenarios you would consider AKS as a preferred choice. In this post i will explain how to easily setup your application running on AKS cluster in 10 minutes with CI/CD pipelines.

### PreRequisities:

You will need to have an Azure Subscription. If you do not have an Azure subscription you can simply create one with [free trial](https://azure.microsoft.com/en-us/free/).

### How to build & Deploy the application:

If you are a beginner with Azure Kubernetes Service, [Azure Devops](https://docs.microsoft.com/en-us/azure/devops-project/) is the best place that you need to look in order to understand how an Application is deployed on Azure Kubernetes. The **Azure DevOps Project** simplifies the setup of an entire continuous integration (CI) and continuous delivery (CD) pipeline to Azure with Azure DevOps. Cool thing is that, you can start with existing code or use one of the provided sample applications. It enables you to quickly deploy that application to various Azure services such as Virtual Machines, App Service, Azure Kubernetes Services (AKS), Azure SQL Database, and Azure Service Fabric.

**Lets Deploy an Node.js App to Azure Kubernetes Service :**

Navigate to Azure Portal and search for Azure Devops Project in the market place/search bar.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/1.jpg?w=1024)

<figcaption>

Azure Devops Project

</figcaption>

</figure>

Let's go ahead and add a new project.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/2.jpg?w=1024)

<figcaption>

Add new Azure Devops Project

</figcaption>

</figure>

Azure Devops project enables developers to launch an app withany Azure App Service in just a few quick steps, providing everything needed to develop, deploy and monitor an app. Create a DevOps Project, and it provisions all the Azure resources and provides a Git code repository, Application Insights integration and a continuous delivery pipeline setup for deployment to Azure. The DevOps Project dashboard lets you monitor code commits, builds and deployments from a single view in the Azure portal. How cool is that ?

With the help of Azure DevOps Projects, you can build an Azure application, on an Azure service, in quick time. You also get automatic full CI/CD pipeline integration, built-in monitoring and deployment to the platform of your choice. Azure Devops Project supports almost all the latest languages out there in practice such as .Net,Java,Node.js,PHP,Python and Go.

Next step is to select the Language you want to have the application on, I will go ahead and choose Nodejs as my application language. But you could choose any language that you want to test.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/7.png?w=1024)

<figcaption>

Create Node.js Devops Project

</figcaption>

</figure>

Once you select the language, next step is to select the framework in which you want the application to be based on , For example, if you choose Python it could be based on Flask,Django etc. Similarly you have the flexibility to choose the framework once you decide the language. In this case i will go ahead and choose express.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/8.png?w=1024)

<figcaption>

Select the Framework

</figcaption>

</figure>

Next step is the critical part of the process, This is the step that defines which service you would be using to deploy the app. You can Run your application on Windows or Linux. Simply deploy to Azure Web App, Virtual Machine, Service Fabric or choose Azure Kubernetes Service for your application. Each of those option provides deployment in an elegant and fast way. In this case, we will deploy the application to Azure Kubernetes service.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/9.png?w=1024)

<figcaption>

Azure Kubernetes Service to Deploy

</figcaption>

</figure>

Once you are done with the above step, final step is passing the configuration details for the Kubernetes cluster on AKS as follows,

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/11.png?w=494)

Most of the settings are self explanatory , you can change the size of underlying VMs based on your requirement. The default number of nodes for your cluster comes as 3 , if you need to make changes to your cluster and the container registry settings click on Additional Settings. Here you can configure the Kubernetes version, Node count, App Insights and resource group location. The **HTTP** application **routing** solution makes it easy to access applications that are deployed to your Azure Kubernetes Service (AKS) cluster. In this case we will disable it.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/12.png?w=1024)

<figcaption>

Additional Settings AKS configuration

</figcaption>

</figure>

Container registry is needed as your images needs to be pushed to them. Once you're good with all settings, click ok and done!. You will see a notification box as below.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/14.png?w=1024)

<figcaption>

K8s cluster, Container Registtry, CI/CD pipelines are created

</figcaption>

</figure>

Once everything is created you will be redirected to a Dashboard page as below.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/15.jpg?w=1024)

<figcaption>

Resources in page

</figcaption>

</figure>

The four stages involved are:

1. **Azure Kubernetes Cluser**: Created and configured your Azure Kubernetes Cluster and application endpoint.
2. **Azure Container Registry :** Created and application image is pushed to the container registry.
3. **Repository:** Created a distributed Git repository and checked in sample code.
4. **CI/CD Pipeline:** Seamlessly connected with the Azure Devops collaboration solution allows you to plan, test, release and monitor your solutions.
5. **Application Insights:**  Created and configured your Application Insights telemetry which enables active monitoring and learning to proactively detect issues and continuously analyze and test hypotheses without code.

You can see all the resources created on Azure under the resource group

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/21.jpg?w=1024)

<figcaption>

Resource Group with All resources

</figcaption>

</figure>

When you click on the Kuberentes cluster, you can see the Kubernetes related resources such as dashboard logs etc.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/18.png?w=1024)

<figcaption>

Kubernetes cluster resources

</figcaption>

</figure>

And if you navigate to the blade you can see the settings such as Enabling Dev spaces , Kubernetes version, Application Insights etc.

On the Azure Devops side, you will be able to see new Azure Devops project created with Dashboard, Backlog items, CI/CD pipelines etc.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/17.png?w=1024)

<figcaption>

Azure Devops Project with CI/CD pipelines

</figcaption>

</figure>

And when you click on the application endpoint, you would see that the application running successfully on Azure Kubernetes service.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/22.png?w=1024)

<figcaption>

Nodejs App on AKS

</figcaption>

</figure>

In order to verify the services and pods, you could follow the steps provided in the Azure Kubernetes dashboard configuration and when you open up the dashboard, you can see the status of each services.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/04/23.png?w=1024)

<figcaption>

Azure Kubernetes dashboard

</figcaption>

</figure>

I have spent more than 4 days in the past to configure Kubernetes to deploy my application. But Azure Devops project Simplify and speed up the DevOps process with Azure DevOps services. If you want to explore more kind of scenarios on different services on Azure its worth to explore [Azure Devops Labs.](https://www.azuredevopslabs.com/.) I hope it makes it easier to get started with any of the deployment with Azure services. Cheers!
