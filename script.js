document.addEventListener('DOMContentLoaded',function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
    var data = json.data
    
    //Years ('57 - '15)
    var anos = []
    json.data.forEach(function(val){
      anos.push(val[0])
    })
    
    //GDP
    var gdp = []
    json.data.forEach(function(val){
      gdp.push(val[1])
    })
  
    const w = 1000; //width
    const h = 600; //height
    const padding = 100 //padding
    
    //Scale for x-axis (years)
    const xScale = d3.scaleLinear()
                     .domain([d3.min(anos), d3.max(anos)]) //removed callback because anos array is one-dimensional
                     .range([0, (w - (padding))]);
                   // .range([0, w]);  //tried without padding, but numbers didn't show
                   // .range([padding, w-padding]); //FCC method (for scatterplots)
    
    //Scale for y-axis (GDP)
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(gdp)]) //removed callback because gdp array is one-dimensional
                     .range([(h - (2*padding)), 0])
                    //.range([h, 0])  //tried without padding, but numbers didn't show
                    //.range([h-padding, padding]) //FCC method (for scatterplots)
    
    //Set the X and Y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    
    const svg=d3.select("ul")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                
    
    svg.selectAll("rect")
                .data(gdp)
                .enter()
                .append("rect")
                .attr("width", 3)
                .attr("height", (d, i) => {return d/50})
                .attr("x", (d, i) => {return (i * 3) + padding})
                .attr("y", (d, i) => {return h - 2*padding+5 - d/50}) //Moved down 5px to accomodate y-axis. See below.
                .attr("class", "graph")
                .append("title")
                .text(d => "$" + d + " Billion")

             //move the X-axis
             svg.append("g")
                .attr("transform", "translate(" + (padding) + ", " + (h-(2*padding)+5) + ")") //Moved down 5px to accomodate y-axis. See below
                .call(xAxis);
    
             //move the Y-axis
             svg.append("g")
                .attr("transform", "translate(" + (padding) + ", " + (5) + ")") //Moved down 5px, so top number would not be cut off
                .call(yAxis);

  };

  });


