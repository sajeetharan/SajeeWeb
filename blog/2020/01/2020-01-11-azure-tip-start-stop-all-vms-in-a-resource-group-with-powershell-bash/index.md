---
title: "Azure Tip : Start/Stop all VMs in a Resource Group with PowerShell/Bash"
date: "2020-01-11"
categories: 
  - "azure"
  - "cloud"
  - "cloudshell"
tags: 
  - "azure-script"
  - "azurecli"
  - "bash"
  - "resources"
coverImage: "blog2.jpg"
---

There are cases if you want to start/stop all VMs in particular resource group in parallel within Azure. You can set it up with Automation using Scheduled actions. Other way which you can do by using PowerShell or Azure CLI

If you are using **PowerShell**, simply you can do

```
Get-AzVm -ResourceGroupName 'MyResourceGroup' | Start-AzVM
```

If you are using **Azure CLI**/**Bash**

```
az vm start --ids $(az vm list -g MyResourceGroup --query "[].id" -o tsv)
```

Where MyResourceGroup is the name of your ResourceGroup. Happy Azurifying!
