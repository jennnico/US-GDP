document.addEventListener('DOMContentLoaded',function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
    var data = json.data
    
    var anos = []
    json.data.forEach(function(val){
      anos.push(val[0])
    })
    
    var gdp = []
    json.data.forEach(function(val){
      gdp.push(val[1])
    })
  
   
    console.log(gdp)

    // document.getElementsByClassName('years')[0].innerHTML=anos
    //document.getElementsByClassName('GDP')[0].innerHTML=gdp
   // document.getElementsByClassName('data')[0].innerHTML=data
    
    const w = 900;
    const h = 500;
    const padding = 30
    
    const xScale = d3.scaleLinear()
                     .domain([0, d3.max(gdp, (d)=>d)])
                     .range([padding, w-padding]);
    
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(anos, (d)=>d)])
                     .range([h-padding, padding])
    
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
                .attr("width", 2)
                .attr("height", (d, i) => {return d/50})
                .attr("x", (d, i) => {return i * 3})
                .attr("y", (d, i) => {return h - d/50})
                .attr("class", "graph")
                .append("title")
                .text(d => "$" + d + " Billion")
    
             svg.append("g")
                .attr("transform", "translate(0, " + (h-padding) + ")")
                .call(xAxis);
    /*
 d3.select("ul").selectAll("li")
   .data(gdp)
   .enter()
   .append("li")
   .attr("class", "bar")
   .style("height", (d)=>(d/50)+"px")
   .append("title")
   .text((d) => d)
    .call(xAxis)*/
  };

  });


