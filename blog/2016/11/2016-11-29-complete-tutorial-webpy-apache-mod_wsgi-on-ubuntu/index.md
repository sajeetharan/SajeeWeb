---
title: 'Complete Tutorial: Webpy + Apache + mod_wsgi on Ubuntu'
Date: '2016-11-29'
categories:
  - developer
tags:
  - apache
  - deployment
  - hosting
  - lighttpd
  - python
  - webpy
  - wsgi
utcDate: '2025-04-24T09:52:37.377Z'
---

There has been plenty of tutorials and blogs on how to configure webpy application with apache and mod\_wsgi, but none of them turned into successful one. After 2 days of research i have found the solution and decided to write a blog on the same. Hope it will be useful for others.  
  
In the future, I hope to update this post to also include a complete list of steps for getting setup with python’s webpy over lighttpd.  
  
  
**1\. Install web.py**  
  
**1.1. Install webpy with apt-get**  
  
sudo apt-get install python-webpy  
  
**1.2. Install webpy using easy\_install using python setuptools**   
  
1.2.1. Install python setuptools (easy\_install)  
  
\# 1.2.1.1. Using apt-get:  
  
sudo apt-get install python-setuptools  
\# 1.2.1.2. Manually retrieving easy\_install from the web using wget  
  
wget http://peak.telecommunity.com/dist/ez\_setup.py  
sudo python ez\_setup.py  
  
\# 1.2.2. Now get the web.py egg using python’s easy\_install  
\# This will put the python ‘web’ module in your python environment path  
  
sudo easy\_install web.py  
  
**1.3. Install webpy straight from git**  
  
\# Or, get webpy straight from git  
  
git clone git://github.com/webpy/webpy.git ln -s \`pwd\`/webpy/web .  
  
**2\. Write Your Web.py App**  
Choose a directory where you would like your web.py python application to live. If my username is ‘mek’ and I want to name my project ‘project’, I might make a directory /home/sajee/project.  
  
2.1. Make a directory for your web.py app to live  
\# Replace the word project in the path below with your desired project name  
  
mkdir ~/project  
cd ~/project # move into the project directory you have created  
  
2.2. Create your application file using web.py  
\# this will create our application file ~/project/main.py  
  
touch main.py  
2.3. Open your application with your favourite editor  
  
\# Substitute “emacs -nw” with an editor of your choice: vim, nano, etc  
  
emacs -nw main.py  
  
2.4. Paste the following in your app file and save  
  
```python
import os
import sys
import web

app_path = os.path.dirname(file)
sys.path.append(app_path)

if app_path: # Apache
os.chdir(app_path)
else: # CherryPy
app_path = os.getcwd()

urls = (
'/(.*)', 'hello'
)
  
**3\. Install Apache2**  
  
3.1. Install apache and wsgi dependencies  
  
sudo aptitude install apache2 apache2.2-common apache2-mpm-prefork apache2-utils libexpat1 ssl-cer  
\# I like to also install python-dev (optional) to make sure I have  
\# python’s latest support files  
  
sudo apt-get install python-dev  
3.2. Install apache mod\_wsgi and enable mod\_wsgi + mod\_rewrite  
  
sudo aptitude install libapache2-mod-wsgi  
sudo a2enmod mod-wsgi;sudo a2enmod rewrite  
Need help troubleshooting your apache/mod\_wsgi installation?  
  
**4\. Configure Apache2 With Your App**  
  
In the following steps, replace ‘project’ with the name of your project  
  
4.1. Make Apache Directories for your project  
  
sudo mkdir /var/www/project  
sudo mkdir /var/www/project/production  
sudo mkdir /var/www/project/logs  
sudo mkdir /var/www/project/public\_html  
4.2. Create Symlinks  
Creating symlinks to your project files is an important covention as, if there is a problem with one of your code bases, you can simply change your symlink to a stable codebase without having to modify your apache configuration.  
  
ln -s ~/project/ production  
ln -s ~/project/static public\_html # If you created the static directory in step 2.4. 
4.3. Replace you /etc/apache2/sites-available/default with:  
  
  

```
ServerAdmin admin@project.comDocumentRoot /var/www/project.com/public_html/ErrorLog /var/www/project.com/logs/error.logCustomLog /var/www/project.com/logs/access.log combinedWSGIScriptAlias / /var/www/project.com/production/main.pyAlias /static /var/www/project.com/public_htmlAddType text/html .pyWSGIDaemonProcess www-data threads=15WSGIProcessGroup www-dataOrder deny,allowAllow from allOptions +FollowSymLinksOptions -Indexes
```

  
  
4.4. Change the group and owner of files requiring write access to apache’s www-data  
Careful in this step to only change the group and owner of directories or files that will require write access.  
  
sudo chgrp -R www-data  
sudo chown -R www-data  
  
**5.Try to run!**  
  
sudo /etc/init.d/apache2 restart # Open your browser and visit the url: http://localhost or 127.0.01  
  
You will see Hello World on the browser.
