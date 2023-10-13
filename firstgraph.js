function firstgraph(callback){
  var defaultRadio = document.querySelector('input[name="year"]:checked');
  if (!defaultRadio) {
      // Set default to 2015
      defaultRadio = document.querySelector('input[value="2015"]');
      defaultRadio.checked = true;
  }
  
  // Load the default CSV file
  var defaultCsvFile = 'acs2015_county_data.csv';
  d3.csv(defaultCsvFile).then(function(data) {
      const incomeData = d3.group(data, d => d.State);
      const completeData = [];
  
      incomeData.forEach((value, key) => {
      const totalPopulation = d3.sum(value, d => +d.TotalPop);
      const avgIncome = d3.sum(value, d => +d.Income) / d3.count(value, d => +d.Income);
      const povertyRate = d3.sum(value, d => +d.Poverty) / d3.count(value, d => +d.Poverty);
      //gender population
      const Men = d3.sum(value, d => +d.Men) / d3.count(value, d => +d.Men);
      const Women = d3.sum(value, d => +d.Women) / d3.count(value, d => +d.Women);
      //population race distribution total of 100%
      const Hispanic = d3.sum(value, d => +d.Hispanic) / d3.count(value, d => +d.Hispanic);
      const White = d3.sum(value, d => +d.White) / d3.count(value, d => +d.White);
      const Black = d3.sum(value, d => +d.Black) / d3.count(value, d => +d.Black);
      const Native = d3.sum(value, d => +d.Native) / d3.count(value, d => +d.Native);
      const Asian = d3.sum(value, d => +d.Asian) / d3.count(value, d => +d.Asian);
      const Pacific = d3.sum(value, d => +d.Pacific) / d3.count(value, d => +d.Pacific);
      //employment distribution total of 100%
      const Professional = d3.sum(value, d => +d.Professional) / d3.count(value, d => +d.Professional);
      const Service = d3.sum(value, d => +d.Service) / d3.count(value, d => +d.Service);
      const Office = d3.sum(value, d => +d.Office) / d3.count(value, d => +d.Office);
      const Construction = d3.sum(value, d => +d.Construction) / d3.count(value, d => +d.Construction);
      const Production = d3.sum(value, d => +d.Production) / d3.count(value, d => +d.Production);
      //transportation to work distribution total of 100%
      const Drive = d3.sum(value, d => +d.Drive) / d3.count(value, d => +d.Drive);
      const Carpool = d3.sum(value, d => +d.Carpool) / d3.count(value, d => +d.Carpool);
      const Transit = d3.sum(value, d => +d.Transit) / d3.count(value, d => +d.Transit);
      const Walk = d3.sum(value, d => +d.Walk) / d3.count(value, d => +d.Walk);
      const OtherTransp = d3.sum(value, d => +d.OtherTransp) / d3.count(value, d => +d.OtherTransp);
      const WorkAtHome = d3.sum(value, d => +d.WorkAtHome) / d3.count(value, d => +d.WorkAtHome);
      //work sector distribution total of 100%
      const PrivateWork = d3.sum(value, d => +d.PrivateWork) / d3.count(value, d => +d.PrivateWork);
      const PublicWork = d3.sum(value, d => +d.PublicWork) / d3.count(value, d => +d.PublicWork);
      const SelfEmployed = d3.sum(value, d => +d.SelfEmployed) / d3.count(value, d => +d.SelfEmployed);
      const FamilyWork = d3.sum(value, d => +d.FamilyWork) / d3.count(value, d => +d.FamilyWork);
      const Unemployment = d3.sum(value, d => +d.Unemployment) / d3.count(value, d => +d.Unemployment);
      completeData.push({ state: key, avgIncome: avgIncome , totalPopulation: totalPopulation,povertyRate:povertyRate,Men: Men,Women: Women,
        Hispanic: Hispanic,White: White, Black: Black,Native: Native,Asian: Asian,Pacific:Pacific,
        Professional: Professional,Service: Service,Office: Office,Construction: Construction,Production: Production,
        Drive: Drive,Carpool: Carpool,Transit: Transit,Walk: Walk,OtherTransp: OtherTransp,
        WorkAtHome: WorkAtHome,PrivateWork: PrivateWork,PublicWork: PublicWork,SelfEmployed: SelfEmployed,FamilyWork: FamilyWork,Unemployment: Unemployment});
      });
      //console.log(completeData)
      var maxIncome = d3.max(completeData, d => d.avgIncome);
      setupSlider(0, maxIncome, updateGraph, completeData);
      // Sort the data in ascending order of averaged income
      completeData.sort(function(a, b) {
      return a.avgIncome - b.avgIncome;
      });
      clearGraph();
      // Process the data
      displayBarGraph(completeData);
      callback(completeData);
  });
    document.querySelectorAll('input[name="year"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
          var year = this.value;
          var csvFile;
          if (year === '2015') {
            csvFile = 'acs2015_county_data.csv';
          } else if (year === '2017') {
            csvFile = 'acs2017_county_data.csv';
          } 
          
          clearGraph();
          // Load the selected CSV file
          d3.csv(csvFile).then(function(data) {
            const incomeData = d3.group(data, d => d.State);
            const completeData = [];
        
            incomeData.forEach((value, key) => {
                const totalPopulation = d3.sum(value, d => +d.TotalPop);
                const avgIncome = d3.sum(value, d => +d.Income) / d3.count(value, d => +d.Income);
                const povertyRate = d3.sum(value, d => +d.Poverty) / d3.count(value, d => +d.Poverty);
                //gender population
                const Men = d3.sum(value, d => +d.Men) / d3.count(value, d => +d.Men);
                const Women = d3.sum(value, d => +d.Women) / d3.count(value, d => +d.Women);
                //population race distribution total of 100%
                const Hispanic = d3.sum(value, d => +d.Hispanic) / d3.count(value, d => +d.Hispanic);
                const White = d3.sum(value, d => +d.White) / d3.count(value, d => +d.White);
                const Black = d3.sum(value, d => +d.Black) / d3.count(value, d => +d.Black);
                const Native = d3.sum(value, d => +d.Native) / d3.count(value, d => +d.Native);
                const Asian = d3.sum(value, d => +d.Asian) / d3.count(value, d => +d.Asian);
                const Pacific = d3.sum(value, d => +d.Pacific) / d3.count(value, d => +d.Pacific);
                //employment distribution total of 100%
                const Professional = d3.sum(value, d => +d.Professional) / d3.count(value, d => +d.Professional);
                const Service = d3.sum(value, d => +d.Service) / d3.count(value, d => +d.Service);
                const Office = d3.sum(value, d => +d.Office) / d3.count(value, d => +d.Office);
                const Construction = d3.sum(value, d => +d.Construction) / d3.count(value, d => +d.Construction);
                const Production = d3.sum(value, d => +d.Production) / d3.count(value, d => +d.Production);
                //transportation to work distribution total of 100%
                const Drive = d3.sum(value, d => +d.Drive) / d3.count(value, d => +d.Drive);
                const Carpool = d3.sum(value, d => +d.Carpool) / d3.count(value, d => +d.Carpool);
                const Transit = d3.sum(value, d => +d.Transit) / d3.count(value, d => +d.Transit);
                const Walk = d3.sum(value, d => +d.Walk) / d3.count(value, d => +d.Walk);
                const OtherTransp = d3.sum(value, d => +d.OtherTransp) / d3.count(value, d => +d.OtherTransp);
                const WorkAtHome = d3.sum(value, d => +d.WorkAtHome) / d3.count(value, d => +d.WorkAtHome);
                //work sector distribution total of 100%
                const PrivateWork = d3.sum(value, d => +d.PrivateWork) / d3.count(value, d => +d.PrivateWork);
                const PublicWork = d3.sum(value, d => +d.PublicWork) / d3.count(value, d => +d.PublicWork);
                const SelfEmployed = d3.sum(value, d => +d.SelfEmployed) / d3.count(value, d => +d.SelfEmployed);
                const FamilyWork = d3.sum(value, d => +d.FamilyWork) / d3.count(value, d => +d.FamilyWork);
                const Unemployment = d3.sum(value, d => +d.Unemployment) / d3.count(value, d => +d.Unemployment);
                completeData.push({ state: key, avgIncome: avgIncome , totalPopulation: totalPopulation,povertyRate:povertyRate,Men: Men,Women: Women,
                  Hispanic: Hispanic,White: White, Black: Black,Native: Native,Asian: Asian,Pacific:Pacific,
                  Professional: Professional,Service: Service,Office: Office,Construction: Construction,Production: Production,
                  Drive: Drive,Carpool: Carpool,Transit: Transit,Walk: Walk,OtherTransp: OtherTransp,
                  WorkAtHome: WorkAtHome,PrivateWork: PrivateWork,PublicWork: PublicWork,SelfEmployed: SelfEmployed,FamilyWork: FamilyWork,Unemployment: Unemployment});
            });
            // Sort the data in ascending order of averaged income
            //console.log(completeData)
            var maxIncome = d3.max(completeData, d => d.avgIncome);
            setupSlider(0, maxIncome, updateGraph, completeData);
            var sortSelect = document.getElementById("sort-select");
            sortSelect.value = "Ascending";
            completeData.sort(function(a, b) {
            return a.avgIncome - b.avgIncome;
            });
            // Display the bar graph
            displayBarGraph(completeData);
            callback(completeData);
          });
        });
      });

    function setupSlider(minIncome, maxIncome, updateGraph, data){
        var sliderContainer = d3.select(".slider-holder");
        sliderContainer.selectAll("svg").remove();
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var sliderVals=[minIncome, maxIncome],
            width = 400,
            svg = d3.select(".slider-holder").append("svg")
              .attr('width', width+30)
              .attr('height', 50);
        
        var x = d3.scaleLinear()
            .domain([0, maxIncome])
            .range([0, width])
            .clamp(true);
            
        var xMin=x(0),
            xMax=x(10)
        
        var slider = svg.append("g")
            .attr("class", "slider")
            .attr("transform", "translate(5,20)");
        
        slider.append("line")
            .attr("class", "track")
            .attr("x1", 10+x.range()[0])
            .attr("x2", 10+x.range()[1])
        
        var selRange = slider.append("line")
            .attr("class", "sel-range")
            .attr("x1", 10+x(sliderVals[0]))
            .attr("x2", 10+x(sliderVals[1]))
        
        slider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(10,24)")
          .selectAll("text")
          .data(x.ticks(10))
          .enter().append("text")
            .attr("x", x)
            .attr("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("fill", x => color(x))
            .text(d => d);
        
        var handle = slider.selectAll("rect")
          .data([0, 1])
          .enter().append("rect", ".track-overlay")
            .attr("class", "handle")
            .attr("y", -8)
            .attr("x", d => x(sliderVals[d]))
            .attr("rx", 3)
            .attr("height", 16)
            .attr("width", 20)
            .call(
                d3.drag()
                  .on("start", startDrag)
                  .on("drag", drag)
                  .on("end", endDrag)
            );

            handle.call(
                d3.drag()
                  .on("start", startDrag)
                  .on("drag", drag)
                  .on("end", endDrag)
              );
        
        function startDrag(){
          d3.select(this).raise().classed("active", true);
        }
        
        function drag(event, d) {
            var x1 = d3.pointer(event)[0];
          
            if (x1 > xMax) {
              x1 = xMax;
            } else if (x1 < xMin) {
              x1 = xMin;
            }
          
            d3.select(this).attr("x", x1);
          
            var x2 = x(sliderVals[d === 0 ? 1 : 0]);
            selRange.attr("x1", x1).attr("x2", x2);
          }
          
          function endDrag(event, d) {
            var v = Math.round(x.invert(d3.pointer(event)[0]));
            var elem = d3.select(this);
          
            sliderVals[d] = v;
            var v1 = Math.min(sliderVals[0], sliderVals[1]);
            var v2 = Math.max(sliderVals[0], sliderVals[1]);
          
            elem.classed("active", false).attr("x", x(v));
          
            selRange.attr("x1", x(v1)).attr("x2", x(v2));
          
            updateGraph(v1, v2, data);
          }
        
    }

    function updateGraph(incomeMin, incomeMax,averagedIncomeData) {
        // Filter the data based on the selected income range
        var filteredData = averagedIncomeData.filter(function(d) {
          return d.avgIncome >= incomeMin && d.avgIncome <= incomeMax;
        });
        clearGraph();
        // Update the graph with the filtered data
        displayBarGraph(filteredData);
        callback(filteredData);
    }
    
      function clearGraph() {
        var graphContainer = d3.select("#barGraph");
        graphContainer.selectAll("*").remove();
        
      }
      
      // Function to display the bar graph
      function displayBarGraph(data) {
        var margin = { top: 20, right: 20, bottom: 60, left: 100 };
        var width = 700 - margin.left - margin.right;
        var height = 400; // Set the visible height
      
        // Create the outer container with fixed height and make it scrollable
        var container = d3.select("#barGraph")
          .style("height", height + "px")
          .style("overflow-y", "scroll");
      
        // Create the SVG element within the container
        var svg = container.append("svg")
          .attr("width", width)
          .attr("height", data.length * 40 + margin.bottom) // Include space for x-axis at the bottom
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
        var xScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.avgIncome)])
          .range([0, width - margin.left - margin.right]);
      
        var yScale = d3.scaleBand()
          .domain(data.map(d => d.state))
          .range([0, data.length * 40]) // Use the total height based on the data length
          .padding(0.2);
      
        var colorScale = d3.scaleOrdinal()
          .domain(data.map(d => d.state))
          .range(["#537780", "#6b9ac4", "#9eabb2", "#8c6d62", "#bfa48d", "#4d6f87", "#849eaf"]);
      
        var tooltip = d3.select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);
    
        var bars=svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", 0)
          .attr("y", d => yScale(d.state))
          .attr("width", d => xScale(d.avgIncome))
          .attr("height", yScale.bandwidth())
          .attr("fill", d => colorScale(d.state)) // Apply color based on the state
          .on("mouseover", function(d) {
            const [mouseX, mouseY] = d3.pointer(event);
            const tooltipX = 370; // Offset from the mouse cursor on the x-axis
            const tooltipY = 100 ; // Offset from the mouse cursor on the y-axis
            tooltip.transition()
              .duration(200)
              .style("opacity", 0.9);
            tooltip.html(d.srcElement.__data__.state +" Income: $" + d.srcElement.__data__.avgIncome.toFixed(2))
                .style("left", `${tooltipX}px`)
                .style("top", `${tooltipY}px`)
          })
          .on("mouseout", function(d) {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          })
          .on("click", function(d) {
            const isSelected = d3.select(this).classed("selected");
            //console.log(this)
            d3.selectAll("rect").classed("selected", false);
            // Add the 'selected' class to the clicked bar
            if (!isSelected) {
              // Add the 'selected' class to the clicked bar if it was not already selected
              d3.select(this).classed("selected", true);
              // Trigger the custom event and pass the selected state
              const selectedState = d.srcElement.__data__; // Modify this line to access the selected state data
              triggerCustomEvent(selectedState);
            }else{
              const selectedState = d3.selectAll("rect")
                .nodes()
                .map(node => node.__data__);
              const selectedStates = selectedState.filter(state => state !== undefined);
              triggerResetEvent(selectedStates);
            }
          });
        
          //custom event when selecting state
          function triggerCustomEvent(selectedState) {
            const event = new CustomEvent('customEventName', {
              detail: {
                selectedState: selectedState
              }
            });
            document.dispatchEvent(event);
          }

          function triggerResetEvent(selectedState) {
            const event = new CustomEvent('resetEventName', {
              detail: {
                selectedState: selectedState
              }
            });
            document.dispatchEvent(event);
          }
        
        // Append x-axis range indicator to the container
        container.append("svg")
          .attr("class", "x-axis-svg")
          .attr("width", width)
          .attr("height", margin.bottom + 2)
          .append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(" + margin.left + "," + margin.bottom / 2 + ")")
          .call(d3.axisBottom(xScale).tickValues(xScale.ticks().slice(1)));
      
        svg.append("g")
          .attr("class", "y-axis")
          .call(d3.axisLeft(yScale));
      
        d3.select(".x-axis-svg .x-axis")
          .selectAll("text")
          .style("fill", "black")
          .style("background-color", "white");
    
        function sortBars() {
            var sortSelect = document.getElementById("sort-select");
            var sortOrder = sortSelect.value;
            var sortMultiplier = sortOrder === "Ascending" ? 1 : -1;
          
            // Sort the data based on the sort key and multiplier
            data.sort(function(a, b) {
              return sortMultiplier * d3.ascending(a.avgIncome, b.avgIncome);
            });
          
            // Update the xScale domain with the sorted data
            xScale.domain([0, d3.max(data, d => d.avgIncome)]);
          
            // Update the yScale domain with the sorted data
            yScale.domain(data.map(d => d.state));
          
            // Update the bars with the new sorted data
            svg.selectAll("rect")
              .data(data)
              .transition()
              .duration(500)
              .attr("y", d => yScale(d.state))
              .attr("width", d => xScale(d.avgIncome))
              .attr("height", yScale.bandwidth());
          
            // Update the x-axis
            svg.select(".x-axis")
              .transition()
              .duration(500)
              .call(d3.axisBottom(xScale).tickValues(xScale.ticks().slice(1)));
          
            // Update the y-axis
            svg.select(".y-axis")
              .transition()
              .duration(500)
              .call(d3.axisLeft(yScale));
          
            // Reapply styles to the x-axis labels
            d3.select(".x-axis-svg .x-axis")
              .selectAll("text")
              .style("fill", "black")
              .style("background-color", "white");
          }
        document.getElementById("sort-select").addEventListener("change", sortBars);
      }
      /*
        .attr("x", 0)
        .attr("y", d => yScale(d.state))
        .attr("width", d => xScale(d.avgIncome))
        .attr("height", yScale.bandwidth())*/
      // Function to handle bar click
      function selectedState(state) {
        //console.log(d3.selectAll("rect"))
        // Remove the "selected" class from all map paths
        d3.selectAll("rect").classed("selected", false);
        const statePath = d3.selectAll("rect")
        .filter(function() {
          const pathData = d3.select(this).datum(); // Access the data of the current path
          //console.log(pathData)
          return pathData  && pathData.state === state && pathData !== 0 && pathData !== 1 && pathData !== undefined;
        });
      //console.log(statePath)
      // Add the "selected" class to the matching path element
      statePath.classed("selected", true);
      }
    
      function resetState() {
        //console.log(d3.selectAll("path")._groups[0])
        // Remove the "selected" class from all map paths
        d3.selectAll("rect").classed("selected", false);
      }

      return {
        selectedState: selectedState,
        resetState: resetState
      };
}
