function raceBarChart(data) {
  d3.select("#genderBarchart").html("");

  const incomeData = d3.group(data, (d) => d.state);
  const completeData = [];

  const combinedData = Array.from(incomeData.values());

  const totalData = {
    Men: d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Men)),
    Women: d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Women)),
  };

  completeData.push(totalData);
  const width = 300;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 100 };
  const attributes = ["Men", "Women"];
  const svg = d3
    .select("#genderBarchart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale = d3
    .scaleBand()
    .domain(["Men", "Women"])
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(completeData, (d) => d3.max(Object.values(d)))])
    .range([height - margin.bottom, margin.top]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(["Men", "Women"])
    .range(["steelblue", "pink"]);

  const bars = svg
    .selectAll(".bar")
    .data(Object.entries(completeData[0]))
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d[0]))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - margin.bottom - yScale(d[1]))
    .attr("fill", (d) => colorScale(d[0]));

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", margin.left / 2)
    .attr("text-anchor", "middle");

  function updateBarChart(data) {
    data = attributes.map((attr) => data[attr]);
    bars.data(data);

    // Update the yScale domain based on the new data
    yScale.domain([0, d3.max(data)]);

    bars
      .transition()
      .duration(500)
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => height - margin.bottom - yScale(d));

    // Update the y-axis based on the updated yScale
    svg.select(".y-axis").transition().duration(500).call(d3.axisLeft(yScale));

    // Update the y-axis label dynamically
    svg.select(".y-axis-label");
  }

  function resetBarChart(data) {
    //console.log(data)
    const incomeData = d3.group(data, (d) => d.state);
    const completeData = [];

    const combinedData = Array.from(incomeData.values());

    const totalData = {
      Men: d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Men)),
      Women: d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Women)),
    };

    completeData.push(totalData);
    //console.log(completeData)
    bars.data(Object.entries(completeData[0]));
    yScale
      .domain([0, d3.max(completeData, (d) => d3.max(Object.values(d)))])
      .range([height - margin.bottom, margin.top]);
    bars
      .transition()
      .duration(500)
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => height - margin.bottom - yScale(d[1]));

    // Update the y-axis based on the updated yScale
    svg.select(".y-axis").transition().duration(500).call(d3.axisLeft(yScale));

    // Update the y-axis label dynamically
    svg.select(".y-axis-label");
  }

  return {
    updateBarChart: updateBarChart,
    resetBarChart: resetBarChart,
  };
}

function raceRadargraphdefault(data) {
  d3.select("#raceRadar").html("");
  const incomeData = d3.group(data, (d) => d.state);
  const completeData = [];

  const combinedData = Array.from(incomeData.values());

  const totalData = {
    Men: d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Men)),
    Women: d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Women)),
    //population race distribution total of 100%
    Hispanic:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Hispanic)) /
      d3.sum(combinedData, (d) => d.length),
    White:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.White)) /
      d3.sum(combinedData, (d) => d.length),
    Black:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Black)) /
      d3.sum(combinedData, (d) => d.length),
    Native:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Native)) /
      d3.sum(combinedData, (d) => d.length),
    Asian:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Asian)) /
      d3.sum(combinedData, (d) => d.length),
    Pacific:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Pacific)) /
      d3.sum(combinedData, (d) => d.length),
  };

  completeData.push(totalData);
  const attributes = [
    "Hispanic",
    "White",
    "Black",
    "Native",
    "Asian",
    "Pacific",
  ];
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height - 50) / 2;

  const svg = d3
    .select("#raceRadar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const angleScale = d3
    .scaleBand()
    .domain(attributes)
    .range([0, Math.PI * 2])
    .align(0); // Align the angles at the start of each sector

  const radiusScale = d3
    .scaleLinear()
    .domain([0, 100]) // Assuming values are in percentage
    .range([0, radius]);

  let radialScale = d3
    .scaleLinear()
    .domain([0, 100]) // Assuming values are in percentage
    .range([0, radius]);
  let ticks = [25, 50, 75, 100];

  svg
    .selectAll("circle")
    .data(ticks)
    .join((enter) =>
      enter
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", (d) => radialScale(d))
    );

  const line = d3
    .lineRadial()
    .angle((d, i) => angleScale(attributes[i]))
    .radius((d) => radiusScale(d));

  const colorScale = d3
    .scaleOrdinal()
    .domain(attributes)
    .range(d3.schemeCategory10);

  const radarLine = g
    .append("path")
    .datum(attributes.map((attr) => completeData[0][attr]))
    .attr("d", line)
    .attr("fill", colorScale(attributes[0])) // Use different colors for each attribute
    .attr("fill-opacity", 0.5)
    .attr("stroke", colorScale(attributes[0])) // Use different colors for each attribute
    .attr("stroke-width", 2);

  // Add border with labels for each angle
  const border = g.append("g");

  border
    .selectAll("line")
    .data(attributes)
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (d, i) => radius * Math.cos(angleScale(d) - Math.PI / 2))
    .attr("y2", (d, i) => radius * Math.sin(angleScale(d) - Math.PI / 2))
    .attr("stroke", "gray")
    .attr("stroke-width", 1);

  border
    .selectAll("text")
    .data(attributes)
    .enter()
    .append("text")
    .attr("x", (d, i) => radius * 1.14 * Math.cos(angleScale(d) - Math.PI / 2))
    .attr("y", (d, i) => radius * 1.14 * Math.sin(angleScale(d) - Math.PI / 2))
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle");

  border
    .selectAll(".range-label")
    .data([25, 50, 75]) // Customize the range values as per your requirement
    .enter()
    .append("text")
    .attr("class", "range-label")
    .attr("x", 0)
    .attr("y", (d) => -radiusScale(d))
    .text((d) => d + "%")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "gray")
    .attr("font-size", "10px");

  function updateRadarChart(data) {
    radarLine
      .datum(attributes.map((attr) => data[attr]))
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("fill", colorScale(0.5))
      .attr("fill-opacity", 0.5)
      .attr("stroke", colorScale(0.5))
      .attr("stroke-width", 2);
  }

  function resetRadarChart(data) {
    const incomeData = d3.group(data, (d) => d.state);
    const completeData = [];
    const combinedData = Array.from(incomeData.values());
    const totalData = {
      //population race distribution total of 100%
      Hispanic:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Hispanic)) /
        d3.sum(combinedData, (d) => d.length),
      White:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.White)) /
        d3.sum(combinedData, (d) => d.length),
      Black:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Black)) /
        d3.sum(combinedData, (d) => d.length),
      Native:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Native)) /
        d3.sum(combinedData, (d) => d.length),
      Asian:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Asian)) /
        d3.sum(combinedData, (d) => d.length),
      Pacific:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Pacific)) /
        d3.sum(combinedData, (d) => d.length),
    };
    completeData.push(totalData);
    radarLine
      .datum(attributes.map((attr) => completeData[0][attr]))
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("fill", colorScale(0.5))
      .attr("fill-opacity", 0.5)
      .attr("stroke", colorScale(0.5))
      .attr("stroke-width", 2);
  }

  return {
    updateRadarChart: updateRadarChart,
    resetRadarChart: resetRadarChart,
  };
}

function employmentRadargraphdefault(data) {
  d3.select("#employmentRadar").html("");
  const incomeData = d3.group(data, (d) => d.State);
  const completeData = [];

  const combinedData = Array.from(incomeData.values());
  const totalData = {
    //employment distribution total of 100%
    Professional:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Professional)) /
      d3.sum(combinedData, (d) => d.length),
    Service:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Service)) /
      d3.sum(combinedData, (d) => d.length),
    Office:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Office)) /
      d3.sum(combinedData, (d) => d.length),
    Construction:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Construction)) /
      d3.sum(combinedData, (d) => d.length),
    Production:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Production)) /
      d3.sum(combinedData, (d) => d.length),
  };

  completeData.push(totalData);
  const attributes = [
    "Professional",
    "Service",
    "Office",
    "Construction",
    "Production",
  ];
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height - 50) / 2;

  const svg = d3
    .select("#employmentRadar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const angleScale = d3
    .scaleBand()
    .domain(attributes)
    .range([0, Math.PI * 2])
    .align(0); // Align the angles at the start of each sector

  const radiusScale = d3
    .scaleLinear()
    .domain([0, 100]) // Assuming values are in percentage
    .range([0, radius]);

  let radialScale = d3
    .scaleLinear()
    .domain([0, 100]) // Assuming values are in percentage
    .range([0, radius]);
  let ticks = [25, 50, 75, 100];

  svg
    .selectAll("circle")
    .data(ticks)
    .join((enter) =>
      enter
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", (d) => radialScale(d))
    );

  const line = d3
    .lineRadial()
    .angle((d, i) => angleScale(attributes[i]))
    .radius((d) => radiusScale(d));

  const colorScale = d3
    .scaleOrdinal()
    .domain(attributes)
    .range(d3.schemeCategory10);

  const radarLine = g
    .append("path")
    .datum(attributes.map((attr) => completeData[0][attr]))
    .attr("d", line)
    .attr("fill", colorScale(attributes[0])) // Use different colors for each attribute
    .attr("fill-opacity", 0.5)
    .attr("stroke", colorScale(attributes[0])) // Use different colors for each attribute
    .attr("stroke-width", 2);

  // Add border with labels for each angle
  const border = g.append("g");

  border
    .selectAll("line")
    .data(attributes)
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (d, i) => radius * Math.cos(angleScale(d) - Math.PI / 2))
    .attr("y2", (d, i) => radius * Math.sin(angleScale(d) - Math.PI / 2))
    .attr("stroke", "gray")
    .attr("stroke-width", 1);

  border
    .selectAll("text")
    .data(attributes)
    .enter()
    .append("text")
    .attr("x", (d, i) => radius * 0.95 * Math.cos(angleScale(d) - Math.PI / 2))
    .attr("y", (d, i) => radius * 1 * Math.sin(angleScale(d) - Math.PI / 2))
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle");

  border
    .selectAll(".range-label")
    .data([25, 50, 75]) // Customize the range values as per your requirement
    .enter()
    .append("text")
    .attr("class", "range-label")
    .attr("x", 0)
    .attr("y", (d) => -radiusScale(d))
    .text((d) => d + "%")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "gray")
    .attr("font-size", "10px");

  function updateRadarChart(data) {
    radarLine
      .datum(attributes.map((attr) => data[attr]))
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("fill", colorScale(0.5))
      .attr("fill-opacity", 0.5)
      .attr("stroke", colorScale(0.5))
      .attr("stroke-width", 2);
  }

  function resetRadarChart(data) {
    const incomeData = d3.group(data, (d) => d.State);
    const completeData = [];
    const combinedData = Array.from(incomeData.values());
    const totalData = {
      //population race distribution total of 100%
      Professional:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Professional)) /
        d3.sum(combinedData, (d) => d.length),
      Service:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Service)) /
        d3.sum(combinedData, (d) => d.length),
      Office:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Office)) /
        d3.sum(combinedData, (d) => d.length),
      Construction:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Construction)) /
        d3.sum(combinedData, (d) => d.length),
      Production:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Production)) /
        d3.sum(combinedData, (d) => d.length),
    };
    completeData.push(totalData);
    radarLine
      .datum(attributes.map((attr) => completeData[0][attr]))
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("fill", colorScale(0.5))
      .attr("fill-opacity", 0.5)
      .attr("stroke", colorScale(0.5))
      .attr("stroke-width", 2);
  }

  return {
    updateRadarChart: updateRadarChart,
    resetRadarChart: resetRadarChart,
  };
}

function transportRadargraphdefault(data) {
  d3.select("#transportRadar").html("");
  const incomeData = d3.group(data, (d) => d.State);
  const completeData = [];

  const combinedData = Array.from(incomeData.values());

  const totalData = {
    //transportation to work distribution total of 100%
    Drive:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Drive)) /
      d3.sum(combinedData, (d) => d.length),
    Carpool:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Carpool)) /
      d3.sum(combinedData, (d) => d.length),
    Transit:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Transit)) /
      d3.sum(combinedData, (d) => d.length),
    Walk:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Walk)) /
      d3.sum(combinedData, (d) => d.length),
    OtherTransp:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.OtherTransp)) /
      d3.sum(combinedData, (d) => d.length),
    WorkAtHome:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.WorkAtHome)) /
      d3.sum(combinedData, (d) => d.length),
  };

  completeData.push(totalData);
  const attributes = [
    "Drive",
    "Carpool",
    "Transit",
    "Walk",
    "OtherTransp",
    "WorkAtHome",
  ];
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height - 50) / 2;

  const svg = d3
    .select("#transportRadar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const angleScale = d3
    .scaleBand()
    .domain(attributes)
    .range([0, Math.PI * 2])
    .align(0); // Align the angles at the start of each sector

  const radiusScale = d3
    .scaleLinear()
    .domain([0, 100]) // Assuming values are in percentage
    .range([0, radius]);

  let radialScale = d3
    .scaleLinear()
    .domain([0, 100]) // Assuming values are in percentage
    .range([0, radius]);
  let ticks = [25, 50, 75, 100];

  svg
    .selectAll("circle")
    .data(ticks)
    .join((enter) =>
      enter
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", (d) => radialScale(d))
    );

  const line = d3
    .lineRadial()
    .angle((d, i) => angleScale(attributes[i]))
    .radius((d) => radiusScale(d));

  const colorScale = d3
    .scaleOrdinal()
    .domain(attributes)
    .range(d3.schemeCategory10);

  const radarLine = g
    .append("path")
    .datum(attributes.map((attr) => completeData[0][attr]))
    .attr("d", line)
    .attr("fill", colorScale(attributes[0])) // Use different colors for each attribute
    .attr("fill-opacity", 0.5)
    .attr("stroke", colorScale(attributes[0])) // Use different colors for each attribute
    .attr("stroke-width", 2);

  // Add border with labels for each angle
  const border = g.append("g");

  border
    .selectAll("line")
    .data(attributes)
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (d, i) => radius * Math.cos(angleScale(d) - Math.PI / 2))
    .attr("y2", (d, i) => radius * Math.sin(angleScale(d) - Math.PI / 2))
    .attr("stroke", "gray")
    .attr("stroke-width", 1);

  border
    .selectAll("text")
    .data(attributes)
    .enter()
    .append("text")
    .attr("x", (d, i) => radius * 0.95 * Math.cos(angleScale(d) - Math.PI / 2))
    .attr("y", (d, i) => radius * 1.14 * Math.sin(angleScale(d) - Math.PI / 2))
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle");

  border
    .selectAll(".range-label")
    .data([25, 50, 75]) // Customize the range values as per your requirement
    .enter()
    .append("text")
    .attr("class", "range-label")
    .attr("x", 0)
    .attr("y", (d) => -radiusScale(d))
    .text((d) => d + "%")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "gray")
    .attr("font-size", "10px");

  function updateRadarChart(data) {
    radarLine
      .datum(attributes.map((attr) => data[attr]))
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("fill", colorScale(0.5))
      .attr("fill-opacity", 0.5)
      .attr("stroke", colorScale(0.5))
      .attr("stroke-width", 2);
  }

  function resetRadarChart(data) {
    const incomeData = d3.group(data, (d) => d.State);
    const completeData = [];
    const combinedData = Array.from(incomeData.values());
    const totalData = {
      //population race distribution total of 100%
      Drive:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Drive)) /
        d3.sum(combinedData, (d) => d.length),
      Carpool:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Carpool)) /
        d3.sum(combinedData, (d) => d.length),
      Transit:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Transit)) /
        d3.sum(combinedData, (d) => d.length),
      Walk:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Walk)) /
        d3.sum(combinedData, (d) => d.length),
      OtherTransp:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.OtherTransp)) /
        d3.sum(combinedData, (d) => d.length),
      WorkAtHome:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.WorkAtHome)) /
        d3.sum(combinedData, (d) => d.length),
    };
    completeData.push(totalData);
    radarLine
      .datum(attributes.map((attr) => completeData[0][attr]))
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("fill", colorScale(0.5))
      .attr("fill-opacity", 0.5)
      .attr("stroke", colorScale(0.5))
      .attr("stroke-width", 2);
  }

  return {
    updateRadarChart: updateRadarChart,
    resetRadarChart: resetRadarChart,
  };
}

function worksectorRadargraphdefault(data) {
  d3.select("#worksectorRadar").html("");
  const incomeData = d3.group(data, (d) => d.State);
  const completeData = [];

  const combinedData = Array.from(incomeData.values());

  const totalData = {
    //work sector distribution total of 100%
    PrivateWork:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.PrivateWork)) /
      d3.sum(combinedData, (d) => d.length),
    PublicWork:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.PublicWork)) /
      d3.sum(combinedData, (d) => d.length),
    SelfEmployed:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.SelfEmployed)) /
      d3.sum(combinedData, (d) => d.length),
    FamilyWork:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.FamilyWork)) /
      d3.sum(combinedData, (d) => d.length),
    Unemployment:
      d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Unemployment)) /
      d3.sum(combinedData, (d) => d.length),
  };

  completeData.push(totalData);
  //console.log(completeData[0])
  const attributes = [
    "PrivateWork",
    "PublicWork",
    "SelfEmployed",
    "FamilyWork",
    "Unemployment",
  ];
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height - 50) / 2;

  const svg = d3
    .select("#worksectorRadar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const angleScale = d3
    .scaleBand()
    .domain(attributes)
    .range([0, Math.PI * 2])
    .align(0); // Align the angles at the start of each sector

  const radiusScale = d3
    .scaleLinear()
    .domain([0, 100]) // Assuming values are in percentage
    .range([0, radius]);

  let radialScale = d3
    .scaleLinear()
    .domain([0, 100]) // Assuming values are in percentage
    .range([0, radius]);
  let ticks = [25, 50, 75, 100];

  svg
    .selectAll("circle")
    .data(ticks)
    .join((enter) =>
      enter
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", (d) => radialScale(d))
    );

  const line = d3
    .lineRadial()
    .angle((d, i) => angleScale(attributes[i]))
    .radius((d) => radiusScale(d));

  const colorScale = d3
    .scaleOrdinal()
    .domain(attributes)
    .range(d3.schemeCategory10);

  const radarLine = g
    .append("path")
    .datum(attributes.map((attr) => completeData[0][attr]))
    .attr("d", line)
    .attr("fill", colorScale(attributes[0])) // Use different colors for each attribute
    .attr("fill-opacity", 0.5)
    .attr("stroke", colorScale(attributes[0])) // Use different colors for each attribute
    .attr("stroke-width", 2);

  // Add border with labels for each angle
  const border = g.append("g");

  border
    .selectAll("line")
    .data(attributes)
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (d, i) => radius * Math.cos(angleScale(d) - Math.PI / 2))
    .attr("y2", (d, i) => radius * Math.sin(angleScale(d) - Math.PI / 2))
    .attr("stroke", "gray")
    .attr("stroke-width", 1);

  border
    .selectAll("text")
    .data(attributes)
    .enter()
    .append("text")
    .attr("x", (d, i) => radius * 0.8 * Math.cos(angleScale(d) - Math.PI / 2))
    .attr("y", (d, i) => radius * 1 * Math.sin(angleScale(d) - Math.PI / 2))
    .text((d) => d)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle");

  border
    .selectAll(".range-label")
    .data([25, 50, 75]) // Customize the range values as per your requirement
    .enter()
    .append("text")
    .attr("class", "range-label")
    .attr("x", 0)
    .attr("y", (d) => -radiusScale(d))
    .text((d) => d + "%")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "gray")
    .attr("font-size", "10px");

  function updateRadarChart(data) {
    radarLine
      .datum(attributes.map((attr) => data[attr]))
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("fill", colorScale(0.5))
      .attr("fill-opacity", 0.5)
      .attr("stroke", colorScale(0.5))
      .attr("stroke-width", 2);
  }

  function resetRadarChart(data) {
    const incomeData = d3.group(data, (d) => d.State);
    const completeData = [];
    const combinedData = Array.from(incomeData.values());
    const totalData = {
      //population race distribution total of 100%
      PrivateWork:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.PrivateWork)) /
        d3.sum(combinedData, (d) => d.length),
      PublicWork:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.PublicWork)) /
        d3.sum(combinedData, (d) => d.length),
      SelfEmployed:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.SelfEmployed)) /
        d3.sum(combinedData, (d) => d.length),
      FamilyWork:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.FamilyWork)) /
        d3.sum(combinedData, (d) => d.length),
      Unemployment:
        d3.sum(combinedData, (d) => d3.sum(d, (e) => +e.Unemployment)) /
        d3.sum(combinedData, (d) => d.length),
    };
    completeData.push(totalData);
    radarLine
      .datum(attributes.map((attr) => completeData[0][attr]))
      .transition()
      .duration(500)
      .attr("d", line)
      .attr("fill", colorScale(0.5))
      .attr("fill-opacity", 0.5)
      .attr("stroke", colorScale(0.5))
      .attr("stroke-width", 2);
  }

  return {
    updateRadarChart: updateRadarChart,
    resetRadarChart: resetRadarChart,
  };
}

/*
incomeData.forEach((value, key) => {
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
      const PrivateWork = d3.sum(value, d => +d.WorkAtHome) / d3.count(value, d => +d.WorkAtHome);
      const PublicWork = d3.sum(value, d => +d.WorkAtHome) / d3.count(value, d => +d.WorkAtHome);
      const SelfEmployed = d3.sum(value, d => +d.WorkAtHome) / d3.count(value, d => +d.WorkAtHome);
      const FamilyWork = d3.sum(value, d => +d.WorkAtHome) / d3.count(value, d => +d.WorkAtHome);
      const Unemployment = d3.sum(value, d => +d.WorkAtHome) / d3.count(value, d => +d.WorkAtHome);
      completeData.push({state: key,
        Men: Men,
        Women: Women,
        Hispanic: Hispanic,
        White: White,
        Black: Black,
        Native: Native,
        Asian: Asian,
        Pacific:Pacific
        Professional: Professional,
        Service: Service,
        Office: Office,
        Construction: Construction,
        Production: Production,
        Drive: Drive,
        Carpool: Carpool,
        Transit: Transit,
        Walk: Walk,
        OtherTransp: OtherTransp,
        WorkAtHome: WorkAtHome,
        PrivateWork: PrivateWork,
        PublicWork: PublicWork,
        SelfEmployed: SelfEmployed,
        FamilyWork: FamilyWork,
        Unemployment: Unemployment});
        
      });
*/
