// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const Dashboard = () => {
  // Removed unused state 'data'

  // Fetch data from the API on component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/transactions/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Add token for authentication
      }
    })
    .then(response => {
      drawChart(response.data); // Call function to draw the chart
    })
    .catch(error => {
      console.error("Error fetching data:", error); // Handle errors if any
    });
  }, []); // Empty array ensures this runs only once (on component mount)

  // Function to draw the bar chart using D3.js
  const drawChart = (data) => {
    const width = 500, height = 300;

    // Select the SVG element and set the width and height
    const svg = d3.select("#chart").attr("width", width).attr("height", height);

    // Set up scales for the x and y axes
    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    // Set domain for the x and y axes
    x.domain(data.map(d => d.name));  // X axis is based on the 'name' field
    y.domain([0, d3.max(data, d => d.amount)]); // Y axis is based on the 'amount' field

    // Append bars to the SVG based on the data
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name))   // X position of the bar
      .attr("width", x.bandwidth()) // Width of each bar
      .attr("y", d => y(d.amount))  // Y position of the bar
      .attr("height", d => height - y(d.amount)); // Height of the bar
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <svg id="chart"></svg> {/* SVG element to render the chart */}
    </div>
  );
};

export default Dashboard;
