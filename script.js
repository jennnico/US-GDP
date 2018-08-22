//D3 resources: https://www.youtube.com/watch?v=znBBk_M95QY
//https://www.youtube.com/watch?v=11QMX7vA22Y&t=785s
//timeParse resources: https://github.com/d3/d3-time#_interval
//https://stackoverflow.com/questions/32428122/what-scale-to-use-for-representing-years-only-on-x-axis-in-d3-js

document.addEventListener('DOMContentLoaded',function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
    var data = json.data
    
    //Modify data set so it shows the parsed time.
    var parseDate = d3.timeParse("%Y-%m-%d")
    var data2 = []
    data.forEach(function(val){
      data2.push([parseDate(val[0]), val[1]])
    })

    const w = 1000; //width
    const h = 600; //height
    const padding = 100 //padding
    
    //Scale for x-axis (years)
    const xScale = d3.scaleTime()
                     .domain([d3.min(data2, d => d[0]), d3.max(data2, d => d[0])]) 
                     .range([0, (w - (2*padding))]);

    //Scale for y-axis (GDP)
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data2, d => d[1])])
                     .range([(h - (2*padding)), 0])

    //Set the X and Y axes
    const xAxis = d3.axisBottom(xScale)
                   //  .ticks(d3.timeYear.every(0))
    const yAxis = d3.axisLeft(yScale)
    
    // Adds the svg canvas
    const svg=d3.select("a")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                
    //Add the rectangles (bars)
    svg.selectAll("rect")
                .data(data2)
                .enter()
                .append("rect")
                .attr("width", 3)
                .attr("height", (d, i) => {return d[1]/50})
                .attr("x", (d, i) => {return (i * 3) + padding})
                .attr("y", (d, i) => {return h - 2*padding+5 - d[1]/50})
                .attr("class", "bar")
                .append("title")
                .text(d => d[0] + "\n$" + d[1] + " Billion")

            //Add and move the X-axis
             svg.append("g")
                .attr("transform", "translate(" + (padding) + ", " + (h-(2*padding)+5) + ")")
                .call(xAxis)
                .attr("id", "x-axis");
    
             //Add and move the Y-axis
             svg.append("g")
                .attr("transform", "translate(" + (padding) + ", " + (5) + ")")
                .call(yAxis)
                .attr("id", "y-axis");

  };

  });


