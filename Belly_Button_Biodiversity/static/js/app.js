function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var mdURLlink = "/metadata/" + sample;

  var panelMD = d3.select("#sample-metadata");

  panelMD.hmtl("");

    d3.json(mdURLlink).then(function(data) {

      Object.defineProperties(data).forEach(([key, value]) => {
        panelMD.append("h6").text(`${key}: ${value}`);
      })
    })
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var chartURL = "/samples/" + sample;

  d3.json(chartURL).then(function(data) {

    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers'
      text: data.otu_labels,
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
      }
    };

    var trace1 = [trace1];

    var layout = {
      height: 750
      width: 1500
    };

    Plotly.newPlot('bubble', trace1, layout);

    var data - [{
      values: data.sample_values.slice(0,10),
      labels: data.otu_ids.slice(0,10),
      hovertext: data.otu_labels(0,10),
      type: 'pie'
    }];

    var layout = {
      showLegend = true,
    };

    Plotly.newPlot('pie', data, layout);
  })   
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
