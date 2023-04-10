

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import {useRef} from 'react'
import { useEffect, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LineChart(prop) {
  console.log("this: ",prop.data)
  const chartContainer = useRef();

  const pnlToCoordinates = (pnl) => {
      let counter = 0
      let coordinates = []
      pnl.forEach(element => {
          counter+=1
          const coordinate = {x: null, y: null}
          coordinate.x = counter;
          coordinate.y = element
          coordinates.push(coordinate)
      });
      return coordinates
  }


  useEffect(()=>{

    if (chartContainer.current.children.length === 0 && prop.data !== null){

        const data = prop.data;

        const width = chartContainer.current.offsetWidth;
        const height = chartContainer.current.offsetHeight;
        
        const actualDomElement = d3.select(chartContainer.current)
            .append('svg')
            .attr('width',width)
            .attr('height',height)
            
    
        const xScale = d3.scaleLinear()
            .domain([0,data.length])
            .range([0,width*0.90])
    
        const yScale = d3.scaleLinear()
            .domain([d3.max(data),d3.min(data)])
            .range([0,height*0.90])
        
        const xAxis = d3.axisBottom(xScale).ticks(5)
        const yAxis = d3.axisLeft(yScale).ticks(5)
    
        const x = actualDomElement.append('g')
          .attr('transform',`translate(${width*0.05},${height*0.95})`)
          .call(xAxis)
    
        const y = actualDomElement.append('g')
          .attr('transform',`translate(${width*0.05},${height*0.05})`)
          .call(yAxis)
    
        const coordinates = pnlToCoordinates(data);
    
        const line = d3.line()
            .x(d=>xScale(d.x))
            .y(d=>yScale(d.y))
    
        console.log(coordinates)
        console.log(line(coordinates))
    
        actualDomElement.append('path')
            .datum(coordinates)
            .attr('d',line)
            .attr("stroke",'black')
            .attr('stroke-width',2)
            .attr('fill','none')
    
      }
    
  },[prop.data])

  return (
    <div className="d-flex justify-content-center h-75">
        <div className=" border w-50 h-100">
            <div style={{width: '100%',height: '100%'}} ref={chartContainer}></div>
        </div>
    </div>
  );
}

export default LineChart;