/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#stockInput").node().value;
  console.log(stock);
 // Select the input value from the form
 var stock2 = d3.select("#stockInput2").node().value;
 console.log(stock2);

  // Build the plot with the new stock
  buildPlot(stock,stock2);
}

function buildPlot(stock,stock2) {
  var apiKey = "ZcsV4r54yd9QrCekpAzX";

  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=1950-10-01&end_date=2019-05-01&api_key=${apiKey}`;
  var url2 = `https://www.quandl.com/api/v3/datasets/WIKI/${stock2}.json?start_date=1950-10-01&end_date=2019-05-01&api_key=${apiKey}`;
console.log(url)
  d3.json(url).then(function(data) {

    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date;
    var dates = unpack(data.dataset.data, 0);
    var closingPrices = unpack(data.dataset.data, 1);

    d3.json(url2).then(function(data2){

    // Grab values from the response json object to build the plots
    

    var name2 = data2.dataset.name;
    var stock2 = data2.dataset.dataset_code;
    var startDate2 = data2.dataset.start_date;
    var endDate2 = data2.dataset.end_date;
    var dates2 = unpack(data2.dataset.data, 0);
    var closingPrices2 = unpack(data2.dataset.data, 1);


    var crashDates = {
      data: [
        {
          Date: "1962-03-01",
          Carrier: "American",
          Aircraft: "Boeing",
          Location: "Jamaica Bay, New York, US",
          Total_Deaths: "95"
        },
        {
          Date: "1963-12-08",
          Carrier: "Pan",
          Aircraft: "Boeing",
          Location: "Elkton, Maryland, US",
          Total_Deaths: "81"
        },
        {
          Date: "1964-11-23",
          Carrier: "TWA",
          Aircraft: "Boeing",
          Location: "Fiumicino, Italy",
          Total_Deaths: "50"
        },
        {
          Date: "1965-11-08",
          Carrier: "American",
          Aircraft: "Boeing",
          Location: "Hebron, Kentucky, US",
          Total_Deaths: "58"
        },
        {
          Date: "1968-09-28",
          Carrier: "Pan",
          Aircraft: "Douglas",
          Location: "Rivers State, Nigeria",
          Total_Deaths: "58"
        },
        {
          Date: "1968-12-12",
          Carrier: "Pan",
          Aircraft: "Boeing",
          Location: "Maiquetía, Venezuela",
          Total_Deaths: "51"
        },
        {
          Date: "1973-07-22",
          Carrier: "Pan",
          Aircraft: "Boeing",
          Location: "Papeete, Tahiti, French Polynesia",
          Total_Deaths: "78",
        },
        {
          Date: "1974-01-30",
          Carrier: "Pan",
          Aircraft: "Boeing",
          Location: "Pago Pago, American Samoa",
          Total_Deaths: "97"
        },
        {
          Date: "1974-04-22",
          Carrier: "Pan",
          Aircraft: "Boeing",
          Location: "Negara, Bali, Indonesia",
          Total_Deaths: "107"
        },
        {
          Date: "1974-12-01",
          Carrier: "TWA",
          Aircraft: "Boeing",
          Location: "Mt. Weather, Virginia, US",
          Total_Deaths: "92"
        },
        {
          Date: "1979-05-25",
          Carrier: "American",
          Aircraft: "McDonnell",
          Location: "Des Plaines, Illinois, U.S.",
          Total_Deaths: "273"
        },
        {
          Date: "1982-07-09",
          Carrier: "Pan",
          Aircraft: "Boeing",
          Location: "Kenner, Louisiana, US",
          Total_Deaths: "153"
        },
        {
          Date: "1989-07-19",
          Carrier: "United",
          Aircraft: "McDonnell",
          Location: "Sioux City, Iowa, US",
          Total_Deaths: "111"
        },
        {
          Date: "1995-12-20",
          Carrier: "American",
          Aircraft: "Boeing",
          Location: "Buga, Colombia",
          Total_Deaths: "159"
        },
        {
          Date: "1996-07-17",
          Carrier: "TWA",
          Aircraft: "Boeing",
          Location: "East Moriches, New York, U.S.",
          Total_Deaths: "230"
        },
        {
          Date: "2001-11-12",
          Carrier: "American",
          Aircraft: "Airbus",
          Location: "Belle Harbor, New York City, New York, U.S.",
          Total_Deaths: "265"
        }
      ]
    }

    const datesToPlot = [];

    crashDates.data.forEach(d => {
      let convert = new Date(d.Date);

      datesToPlot.push(convert);
    })

    console.log(datesToPlot);

    const carrierTool = [];

    crashDates.data.forEach(d => {
      let convert = new String(d.Carrier);

      carrierTool.push(convert);
    })
    console.log(carrierTool);
    const aircraftTool = [];

    crashDates.data.forEach(d => {
      let convert = new String(d.Aircraft);

      aircraftTool.push(convert);
    })
    const deaths = [];

    crashDates.data.forEach(d => {
      let convert = parseInt(d.Total_Deaths)

      deaths.push(convert);
    })
    const tooltip =[]
    crashDates.data.map(d => {
      tooltip.push(`Airline: ${d.Carrier} 
      Manufacturer: ${d.Aircraft} 
      Fatalities:${d.Total_Deaths}`)
    })

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: stock,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      } 
    };
    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: stock2,
      x: dates2,
      y: closingPrices2,
      line: {
        color: "#ffa500"
      }
    };
    var trace3 = {
      type: "scatter",
      mode: "markers",
      marker: {size:14},
      text: carrierTool,
      text: tooltip,
      name: "Crash",
      x: datesToPlot,
      y: deaths,
      line: {
        color: "#ff0000"
      }
    };
    var data = [trace1, trace2, trace3];

    var layout = {
      title: stock + " Vs " + stock2,
      xaxis: {
        autorange: true,
        range: ['2015-02-17', '2017-02-16'],
        rangeselector: {buttons: [
            {
              count: 1,
              label: '1m',
              step: 'month',
              stepmode: 'backward'
            },
            {
              count: 6,
              label: '6m',
              step: 'month',
              stepmode: 'backward'
            },
            {step: 'all'}
          ]},
        rangeslider: {range: ['2015-02-17', '2017-02-16']},
        type: 'date'
      },
      yaxis: {
        autorange: true,
        range: [86.8700008333, 138.870004167],
        type: 'linear'
      }
    };
    

    Plotly.newPlot("plot", data, layout);
  });
  });
}

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
