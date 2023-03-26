import * as d3 from 'd3'
import React, { useState, useEffect,useRef } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function DonutChart(prop){
        console.log(prop.current)
        const chartContainer = useRef(null)

        const createChart = () => {
            const data = [prop.max,prop.current]
            //Create a place to display the chart: SVG element
            const svg = d3.select(chartContainer.current)
                .append('svg')
                .attr('width',300)
                .attr('height',300)
            
            // Create the chart
                // Create the chart itself
                const pieChart = d3.pie()(data)

                // Create the settings
                    // Create the arc
                    const arc = d3.arc()
                        .innerRadius(100)
                        .outerRadius(150)
                
                    // Establish colors
                    const color = d3.scaleOrdinal()
                        .range(['#9C27B0', '#F44336', '#E91E63', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39']);

            // Putting the container, the chart, and the settings together
                // Put the chart into the container
                const g = svg.append('g')
                    .attr('transform', `translate(${svg.attr('width') / 2},${svg.attr('height') / 2})`)

                // Put the settings into the container
                const slices = g.selectAll('path')
                    .data(pieChart)
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', (d,i) => color(i)) 
        }

        const preventMultipleChartsFromAppearing = () => {
            if(chartContainer.current.children.length === 0){
                createChart()
            }
        }

        useEffect(()=>{
            preventMultipleChartsFromAppearing()
            
        },[])
    
        return(
            <div className='m-4'>
                <h5>{prop.title}</h5>
                <div ref={chartContainer}></div>
                
            </div>
        )
}