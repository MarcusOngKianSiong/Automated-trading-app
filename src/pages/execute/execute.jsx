import * as d3 from 'd3';
import React, { useState, useEffect,useRef } from "react";
import Button from 'react-bootstrap/Button';
import DonutChart from './donutChart';
import Table from './table';
const { io } = require("socket.io-client");
const socket = io('http://localhost:3000');

export default function Execute(){
    
    const [tradeData,setTradeData] = useState([]); 
    const [counter,setCounter] = useState(0)
    

    const createNewRow = (newData,backEndCounter) => {
            // console.log(newData)
            setCounter(backEndCounter)
            setTradeData(prevTradeData => [...prevTradeData, newData]);
    }

    useEffect(()=>{

        socket.on("connection",(socket)=>{
            console.log(socket.id);
        })

        socket.on("sending data",(data)=>{
            // console.log("----------")
            console.log("THIS: ",data)
            createNewRow(data.data,data.counter);
        })

    },[])

    useEffect(()=>{
        // console.log(tradeData)
    },[tradeData])
    
    return(
        <div>
            <DonutChart title={"Completion Rate"} max={10} current={counter}/>
            <Table tradeData={tradeData}/>
            {/* <DonutChart/> */}
            {/* <h1>{counter}</h1> */}
        </div>
    )
}