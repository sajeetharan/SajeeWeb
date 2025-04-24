---
title: "Best practices in handling Azure Service Bus dead-letter messages"
date: "2020-04-22"
categories: 
  - "bestpractices"
  - "microsoft"
  - "servicebus"
tags: 
  - "azure"
coverImage: "as01.jpg"
---

**Overview :** 

Azure Service Bus is being used as one of the most reliable enterprise messaging services across different domains like health care, finance etc. Often, users do have uncertainties in handling the dead-letter messages. Before diving into the best practices, I would like to give you a quick introduction on dead-lettered messages.

## Azure Service Bus Dead-letter Queue

[Azure Service Bus](https://www.serverless360.com/azure-service-bus) queues and topic subscriptions provide a secondary sub-queue, called a dead-letter queue. The purpose of the dead-letter queue is to hold messages that cannot be delivered to any receiver, or messages that could not be processed. So, any message that resides in the dead-letter queue is called a dead-lettered message.

## Best practices in handling Azure Service Bus dead-letter message

Most of the time we could notice that the message fails due to the following reasons;

1. Dependent service not available
2. Faulty message
3. Process code issue

## Dependent service not available

This could be one of the foremost and time after time reasons where the services that reply on message delivery may go down for a short period. For instance, the Redis or SQL connection issues may often happen.

## Faulty Message

According to the business scenarios, you may configure the custom properties to you Azure Service Bus messages and validate with respect to the values that should contain in the custom/user defined properties.

If in case the message doesn’t have a mandatory parameter or some value is incorrect, then the message will end up in the dead-letter queue after the maxDeliveryCount is attained.

The failed delivery can also be caused by a few other reasons such as network failures, a deleted queue, a full queue, authentication failure, or a failure to deliver on time.

Here we can drill down the reasons into two ways:

1. System level dead-lettering
2. Application level dead-lettering

### Reasons for System level dead-lettering

- Header Size Exceeded
- Error on processing subscription rule
- Exceeding time to live value
- Exceeding maxDeliveryCount
- When Session id property is set to true (the default is false)

### Reasons for Application level dead-lettering

- Messages that cannot be properly processed due to any sort of system issue
- Messages that hold malformed payloads
- Messages that fail authentication when some message-level security scheme is used

In this second scenario, the best practice is to manually verify the dead-lettered messages (using Service Bus Explorer or [Serverless360](https://www.serverless360.com/azure-service-bus-monitoring-management)) to correct message data or sometimes to purge messages and clear the queue.

## Message process code issue

This is a very rare case given a good number of resources in the community to fetch the flawless code. The developer should keep all the scenarios in the head and handle all the exceptions.

In the first and third scenario, the best practice is to use a flawless code that should run and reprocess the dead-lettered messages, you can find the sample code below;

```
internal class Program
    {
        private static string connectionString = ConfigurationSettings.AppSettings["GroupAssetConnection"];
        private static string topicName = ConfigurationSettings.AppSettings["GroupAssetTopic"];
        private static string subscriptionName = ConfigurationSettings.AppSettings["GroupAssetSubscription"];
        private static string databaseEndPoint = ConfigurationSettings.AppSettings["DatabaseEndPoint"];
        private static string databaseKey = ConfigurationSettings.AppSettings["DatabaseKey"];
        private static string deadLetterQueuePath = "/$DeadLetterQueue";

        private static void Main(string[] args)
        {

            try
            {
                ReadDLQMessages(groupAssetSyncService, log);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
            finally
            {
                documentClient.Dispose();
            }
            Console.WriteLine("All message read successfully from Deadletter queue");
            Console.ReadLine();
        }

        public static void ReadDLQMessages(IGroupAssetSyncService groupSyncService, ILog log)
        {
            int counter = 1;
            SubscriptionClient subscriptionClient = SubscriptionClient.CreateFromConnectionString(connectionString, topicName, subscriptionName + deadLetterQueuePath);
            while (true)
            {
                BrokeredMessage bmessgage = subscriptionClient.Receive(TimeSpan.FromMilliseconds(500));
                if (bmessgage != null)
                {
                    string message = new StreamReader(bmessgage.GetBody<Stream>(), Encoding.UTF8).ReadToEnd();
                    syncService.UpdateDataAsync(message).GetAwaiter().GetResult();
                    Console.WriteLine($"{counter} message Received");
                    counter++;
                    bmessgage.Complete();
                }
                else
                {
                    break;
                }
            }

            subscriptionClient.Close();
        }
    }
```

## Myths to chunk out

Does the `SequenceNumber` of message added by Azure Service bus keeps on increasing on each failed attempt till it reaches `maxDeliveryCount`?

The sequence number can be trusted as a unique identifier since it is assigned by a central and neutral authority and not by clients. It also represents the true order of arrival and is more precise than a time stamp as an order criterion, because time stamps may not have a high enough resolution at extreme message rates and may be subject to (however minimal) clock skew in situations where the broker ownership transitions between nodes.

Setting maxDeliveryCount = 1, is that best practice to deal with poison messages so that consumer never attempt twice to process message once it failed?

It is not a best practice to set the maxDeliveryCount=1. Because if some network/connection issue occurs, the built-in retry will process and clear from the queue.

If you are reading messages in batch, a complete batch will re-process if an error occurred any of message.

## Conclusion

In this blog, we have seen a sneak peek of Azure dead-lettered queues and various reasons for dead-lettering of messages. Further, we discussed the best practices on handling the dead-lettered messages. Finally, we looked into the myths to chunk out while dealing with Azure Service Bus dead-lettered messages.

I hope you enjoyed reading this article. Happy Learning!

This article was contributed to my site by [Nadeem Ahamed](https://www.linkedin.com/in/nadeem-ahamed-r/) and you can read more of his articles from [here](https://www.serverless360.com/blog/author/nadeem).
