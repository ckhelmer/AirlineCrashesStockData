

// from data.js
var tableData = data;


// select tbody using ds
tbody = d3.select("tbody");


//use Object.entries to get key: value pairs from data and loop through to add to table
function displayData(tableData){ 
    tbody.text("")
    tableData.forEach(function(crashes){
    new_tr = tbody.append("tr")
    Object.entries(crashes).forEach(function([key, value]){
        new_td = new_tr.append("td").text(value)	
    })
})}

displayData(tableData)


var dateFilter = d3.select("#datetime")
var filterButton = d3.select("submit")

// filter by date
function changeHandler(){
    d3.event.preventDefault();
    console.log(dateFilter.property("value"));
    var new_table = tableData.filter(crashes => crashes.Date===dateFilter.property("value"))
displayData(new_table)
}

// event listener
dateFilter.on("change", changeHandler)
filterButton.on("click", changeHandler)

$(document).ready( function () {
    $('#crash-table').DataTable();
} );

