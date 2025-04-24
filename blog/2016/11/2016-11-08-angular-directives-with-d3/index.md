---
title: Angular Directives with D3
Date: '2016-11-08'
categories:
  - developer
tags:
  - angularjs
  - big-data
  - d3js
  - data
  - decomposition
  - directive
  - directiveforece
  - html
  - node
  - sunburst
  - visualization
utcDate: '2025-04-24T09:52:37.370Z'
---

It's been exactly 2 years since i started to learn Angular and it's sad that i dint write even a single blog on the same. Finally decided to start a series on the same topic. AngularJS is a JavaScript MVC Framework that integrates two-way data binding, web services, and build web components. There are enough number of blogs and tutorials to follow on the same.

The current product which i am working is a data visualization tool which is built on AngularJS  and has many visualization  been integrated with [D3.js](https://d3js.org/).

In this blog, will be describing how to build a directive using d3.js and angular.

**Directive** is very powerful feature of AngularJS. It easily wired up with controller, html and do the DOM manipulations.

**Building a Decomposition Force directed d3 directive:**

```
 App.directive('forceGraph', function() {  
   return {  
     restrict: 'EA',  
     transclude: true,  
     scope: {  
       chartData: '='  
     },  
     controller: 'hierarchySummaryCtrl',  
     link: function(scope, elem, attrs) {  
       var svg;  
       elem.bind("onmouseover", function(event) {  
         scope.svg = svg;  
         console.log("hierarchy svg", scope.svg);  
         scope.$apply();  
       });  
       scope.$watch('chartData', function(newValue, oldValue) {  
         if (newValue) {  
           scope.draw(newValue.data,newValue.id);  
         }  
       });  
       scope.draw = function(rootData,divID) {  
         var width = 400,  
           height = 320,  
           root;  
         var force = d3.layout.force()  
           .linkDistance(80)  
           .charge(-120)  
           .gravity(.05)  
           .size([width, height])  
           .on("tick", tick);  
         var divid = "#" + divID;  
         d3.select(divid).selectAll("*").remove();  
         svg = d3.select(divid)  
           .append("svg").attr("viewBox", "0 0 400 400")  
           .attr("width", '100%')  
           .attr("height", '100%');  
         var link = svg.selectAll(".link"),  
           node = svg.selectAll(".node");  
         root = rootData;  
         update();  
         console.log(svg);  
         scope.setSvg(svg[0][0].innerHTML);        
         function update() {  
           console.log(nodes)  
           var nodes = flatten(root),           
           links = d3.layout.tree().links(nodes);          
           var nodes = flatten(rootData),           
           links = d3.layout.tree().links(nodes);             
           force.nodes(nodes)  
             .links(links)  
             .start();  
           // Update links.  
           link = link.data(links, function(d) {  
             return d.target.id;  
           });  
           link.exit().remove();  
           link.enter().insert("line", ".node")  
             .attr("class", "link");  
           // Update nodes.  
           node = node.data(nodes, function(d) {  
             return d.id;  
           });  
           node.exit().remove();  
           var nodeEnter = node.enter().append("g")  
             .attr("class", "node")  
             .on("click", click)  
             .call(force.drag);  
           nodeEnter.append("circle")  
             .attr("r", function(d) {  
               return Math.sqrt(d.size) / 5 || 4.5;  
             });  
           nodeEnter.append("text")  
             .attr("dy", ".25em")  
             .text(function(d) {  
               return d.name + ", Count: " + d.size;  
             });  
           node.select("circle")  
             .style("fill", color);  
         }  
         function tick() {  
           link.attr("x1", function(d) {  
               return d.source.x;  
             })  
             .attr("y1", function(d) {  
               return d.source.y;  
             })  
             .attr("x2", function(d) {  
               return d.target.x;  
             })  
             .attr("y2", function(d) {  
               return d.target.y;  
             });  
           node.attr("transform", function(d) {  
             return "translate(" + d.x + "," + d.y + ")";  
           });  
         }  
         function color(d) {  
           return d._children ? "#FFEB3B" // collapsed package  
             :  
             d.children ? "#F44336" // expanded package  
             :  
             "#D32F2F"; // leaf node  
         }  
         // Toggle children on click.  
         function click(d) {  
           if (d3.event.defaultPrevented) return; // ignore drag  
           if (d.children) {  
             d._children = d.children;  
             d.children = null;  
           } else {  
             d.children = d._children;  
             d._children = null;  
           }  
           update();  
         }  
         // Returns a list of all nodes under the root.  
         function flatten(root) {  
           var nodes = [],  
             i = 0;  
           function recurse(node) {  
             if (node.children) node.children.forEach(recurse);  
             if (!node.id) node.id = ++i;  
             nodes.push(node);  
           }  
           recurse(root);  
           return nodes;  
         }  
       };  
     }  
   };  
 });  
```

My Repository With the [sample](https://github.com/sajeetharan/d3AngularDirectives)
