function choroplethmap(aggregatedData) {
  //console.log(aggregatedData)
  function generateMap(aggregatedData) {
    d3.select("#map").html("");
    d3.json("us_state.geojson").then(function (geojson) {
      // Create the SVG container
      const width = 500;
      const height = 400;
      const padding = { top: 0, right: 0, bottom: 0, left: 0 };
      const textbox = d3
        .select("body")
        .append("div")
        .attr("class", "textbox")
        .style("position", "absolute");

      function updateTextboxContent(stateName) {
        let content = "";

        if (stateName) {
          // Show information for the selected state
          const statePopulationEntry = aggregatedData.find(
            (item) => item.state === stateName
          );

          if (statePopulationEntry) {
            const statePopulation = statePopulationEntry.totalPopulation;
            content += `<strong>State:</strong> ${stateName}<br>`;
            content += `<strong>Population:</strong> ${statePopulation}`;
          } else {
            content += `<strong>State:</strong> ${stateName}<br>`;
            content += "<strong>Population:</strong> Data not available";
          }
        } else {
          // Show summary for all states
          const totalPopulation = d3.sum(
            aggregatedData,
            (d) => d.totalPopulation
          );
          content += "<strong>Summary of All States</strong><br>";
          content += `<strong>Total Population:</strong> ${totalPopulation}`;
        }

        // Update the content of the textbox
        textbox.html(content);
      }

      const svg = d3
        .select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

      // Create a projection for the map
      const projection = d3.geoAlbersUsa().fitSize([width, height], geojson);

      // Create a path generator
      const path = d3.geoPath().projection(projection);

      // Create a color scale for the choropleth map
      const colorScale = d3
        .scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(aggregatedData, (d) => d.totalPopulation)]);

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute");

      // Append the map shapes
      svg
        .selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", function (d) {
          const stateName = d.properties.NAME; // Access the state name using the specified property
          const statePopulationEntry = aggregatedData.find(
            (item) => item.state === stateName
          );

          if (statePopulationEntry) {
            return colorScale(statePopulationEntry.totalPopulation);
          } else {
            return "gray";
          }
        })
        .attr("stroke", "black") // Set the stroke color to black
        .attr("stroke-width", 0.5) // Set the stroke width to 2 pixels
        .on("mouseover", function (d) {
          const stateName = d.srcElement.__data__.properties.NAME;
          const statePopulationEntry = aggregatedData.find(
            (item) => item.state === stateName
          );

          // Get the mouse coordinates relative to the page
          const [mouseX, mouseY] = d3.pointer(event);
          //console.log(mouseX, mouseY)
          // Calculate the tooltip position relative to the page
          const tooltipX = 750; // Offset from the mouse cursor on the x-axis
          //console.log(tooltipX)
          const tooltipY = 80; // Offset from the mouse cursor on the y-axis
          //console.log(tooltipY)
          // Update the tooltip content
          let tooltipContent = `<strong>State:</strong> ${stateName}<br>`;

          if (statePopulationEntry) {
            const statePopulation = statePopulationEntry.totalPopulation;
            tooltipContent += `<strong>Population:</strong> ${statePopulation}`;
          } else {
            tooltipContent += "<strong>Population:</strong> Data not available";
          }

          // Show the tooltip and update its position and content
          tooltip
            .style("left", `${tooltipX}px`)
            .style("top", `${tooltipY}px`)
            .style("opacity", 1)
            .html(tooltipContent);
          // Add any other information you want to display in the tooltip
        })
        .on("mouseout", function () {
          // Hide the tooltip when the mouse leaves the state
          tooltip.style("opacity", 0);
        })
        .on("click", function (event, d) {
          const stateName = d.properties.NAME;
          //console.log(aggregatedData)
          const isSelected = d3.select(this).classed("selected");
          d3.selectAll("path").classed("selected", false);
          // Add the 'selected' class to the clicked bar
          if (!isSelected) {
            // Add the 'selected' class to the clicked bar if it was not already selected
            d3.select(this).classed("selected", true);
            // Trigger the custom event and pass the selected state
            const selectedState = aggregatedData.filter(
              (state) => state.state === stateName
            );
            //console.log(selectedState)
            triggerSelectEvent(selectedState[0]);
          } else {
            const selectedStates = aggregatedData.filter(
              (state) => state !== undefined
            );
            //console.log(selectedStates)
            triggerResetEvent(selectedStates);
          }

          //updateTextboxContent(stateName);
        });

      function triggerSelectEvent(selectedState) {
        const event = new CustomEvent("selectBarEventName", {
          detail: {
            selectedState: selectedState,
          },
        });
        document.dispatchEvent(event);
      }

      function triggerResetEvent(selectedState) {
        const event = new CustomEvent("resetBarEventName", {
          detail: {
            selectedState: selectedState,
          },
        });
        document.dispatchEvent(event);
      }

      const legendWidth = 300;
      const legendHeight = 20;

      // Create a zoom behavior
      const zoom = d3
        .zoom()
        .scaleExtent([1, 3]) // Set the zoom scale range
        .translateExtent([
          [-2 * width, -height],
          [2 * width, 2 * height],
        ])
        .on("zoom", zoomed);

      // Apply the zoom behavior to the SVG container
      svg.call(zoom);

      // Function to handle zoom event
      function zoomed(event) {
        // Get the current zoom transform
        const { transform } = event;

        // Update the map shapes and legend with the new zoom transform
        svg.attr("transform", transform);
      }

      // Create the legend SVG container
      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          `translate(${width - padding.right - legendWidth}, ${
            height - padding.bottom - legendHeight - 20
          })`
        );

      // Create a color scale for the legend
      const legendColorScale = d3
        .scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(aggregatedData, (d) => d.totalPopulation)]);

      // Create legend axis
      const legendAxis = d3
        .axisBottom()
        .scale(
          d3
            .scaleLinear()
            .domain([0, d3.max(aggregatedData, (d) => d.totalPopulation)])
            .range([0, legendWidth])
        )
        .ticks(5);

      // Append the gradient legend
      const legendGradient = legend
        .append("defs")
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", legendWidth)
        .attr("y2", 0);

      legendGradient
        .selectAll("stop")
        .data(d3.range(0, 1.01, 0.25))
        .enter()
        .append("stop")
        .attr("offset", (d) => `${d * 100}%`)
        .attr("stop-color", (d) =>
          legendColorScale(d3.max(aggregatedData, (d) => d.totalPopulation) * d)
        )
        .attr("stop-opacity", 1);

      legend
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legend-gradient)");

      legend
        .append("g")
        .attr("transform", `translate(0, ${legendHeight})`)
        .call(legendAxis);
    });
  }

  function selectedState(state) {
    //console.log(d3.selectAll("path")._groups[0])
    // Remove the "selected" class from all map paths
    d3.selectAll("path").classed("selected", false);
    const statePath = d3.selectAll("path").filter(function () {
      const pathData = d3.select(this).datum(); // Access the data of the current path
      return (
        pathData && pathData.properties && pathData.properties.NAME === state
      );
    });
    //console.log(statePath)
    // Add the "selected" class to the matching path element
    statePath.classed("selected", true);
  }

  function resetState() {
    //console.log(d3.selectAll("path")._groups[0])
    // Remove the "selected" class from all map paths
    d3.selectAll("path").classed("selected", false);
  }

  return {
    generateMap: generateMap,
    selectedState: selectedState,
    resetState: resetState,
  };
}
