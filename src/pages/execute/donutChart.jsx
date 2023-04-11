import * as d3 from 'd3'
import React, { useState, useEffect,useRef } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

// FIND A DATA DID FLOWED IN. FIND A WAY TO UPDATE THE CHART. 

const arc = d3.arc()
        .innerRadius(100)
        .outerRadius(150)

const color = d3.scaleOrdinal()
.range(['#8BC34A', '#F44336', '#9C27B0', '#E91E63', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#CDDC39']);

const changeChartPositionOfValues = (dimensions) => {
    // Determine values
    const variablesToWorkWith = {
      completionLevel: null,
      leftToComplete: null
    }
    
    variablesToWorkWith.completionLevel = dimensions[0].value;
    variablesToWorkWith.leftToComplete = dimensions[1].value;

    // Determine the degree for each of these variables
    const denominator = variablesToWorkWith.completionLevel + variablesToWorkWith.leftToComplete;
    const degrees = {
      completionLevel: null,
      leftToComplete: null
    }
    for(const key in variablesToWorkWith){
        const degree = variablesToWorkWith[key]/denominator * 360
        degrees[key] = degree
    }
    
    // Determine radian
    const radians = {
        completionLevel: null,
        leftToComplete: null
    }
    const pi = Math.PI;
    for(const key in degrees){
        const degree = degrees[key]
        const radian = degree * (pi/180);
        radians[key] = radian
    }

    // Determine startAngle and endAngle for both parties. 
    const startAndEndAngles = {
        completionLevel: {
            startAngle: null,
            endAngle: null
        },
        leftToComplete: {
            startAngle: null,
            endAngle: null
        }
    }
    for(const key in radians){
        
        if(key === "completionLevel"){
            startAndEndAngles[key].startAngle = 0
            startAndEndAngles[key].endAngle = radians[key]
        }

        if(key === "leftToComplete"){
            const startingAngle = startAndEndAngles["completionLevel"].endAngle
            startAndEndAngles[key].startAngle = startingAngle
            startAndEndAngles[key].endAngle = startingAngle + radians[key]
        }
    }
    
    // Change startAndEndAngles found in dimensions
    dimensions[0].startAngle = startAndEndAngles.completionLevel.startAngle;
    dimensions[0].endAngle = startAndEndAngles.completionLevel.endAngle;
    dimensions[1].startAngle = startAndEndAngles.leftToComplete.startAngle;
    dimensions[1].endAngle = startAndEndAngles.leftToComplete.endAngle;

    // console.log("values: ",variablesToWorkWith)
    // console.log("Degrees: ",degrees)
    // console.log("Radians: ",radians)
    // console.log("startAndEndAngles: ",startAndEndAngles)
    // console.log("EDITED original dimensions: ",dimensions);
    // console.log(radians.completionLevel+radians.leftToComplete)

    return dimensions
}

export default function DonutChart(prop){
        console.log(prop.current)
        // My goal is to attach the donut chart to the execute script. 
        // Everytime a new trade is made, the back-end will send data (counter, trade data) to the front-end's socket.
        // The front-end will run a function to store the data into two useStates (counter, tradeData)
        // DonutChart looks at the counter useState. 
        
        console.log("Donut: ",prop.current)
        const [chartData,setChartData] = useState([0,10]);
        const [handleChange, setHandleChange] = useState(null);
        const [nextPageButtons, setNextPageButtons] = useState(null);
        const navigate = useNavigate();
        const chartContainer = useRef(null);

        const createChart = () => {
            //const data = [chartData.max - chartData.current,chartData.current];
            //Create a place to display the chart: SVG element

            // Get the container
            const svg = d3.select(chartContainer.current)
                .append('svg')
                .attr('width',300)
                .attr('height',300)
            
            // Create the chart
                // Create the chart itself

                // let pieChart = d3.pie()(chartData);
                // console.log("WHat is going on????: ",pieChart)
                // const reOrder = changeChartPositionOfValues(pieChart)
                // pieChart = changeChartPositionOfValues(pieChart)
                // console.log("lalal: ",reOrder)

            // Putting the container, the chart, and the settings together
                // Put the chart into the container
                const g = svg.append('g')          
                    .attr('transform', `translate(${svg.attr('width') / 2},${svg.attr('height') / 2})`)     

                // Put the settings into the container

                // const slices = g.selectAll('path')
                //     .data(pieChart)
                //     .enter()
                //     .append('path')
                //     .attr('d', arc)
                //     .attr('fill', (d,i) => color(i)) 

                setHandleChange(g)
        }
        
        const updateProgress = () => {
            
            if(handleChange !== null){
                console.log("CHECKING DATA EVERYTIME CHART UPDATES: ",chartData)
                const dimensions = d3.pie()(chartData);
                const reorderDimensions = changeChartPositionOfValues(dimensions);
                console.log(reorderDimensions)
                const path = handleChange.selectAll('paths').data(reorderDimensions)
                path.enter().append("path")
                .attr('d',arc)
                .attr('fill',(d,i)=>color(i));
            }

        }
        
        const preventMultipleChartsFromAppearing = () => {
            if(chartContainer.current.children.length === 0){
                createChart();
                updateProgress()
            }
        }

        useEffect(()=>{
            preventMultipleChartsFromAppearing()
        },[])

        useEffect(()=>{
            updateProgress()
        },[handleChange])

        useEffect(()=>{
            if(prop.current!==0){
                    setChartData([prop.current,10-prop.current])
            }
            if(prop.current === 10){
                setNextPageButtons([<Button onClick={()=>{navigate('/setparameter')}}>Back to trade parameters</Button>,<Button onClick={()=>{navigate('/periodhistory')}}>View trade period history</Button>])
            }
        },[prop.current])

        useEffect(()=>{
            updateProgress()
            
            console.log("THIS THIS THIS: ",chartData)
        },[chartData])

        return(
            <div className='m-4'>
                <h5>{prop.title}</h5>
                <div ref={chartContainer}></div> 
                {nextPageButtons}
            </div>
        )
}

