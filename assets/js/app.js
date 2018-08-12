// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/data.csv").then(function(censusData) {
    // if (err) throw err;
    // console.log(censusData);
    // Step 1: Parse Data/Cast as numbers
    // ==============================


    censusData.forEach(function(data) {   
        // console.log(data);
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;
        

    });


  // create scales
  var xTimeScale = d3.scaleLinear()
  .domain([d3.min(censusData, d => d["poverty"]) * 0.8,d3.max(censusData, d => d.poverty) * 1.2])
  .range([0,width]);
  
  
  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(censusData, d => d["obesity"]) * 0.8, d3.max(censusData, d => d.obesity) * 1.2])
  .range([height, 0]);

  var xAxis = d3.axisBottom(xTimeScale);
  var yAxis = d3.axisLeft(yLinearScale);


  // Step 4: Append Axes to the chart
  // ==============================

  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

  chartGroup.append("g")
  .call(yAxis);  

  // Step 5: Create Circles
  // ==============================

  var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xTimeScale(d.poverty))
  .attr("cy", d => yLinearScale(d.obesity))
  .attr("r", "10")
  .attr("fill", "pink")
  // .attr("stroke-width", "1")
  // .attr("stroke", "black");  

  // Step 6: Initialize tool tip
  // ==============================

  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`State: ${d.state}<hr>Poverty: ${d.poverty}; Obesity: 
     ${d.obesity}`);
  });  

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================

  circlesGroup.on("mouseover", function(d) {
    toolTip.show(d);
  })
  // Step 4: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function(d) {
      toolTip.hide(d);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Poverty");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Obesity");
  

});    