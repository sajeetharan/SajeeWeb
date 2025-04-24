---
title: How to change TimeZone in Azure App Service?
Date: '2019-11-12'
categories:
  - appservice
  - asp-net-core
  - c
  - visualstudio
tags:
  - azure
  - cloud
  - containers
  - linux
  - timezone
  - windows
coverImage: timezoneblog1.jpg
utcDate: '2025-04-24T09:52:37.610Z'
---

One of the frequent questions i get from partners is on how to set Timezone for an application running on Azure app service. It is too easy to change the timezone for an app service hosted in windows OS , but the same settings do not apply for an app service hosted in Linux or Web App running using a container.

#### **How to configure for App Service on Windows:**

If your app service plan runs on Windows, As a quick fix, in the configuration, just add a setting named “WEBSITE\_TIME\_ZONE” with the value you want:

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/igcbr.png?w=765)

<figcaption>

Timezone configuration on Web App

</figcaption>

</figure>

#### **How to configure for AppService on Linux:**

If your App Service Plan is Linux, you need to do it differently. You need to set **TZ** variable in **Application settings.**

Say if you want to set your timezone to Asia/Kolkata. you need to set the TZ variable value as

<figure>

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/5soqp.png?w=618)

<figcaption>

Timezone configuration on Linux Web App

</figcaption>

</figure>

**Timezone Values:**

The supported **timezone** values are listed here.

<table><tbody><tr><td>Value="Morocco Standard Time" For (GMT) Casablanca</td></tr><tr><td>Value="GMT Standard Time" For (GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</td></tr><tr><td>Value="Greenwich Standard Time" For (GMT) Monrovia, Reykjavik</td></tr><tr><td>Value="W. Europe Standard Time" For (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</td></tr><tr><td>Value="Central Europe Standard Time" For (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</td></tr><tr><td>Value="Romance Standard Time" For (GMT+01:00) Brussels, Copenhagen, Madrid, Paris</td></tr><tr><td>Value="Central European Standard Time" For (GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</td></tr><tr><td>Value="W. Central Africa Standard Time" For (GMT+01:00) West Central Africa</td></tr><tr><td>Value="Jordan Standard Time" For (GMT+02:00) Amman</td></tr><tr><td>Value="GTB Standard Time" For (GMT+02:00) Athens, Bucharest, Istanbul</td></tr><tr><td>Value="Middle East Standard Time" For (GMT+02:00) Beirut</td></tr><tr><td>Value="Egypt Standard Time" For (GMT+02:00) Cairo</td></tr><tr><td>Value="South Africa Standard Time" For (GMT+02:00) Harare, Pretoria</td></tr><tr><td>Value="FLE Standard Time" For (GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</td></tr><tr><td>Value="Israel Standard Time" For (GMT+02:00) Jerusalem</td></tr><tr><td>Value="E. Europe Standard Time" For (GMT+02:00) Minsk</td></tr><tr><td>Value="Namibia Standard Time" For (GMT+02:00) Windhoek</td></tr><tr><td>Value="Arabic Standard Time" For (GMT+03:00) Baghdad</td></tr><tr><td>Value="Arab Standard Time" For (GMT+03:00) Kuwait, Riyadh</td></tr><tr><td>Value="Russian Standard Time" For (GMT+03:00) Moscow, St. Petersburg, Volgograd</td></tr><tr><td>Value="E. Africa Standard Time" For (GMT+03:00) Nairobi</td></tr><tr><td>Value="Georgian Standard Time" For (GMT+03:00) Tbilisi</td></tr><tr><td>Value="Iran Standard Time" For (GMT+03:30) Tehran</td></tr><tr><td>Value="Arabian Standard Time" For (GMT+04:00) Abu Dhabi, Muscat</td></tr><tr><td>Value="Azerbaijan Standard Time" For (GMT+04:00) Baku</td></tr><tr><td>Value="Mauritius Standard Time" For (GMT+04:00) Port Louis</td></tr><tr><td>Value="Caucasus Standard Time" For (GMT+04:00) Yerevan</td></tr><tr><td>Value="Afghanistan Standard Time" For (GMT+04:30) Kabul</td></tr><tr><td>Value="Ekaterinburg Standard Time" For (GMT+05:00) Ekaterinburg</td></tr><tr><td>Value="Pakistan Standard Time" For (GMT+05:00) Islamabad, Karachi</td></tr><tr><td>Value="West Asia Standard Time" For (GMT+05:00) Tashkent</td></tr><tr><td>Value="India Standard Time" For (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</td></tr><tr><td>Value="Sri Lanka Standard Time" For (GMT+05:30) Sri Jayawardenepura</td></tr><tr><td>Value="Nepal Standard Time" For (GMT+05:45) Kathmandu</td></tr><tr><td>Value="N. Central Asia Standard Time" For (GMT+06:00) Almaty, Novosibirsk</td></tr><tr><td>Value="Central Asia Standard Time" For (GMT+06:00) Astana, Dhaka</td></tr><tr><td>Value="Myanmar Standard Time" For (GMT+06:30) Yangon (Rangoon)</td></tr><tr><td>Value="SE Asia Standard Time" For (GMT+07:00) Bangkok, Hanoi, Jakarta</td></tr><tr><td>Value="North Asia Standard Time" For (GMT+07:00) Krasnoyarsk</td></tr><tr><td>Value="China Standard Time" For (GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</td></tr><tr><td>Value="North Asia East Standard Time" For (GMT+08:00) Irkutsk, Ulaan Bataar</td></tr><tr><td>Value="Singapore Standard Time" For (GMT+08:00) Kuala Lumpur, Singapore</td></tr><tr><td>Value="W. Australia Standard Time" For (GMT+08:00) Perth</td></tr><tr><td>Value="Taipei Standard Time" For (GMT+08:00) Taipei</td></tr><tr><td>Value="Tokyo Standard Time" For (GMT+09:00) Osaka, Sapporo, Tokyo</td></tr><tr><td>Value="Korea Standard Time" For (GMT+09:00) Seoul</td></tr><tr><td>Value="Yakutsk Standard Time" For (GMT+09:00) Yakutsk</td></tr><tr><td>Value="Cen. Australia Standard Time" For (GMT+09:30) Adelaide</td></tr><tr><td>Value="AUS Central Standard Time" For (GMT+09:30) Darwin</td></tr><tr><td>Value="E. Australia Standard Time" For (GMT+10:00) Brisbane</td></tr><tr><td>Value="AUS Eastern Standard Time" For (GMT+10:00) Canberra, Melbourne, Sydney</td></tr><tr><td>Value="West Pacific Standard Time" For (GMT+10:00) Guam, Port Moresby</td></tr><tr><td>Value="Tasmania Standard Time" For (GMT+10:00) Hobart</td></tr><tr><td>Value="Vladivostok Standard Time" For (GMT+10:00) Vladivostok</td></tr><tr><td>Value="Central Pacific Standard Time" For (GMT+11:00) Magadan, Solomon Is., New Caledonia</td></tr><tr><td>Value="New Zealand Standard Time" For (GMT+12:00) Auckland, Wellington</td></tr><tr><td>Value="Fiji Standard Time" For (GMT+12:00) Fiji, Kamchatka, Marshall Is.</td></tr><tr><td>Value="Tonga Standard Time" For (GMT+13:00) Nuku'alofa</td></tr><tr><td>Value="Azores Standard Time" For (GMT-01:00) Azores</td></tr><tr><td>Value="Cape Verde Standard Time" For (GMT-01:00) Cape Verde Is.</td></tr><tr><td>Value="Mid-Atlantic Standard Time" For (GMT-02:00) Mid-Atlantic</td></tr><tr><td>Value="E. South America Standard Time" For (GMT-03:00) Brasilia</td></tr><tr><td>Value="Argentina Standard Time" For (GMT-03:00) Buenos Aires</td></tr><tr><td>Value="SA Eastern Standard Time" For (GMT-03:00) Georgetown</td></tr><tr><td>Value="Greenland Standard Time" For (GMT-03:00) Greenland</td></tr><tr><td>Value="Montevideo Standard Time" For (GMT-03:00) Montevideo</td></tr><tr><td>Value="Newfoundland Standard Time" For (GMT-03:30) Newfoundland</td></tr><tr><td>Value="Atlantic Standard Time" For (GMT-04:00) Atlantic Time (Canada)</td></tr><tr><td>Value="SA Western Standard Time" For (GMT-04:00) La Paz</td></tr><tr><td>Value="Central Brazilian Standard Time" For (GMT-04:00) Manaus</td></tr><tr><td>Value="Pacific SA Standard Time" For (GMT-04:00) Santiago</td></tr><tr><td>Value="Venezuela Standard Time" For (GMT-04:30) Caracas</td></tr><tr><td>Value="SA Pacific Standard Time" For (GMT-05:00) Bogota, Lima, Quito, Rio Branco</td></tr><tr><td>Value="Eastern Standard Time" For (GMT-05:00) Eastern Time (US &amp; Canada)</td></tr><tr><td>Value="US Eastern Standard Time" For (GMT-05:00) Indiana (East)</td></tr><tr><td>Value="Central America Standard Time" For (GMT-06:00) Central America</td></tr><tr><td>Value="Central Standard Time" For (GMT-06:00) Central Time (US &amp; Canada)</td></tr><tr><td>Value="Central Standard Time (Mexico)" For (GMT-06:00) Guadalajara, Mexico City,Monterrey</td></tr><tr><td>Value="Canada Central Standard Time" For (GMT-06:00) Saskatchewan</td></tr><tr><td>Value="US Mountain Standard Time" For (GMT-07:00) Arizona</td></tr><tr><td>Value="Mountain Standard Time (Mexico)" For (GMT-07:00) Chihuahua, La Paz, Mazatlan</td></tr><tr><td>Value="Mountain Standard Time" For (GMT-07:00) Mountain Time (US &amp; Canada)</td></tr><tr><td>Value="Pacific Standard Time" For (GMT-08:00) Pacific Time (US &amp; Canada)</td></tr><tr><td>Value="Pacific Standard Time (Mexico)" For (GMT-08:00) Tijuana, Baja California</td></tr><tr><td>Value="Alaskan Standard Time" For (GMT-09:00) Alaska</td></tr><tr><td>Value="Hawaiian Standard Time" For (GMT-10:00) Hawaii</td></tr><tr><td>Value="Samoa Standard Time" For (GMT-11:00) Midway Island, Samoa</td></tr><tr><td>Value="Dateline Standard Time" For (GMT-12:00) International Date Line West</td></tr></tbody></table>

To verify that whether offset is updated or not navigate to `Console` and execute `time` command

![](https://sajeetharan.wordpress.com/wp-content/uploads/2019/11/timezone.jpg?w=678)

Also, note that TZ codes are different from the Windows codes. Here's the reference database:

[https://en.wikipedia.org/wiki/List\_of\_tz\_database\_time\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

I hope it helps someone out there.
