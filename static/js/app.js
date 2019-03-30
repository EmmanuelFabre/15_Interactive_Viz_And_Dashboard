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
      sampMeta.append(metadata).text(`${key}: ${value}`);

    });       //what goes after .append(  ????
  });
}
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = "/samples" + "/" + sample;        //should I add '+ sample' to url ln35?

  d3.json(url).then(function(data1){
    console.log("buildCharts function works");
    console.log(data1);

    // @TODO: Build a Bubble Chart using the sample data

    //++Does our url endpoint return data in a json object w/ the keys we want? 
      //++If so, no need for data manip, can just pass directly in the plot method.

    var trace = [{                    //+we get the trace values per the readme
      x: data1.otu_ids,               //+what is ' markers' mode?
      y: data1.sample_values,         //what values after size/colors?
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
    //use .newPlot do the new plot can overwrite the old one
    Plotly.newPlot("bubble", trace, layout);   


    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
                            //++per readme sample_values as values for pie chart
                            // otu_ids as labels
    var layout1 = {
      title: "Pie Chart"
    };                                          //++I think I have Pie Chart CORRECT..
    var datax = [{                           //++..EXCEPT for the hovertext
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

//QUESTIONS ?!?!?!?!?!
//should I keep '/<sample>' sample at the end of the url paths /samples and /metadata?
//what goes after .append(  around ln20 ?
//what values after size/colors in the trace?
//add or delte semicolon on ln26, 82, 104, 111? 
// "/samples" or "/samples/" ? "/metadata" or "/metadata/" ? or "/samples" + "/" + sample
//ln 76/77 changed datax.sample_values to data1.sample_values
