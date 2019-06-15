// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 20
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var chart = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("transform", `translate(0, ${margin.top})`);

//Append a div to the body to create tooltips
var toolTip = d3.select("body").append("div")
					.attr("class", "tooltip")
					.style("opacity", 0);


var chosenXAxis='Aircraft'
var chosenYAxis='TotalDeaths'
// Import Data

// Step 1: Parse Data/Cast as numbers
// ==============================

d3.csv("assets/data/data.csv").then(function(Crash) {

   // Step 1: Create scale functions
    // ==============================
    var xBandScale = d3.scaleBand()
   
//  .domain(Crash.map(d => d.Aircraft))
 .range([0, width])
 .padding(0.1);
//  console.log(xBandScale);
 
 var yLinearScale = d3.scaleLinear()
 .domain([0, d3.max(Crash, d => d.TotalDeaths)])
 .range([height, 0]);


 var bottomAxis = d3.axisBottom(xBandScale);
 var leftAxis = d3.axisLeft(yLinearScale);

 
    var yMin;
    var yMax;
     
	function plotcircleandaxis(chosenXAxis,chosenYAxis) {
		chart.selectAll("svg g").remove();
		
	 
		yMin = d3.min(Crash, function (data){
      
		  return +data[chosenYAxis] * 0.95;
		});
		yMax = d3.max(Crash, function (data){
		  return +data[chosenYAxis] * 1.05;
    });
    xBandScale.domain(Crash.map(d => d.Aircraft));
    yLinearScale.domain([yMin, yMax]);

    console.log(chosenYAxis)

chart.append("g")
.attr('transform', `translate(80, 0)`)
.selectAll("circle")
.data(Crash)
.enter()
.append("circle")
.attr("cx", function(data, index) {
    return xBandScale(data[chosenXAxis])
})
.attr("cy", function(data, index) {
    return yLinearScale(data[chosenYAxis])
})
.attr("r", "15")
.attr("fill", "lightblue")

// display tooltip on click
.on("mouseenter", function(data) {
    console.log(chosenXAxis);
    toolTip.transition()
        .duration(200)
        .style('opacity',.9)
    toolTip.html('<ul class="info"><li>Carrier: '+data.Carrier+'</li><li>'+chosenXAxis+' : '+data[chosenXAxis]+'</li><li>'+chosenYAxis+' : '+data[chosenYAxis]+'</li></ul>')
        .style('left',(d3.event.pageX+5)+'px')
        .style('top',(d3.event.pageY-28)+'px')
})
// hide tooltip on mouseout
.on("mouseout", function(data, index) {
    toolTip.transition()
        .duration(500)
        .style('opacity',0)
});

// Appending a label to each data point
chart
.append("g")
.attr('transform', `translate(80, 0)`)
.append("text")
.style("text-anchor", "middle")
.style("font-size", "12px")
.selectAll("tspan")
.data(Crash)
.enter()
.append("tspan")
    .attr("x", function(data) {
        return xBandScale(data[chosenXAxis] - 0);
    })
    .attr("y", function(data) {
        return yLinearScale(data[chosenYAxis]- 0.2);
    })
    .text(function(data) {
        return data.abbr
    });
// Append an SVG group for the xaxis, then display x-axis 
chart
.append("g")
.attr('transform', `translate(80, ${height})`)
.call(bottomAxis);

// Append a group for y-axis, then display it
chart
.append("g")
.attr('transform', `translate(80, 0)`)
.call(leftAxis);
	// Append y-axis label
  chart
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0-margin.left + 50)
  .attr("x", 0 - height/2)
  .attr("dy","1em")
  .attr("class", "axis-text")
  .attr("value","TotalDeaths")
  .text("Total Death")
// Append x-axis labels
chart
.append("text")
.attr(
    "transform",
    "translate(" + width / 2 + " ," + (height + margin.top + 40) + ")"
)
.attr("class", "axis-text")
.attr("value","Xaircraft")
.text("Air craft");
chart
.append("text")
.attr(
    "transform",
    "translate(" + width / 2 + " ," + (height + margin.top + 25) + ")"
)
.attr("class", "axis-text")
.attr("value","Xcarrier")
.text("Carrier ");	
  // updateToolTip function above csv import
		// var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

		// x axis labels event listener
  chart.selectAll(".axis-text")
  .on("click", function() {
    // get value of selection
    value=d3.select(this).attr("value");
    console.log(value)

    if (value.slice(0,1)=="X"){
      if (value.slice(1,20) !== chosenXAxis) {
      // replaces chosenXAxis with value
          chosenXAxis = value.slice(1,20);
          plotcircleandaxis(chosenXAxis,chosenYAxis)
      }
    }else{
      if (value.slice(1,20) !== chosenYAxis) {
      // replaces chosenXAxis with value
          chosenXAxis = value.slice(1,20);
          plotcircleandaxis(chosenXAxis,chosenYAxis)
      }		  
    }
});		
      
}

plotcircleandaxis(chosenXAxis,chosenYAxis)
});