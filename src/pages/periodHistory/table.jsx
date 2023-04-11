import { useEffect, useState } from "react"
import React from "react"
import {createSearchParams, useNavigate} from "react-router-dom"

function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
          ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
     }

export default function Table(prop){
    
    const [theRows,setTheRows] = useState(null); 
    const navigate = useNavigate();

    const openPeriodDetails = (entryDate, exitDate, entryTime, exitTime) => {
        const lala = { entryDate, exitDate, entryTime, exitTime }
        const query = encodeQueryData(lala)
        const searchParams = createSearchParams({ entryDate, exitDate, entryTime, exitTime });
        prop.linkChangeForPeriodHistoryTable()
        navigate({
                pathname: '/specificperiod',
                search: query,
              });
        }
        
    const createTable = () => {
            // create the header row
            const listOfRows = []
            const data = []
            const header = <tr>{data}</tr>
            // Create header
            for(const key in prop.data[0]){
                data.push(<th>{key}</th>)
            }
            listOfRows.push(header)
            // Create the trade period rows
            prop.data.forEach(tradePeriod => {
                    const data = []
                    const sections =<tr onClick={()=>{openPeriodDetails(tradePeriod.startDate,tradePeriod.endDate,tradePeriod.startTime,tradePeriod.endTime)}}>{data}</tr>
                    for(const key in tradePeriod){
                            data.push(<th>{tradePeriod[key]}</th>)
                    }
                    listOfRows.push(sections)      
            })
            setTheRows(listOfRows)
    }

    useEffect(()=>{
            if(prop.data !== null){
                    createTable()
            }
    },[prop.data])

    return(
        <table>
            {theRows}
        </table>
    )
}