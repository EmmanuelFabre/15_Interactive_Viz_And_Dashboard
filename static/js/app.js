function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = "/metadata" + "/" + sample;

  d3.json(url).then(function(metadata){
    console.log("buildMeta function works");
    console.log(metadata);


 // });  I think this goes lower
    // Use d3 to select the panel with id of `#sample-metadata`
    var sampMeta = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampMeta.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(metadata).forEach((key, value) => { 
      sampMeta.append("div").text(`${key}: ${value}`);

    });       
  });
}



function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = "/samples" + "/" + sample;        

  d3.json(url).then(function(data1){
    console.log("buildCharts function works");
    console.log(data1);

    // @TODO: Build a Bubble Chart using the sample data



    var trace = [{                    //we get the trace values per the readme
      x: data1.otu_ids,               
      y: data1.sample_values,         
      text: data1.otu_labels,
      mode: 'markers',
      marker: {
        size: data1.sample_values,
        color: data1.otu_ids
      }
    }]; 


    var layout = {
      title: "Bubble Chart"
    };
    //use .newPlot for the plot, since they can overwrite the old one
    Plotly.newPlot("bubble", trace, layout);   


    // @TODO: Build a Pie Chart               
    var layout1 = {
      title: "Pie Chart"
    };                                          
    var datax = [{                           
      values: data1.sample_values.slice(0,11),
      labels: data1.otu_ids.slice(0, 11),
      type: "pie"
      }];


    Plotly.newPlot("pie", datax, layout1);
  });
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
    console.log("This works.");
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log("option changed function works")
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


