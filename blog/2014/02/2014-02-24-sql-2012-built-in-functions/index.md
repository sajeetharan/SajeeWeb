---
title: SQL 2012 Built In Functions
Date: '2014-02-24'
author: Sajeetharan
utcDate: '2025-04-24T09:52:37.341Z'
---

Well, I have decided to write on technologies finally. It was one of the good sessions from the SQL meetup held at Microsoft Sri Lanka this month. I learned some useful and simple SQL functions in SQL Server 2012.

SQL Server 2012 introduces many new rich built-in functions that offer more solutions to common T-SQL challenges. Some of the main functions which I am going to write about are:

**Conversion functions**

- PARSE (Transact-SQL)
- TRY_PARSE (Transact-SQL)
- TRY_CONVERT (Transact-SQL)

**Date and time functions**

- DATEFROMPARTS (Transact-SQL)
- DATETIMEFROMPARTS (Transact-SQL)
- DATETIME2FROMPARTS (Transact-SQL)
- SMALLDATETIMEFROMPARTS (Transact-SQL)
- DATETIMEOFFSETFROMPARTS (Transact-SQL)
- TIMEFROMPARTS (Transact-SQL)
- EOMONTH (Transact-SQL)

**Logical functions**

- CHOOSE (Transact-SQL)
- IIF (Transact-SQL)

**String functions**

- CONCAT (Transact-SQL)
- FORMAT (Transact-SQL)

In SQL 2008, to find a trend, we were using CTE functions. For example, to find the trend in 2008:

```sql
WITH CTE AS (  
    SELECT rownum = ROW_NUMBER() OVER (ORDER BY WorkOrderID), OrderQty 
    FROM [AdventureWorks].[Production].[WorkOrder]
)
SELECT CASE 
           WHEN CTE.OrderQty - PREVCTE.OrderQty > 0 THEN 'UP'
           WHEN CTE.OrderQty - PREVCTE.OrderQty <= 0 THEN 'NA'
       END AS Trend
FROM CTE 
LEFT OUTER JOIN CTE AS PREVCTE ON PREVCTE.rownum = CTE.rownum - 1
