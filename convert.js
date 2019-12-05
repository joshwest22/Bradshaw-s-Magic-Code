if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch-polyfill');
}
let csv = require('d3-fetch').csv;


var d3 = require("d3");
var fs = require("fs");


//will not allow relative paths for this....
var csvPromise = csv("https://joshwest22.github.io/Final-Project-Addition/data/sc-est2018-alldata6 (1).csv")

csvPromise.then(function(input)
{
    console.log("input",input);
    var converted = convertData(input);
    console.log("converted",converted);
    
    
    var output = convertToCSV(converted,input.columns);
    console.log("output",output);
    fs.writeFile("converted.csv",output,function(err)
    {
        if(err)
        {
            console.log(err);             
        }
    })
})




var convertData = function(input)
{
  

//    //do i still need the states array or this getData function
//    states = [{name: "Alabama", total: [], male: [], female: [], both: [], white: [], black: [], asian: [], multiracial: []}] //each array within each state object will need to be summed; I will also have to copy paste the Alabama object for each state
//    pforEach(function(d)
//    {
//        if(d.AGE == 40) //this is the average age of CS professionals according to https://datausa.io/profile/cip/computer-science-6
//            {
//                totalAccumulator = 0;
//    
//                if(d.RACE < 7)
//                    {totalAccumulator += d.POPESTIMATE2017; console.log("states",states);console.log("totalAccumulator", totalAccumulator);}
//                if(d.SEX == 0)//both sexes
//                    {states[d.STATE-1].both.push(d.POPESTIMATE2017)} //console log what each of these are
//                if(d.SEX == 1)//male
//                    {states[d.STATE-1].male.push(d.POPESTIMATE2017)}
//                if(d.SEX == 2)//female
//                    {states[d.STATE-1].female.push(d.POPESTIMATE2017)}
//                if(d.RACE == 1)//white
//                    {states[d.STATE-1].white.push(d.POPESTIMATE2017)}
//                if(d.RACE == 2)//black
//                    {states[d.STATE-1].black.push(d.POPESTIMATE2017)}
//                if(d.RACE == 4)//asian
//                    {states[d.STATE-1].asian.push(d.POPESTIMATE2017)} 
//                if(d.RACE == 6) //two or more races;
//                    {states[d.STATE-1].multiracial.push(d.POPESTIMATE2017)} //nothing is being pushed. Maybe bc problem with asian if statement
//            }
//    })
//    console.log(states);
    
    return input.filter(function(d)
    {
        if(d.AGE == 40) //this is the average age of CS professionals according to https://datausa.io/profile/cip/computer-science-6
            {
                return true;
                
            }}).map(function(row) 
            {
                return row;
            })        
    
    
    
    
}

//the second paramter is optional and is used to indicate which columns will be placed in the CSV file.
//If no second paramter sis offered it assumes that csvData has a columns object that it can use,
var convertToCSV = function(csvData,columns)
{
    if(columns)
    {
    
    }
    else
    {
        columns = csvData.columns;    
    }
    
    var lines = csvData.map(function(row)
    {
        var fields = []
        
        columns.forEach(function(col)
        {
            fields.push(row[col]);    
        })
        return fields.join(",");
        
    })
    
    console.log("lines",lines);
    
    var fileData = columns.join(",")+"\n"+
    lines.join("\n");
    
    return fileData;
}