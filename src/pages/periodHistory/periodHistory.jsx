
import React, { useState, useEffect,useRef } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import LineChart from './lineChart';
import Table from './table';

function generateData(numEntries) {
    const data = [];
  
    for (let i = 0; i < numEntries; i++) {
      const startDate = new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      const endDate = new Date(startDate.getTime() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
      const startTime = Math.floor(Math.random() * 1440);
      const endTime = Math.floor(Math.random() * 1440);
      const entryPrice = Math.random() * 100;
      const exitPrice = entryPrice + Math.random() * 10;
      const trend = exitPrice > entryPrice ? 'Up' : 'Down';
      const pnl = (exitPrice - entryPrice) * 100;
      
      data.push({
        // date: startDate.toLocaleDateString(),
        // time: `${startTime.toString().padStart(2, '0')}:00 - ${endTime.toString().padStart(2, '0')}:00`,
        // price: `${entryPrice.toFixed(2)} - ${exitPrice.toFixed(2)}`,
        pnl: parseFloat(`${pnl < 0 ? '-': ''}${pnl.toFixed(2)}`),
        entryPrice: entryPrice.toFixed(2),
        exitPrice: exitPrice.toFixed(2),
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        startTime: `${startTime.toString().padStart(2, '0')}:00`,
        endTime: `${endTime.toString().padStart(2, '0')}:00`,
        trend,
      });
    }
    return data;
  }

export default function PeriodHistory(){
    /*
        1. Get data from the database
        2. Split data into two types
            - chart: pnl
            - table: performance data
    */
    const [trend, setTrend] = useState(null)
    const [tradePeriodPerformances,setTradePeriodPerformances] = useState(null)
    const navigate = useNavigate();

    const getTradePeriodPerformance = () => {
        const data = generateData(10)
        console.log("DATA: ",data)
        const allPnL = []
        data.forEach(period=>{
            allPnL.push(period.pnl)
        })
        setTrend([-50,10,30,-20,40,4,-5,1-20,-20,-20])
        setTradePeriodPerformances(data)
    }

    useEffect(()=>{
        getTradePeriodPerformance()
    },[])

    return(
        <div className="d-flex flex-column border border-danger" style={{width: '100vw', height: '100vh'}}>
            
            <LineChart data={trend}/> 
            <Button onClick={()=>{navigate('/tradeparameter')}}>Return to trade parameters</Button>
            <Table data={tradePeriodPerformances}/>
            
        </div>
    )
}