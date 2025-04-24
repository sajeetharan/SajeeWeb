---
title: Deploy Deno App to Azure with Github Actions
Date: '2020-05-31'
categories:
  - angular
  - architecture
  - bestpractices
  - deno
  - githubactions
  - javascript
  - tools
  - visualstudio
tags:
  - api
  - azure
  - nodejs
  - restapi
  - typescript
  - webapp
coverImage: azure001.jpg
utcDate: '2025-04-24T09:52:37.824Z'
---

## Overview :

Before two weeks Ryan Dahl (Founder of Node.JS) announced the first version of `[Deno](https://deno.land/)`. As the tagline says **A secure runtime for JavaScript and TypeScript.** **Deno** is a runtime for Javascript and Typescript that is based on the V8 JavaScript engine and the Rust programming language. I have been a Node developer for 2 years in the past, if you want to get started with Deno knowing Node.js would be an added advantage. Even though Deno has arrived as a competitor for NodeJS in the industry not so quick but people are sure that it'll take over.

I was reading lot of documentations and materials to understand the difference. So, here are the advantages that i see from Deno,

- It is Secure by default. No file, network, or environment access, unless explicitly enabled.
- Supports TypeScript out of the box.
- Ships only a single executable file.
- Has built-in utilities like a dependency inspector (deno info) and a code formatter (deno fmt).
- Deno does not use npm
- Deno does not use package.json in its module resolution algorithm.
- All async actions in Deno return a promise. Thus Deno provides different APIs than Node.
- Uses "ES Modules" and does not support require().
- Deno has a built-in test runner that you can use for testing JavaScript or TypeScript code.
- Deno always dies on uncaught errors.

I was very excited as other developers when Deno was _[announced](https://www.youtube.com/watch?v=H0KJ11hH43s)_. In this post i will demonstrate how to create a simple Web API with Deno and deploy to production on Web App with Azure.

### PreRequisities:

You will need to have an Azure Subscription. If you do not have an Azure subscription you can simply create one with free trial.

#### Install Deno :

**Using Shell (macOS, Linux):**

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

**Using PowerShell (Windows):**

```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

**Using Homebrew (macOS):**

```
brew install deno
```

**Using Chocolatey (Windows):**

```
choco install deno
```

**Using Scoop (Windows):**

```
scoop install deno
```

#### Services used:

- Azure Web App
- Github Actions

#### Step 1 : Create Deno Rest API

I will not be going through each step on how to create the REST API, however if you are familiar with creating APIs with Node , it is the same way that you need to do. You need to have the main file server.ts which will have those routes defined. (server.ts)

```
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
const PORT = 8001;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server at ${PORT}`);
await app.listen({ port: PORT });
```

One feature that i personally liked in DENO is that it provides developers to code with  TypeScript that addresses "design mistakes" in Node.js. In this case i am going to create an API to fetch/add/delete products and my interface would look like as below (types.ts),

```
export interface Product {
    id: String;
    name: String;
    description: String;
    price: Number;
    status: String;
}
```

Similar to how you would define routes in Node, you need to define the routes for different endpoints when user want to execute fetch/add/delete operations as follows(routes.ts),

```
import { Router } from "https://deno.land/x/oak/mod.ts";
import { delete_product, add_product, get_product, get_products } from "./Controllers/Products.ts";

const router = new Router();

router.get("/", ctx => {
    ctx.response.body = "Welcome to Deno!";
});

router.get("/get/:id", get_product);
router.post("/add", add_product);
router.get("/get_all_products", get_products);
router.get("/delete/:id", delete_product);

export default router;
```

The final step is to create the code for the logic of those each routes. You need to implement the methods which are defined in those routes. For example **get\_products** would look like

```

import { Product } from "../Types.ts";

let products: Product[] = [
    {
        id: "1",
        name: "Iphone XI",
        description: "256GB",
        price: 799,
        status: "Active"
    }
];

const get_products = ({response}: {response: any}) => {
    response.status = 200;
    response.body = products;
};
```

You can access the whole code from this [Repository](https://github.com/sajeetharan/azure-deno-githubaction).

#### Run the DENO app:

Once you are good with everything, you can run the app in local and check if the endpoints are working as expected.

```
deno run -A server.ts
```

And you would see the app running in port 8001 , and you can access the endpoints as follows ,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/op.png?w=1024)

<figcaption>

Deno API

</figcaption>

</figure>

## Step 2 : Create Azure Resources

Now we are good with the first step and you can see the app running successfully in local. As the next step let's go ahead and deploy the app to [Azure](https://azure.microsoft.com/en-us/). Inorder to deploy the app, you need to create a Resource Group first.

**Create a ResourceGroup Named Deno-Demo**

You can navigate to [Azure Portal](https://portal.azure.com/) and search for Resource Group in the search bar and create a new one as defined [here](https://sajeetharan.wordpress.com/2020/03/20/how-i-built-an-application-in-10-minutes-to-see-how-world-reacts-to-work-from-home-using-serverless-with-azure/)!

Next step is to create the Web App , as we are going to deploy this app to a Linux environment, you can set the configuration as follows,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/2.png?w=905)

<figcaption>

Web App Configuration

</figcaption>

</figure>

### Step 3 : Deploy to Azure with Github Actions

One of the recent inventions by Github team that was loved by all developers were [Github Actions](https://github.com/features/actions). Personally i am a big fan of Github actions and i have published few posts earlier explaining the same. To configure the Github Action to our application, first you need to push the code to your github repository.

**Create a deno.yml**

To deploy the app , we first need to create the workflow under the actions. you can create a new workflow by navigating to Actions tab and create new workflow

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/1.png?w=620)

<figcaption>

New Workflow

</figcaption>

</figure>

I am assuming that you are familiar with important terms of Github Actions, if you are new you can explore [here](https://help.github.com/en/actions). In this particular example i will be using one [package](http://anthonychu/azure-webapps-deno-deploy@master) created by [Anthony Chu](https://twitter.com/nthonyChu) who is a Program Manager in Azure functions team. And my [deno.yml](https://github.com/sajeetharan/azure-deno-githubaction/blob/master/.github/workflows/deno.yml) looks like below,

```
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:

  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    
    - uses: actions/checkout@v2

    - uses: azure/login@v1.1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Set up Deno
      uses: denolib/setup-deno@master
      with:
        deno-version: 1.0.2

    - name: Bundle and zip Deno app
      run: |
        deno bundle server.ts server.bundle.js
        zip app.zip server.bundle.js
    - name: Deploy to Azure Web Apps
      uses: anthonychu/azure-webapps-deno-deploy@master
      with:
        app-name: denodemo
        resource-group: deno-demo
        package: app.zip
        script-file: server.bundle.js
        deno-version: "1.0.2"
```

One important thing you need to verify is the resource-group and the app-name as you created on Azure.

Also you need to add secrets of your application under secrets in Github repository. You can generate a new Service Principal and obtain the secret as below,

```

az ad sp create-for-rbac --name "deno-demo" --role contributor  --scopes /subscriptions/{SubscriptionID}/resourceGroups/deno-demo  --sdk-auth
```

It will generate a JSON like below,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/3.png?w=908)

<figcaption>

Generate Service Principal

</figcaption>

</figure>

You can copy and paste the JSON under the secret named "AZURE\_CREDENTIALS" ,

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/4.png?w=1020)

<figcaption>

Add Secret

</figcaption>

</figure>

Now we are good with everything, you can update some file on the repository and see the workflow getting triggered. You can monitor the deployment by navigating to the workflow.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/5.png?w=1024)

<figcaption>

Workflow Execution

</figcaption>

</figure>

Once everything is successful you can navigate to Azure portal and open the Web App endpoint to see if the app is running successfully.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/6.png?w=1024)

<figcaption>

WebApp with Deno API

</figcaption>

</figure>

You can see the app running successfully on Azure.

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2020/05/7.png?w=630)

<figcaption>

Deno Web API on azure.

</figcaption>

</figure>

#### Final words

I really enjoyed learning about the Deno project and created this simple app. I hope this article can be of value for anyone getting started with Deno with Azure.  I see it Deno gaining in popularity, yes. However, I do not see it replacing NodeJS and npm based on several factors. If you found this article useful, or if you have any questions please reach out me on [Twitter](https://twitter.com/kokkisajee). Cheers!
