import React from 'react';
import { render, screen } from '@testing-library/react';
import * as d3 from 'd3'

export default class LineChart extends React.Component{
    constructor(prop){
        super(prop)

        

        this.chartContainer = React.createRef();
        this.containerHandle = null;                // Element that holds the rectangle
        this.chartWrapperHandle = null;                           // Element that holds the chart itself
    }

    determineChartWrapperWidthAndHeight = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        
    }

    createHandles = () => {
        this.containerHandle = d3.select(this.chartContainer.current)
        this.chartWrapper = this.containerHandle.append('svg')
        
    }

    render(){
        return <div ref={this.chartContainer}>smething</div>
    }
}