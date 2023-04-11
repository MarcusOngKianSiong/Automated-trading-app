import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SpecificPeriod(){
    
    const [theRows,setTheRows] = useState(null); 
    const [searchParams] = useSearchParams()
    
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
    
    const createTable = (freshData) => {
        // create the header row
        const listOfRows = []
        const data = []
        const header = <tr className="border border-danger">{data}</tr>
        // Create header
        for(const key in freshData[0]){
            data.push(<th className="border border-danger">{key}</th>)
        }
        listOfRows.push(header)
        // Create the trade period rows
        freshData.forEach(tradePeriod => {
                const data = []
                const sections =<tr className="border border-danger">{data}</tr>
                for(const key in tradePeriod){
                        data.push(<th className="border border-danger">{tradePeriod[key]}</th>)
                }
                listOfRows.push(sections)      
        })
        setTheRows(listOfRows)
    }
    
    const getData = () => {
            // const queries = searchParams.get('')
            const freshData = generateData(10)
            console.log('FreshData: ',freshData)
            createTable(freshData)
    }

    useEffect(()=>{
        getData()
            /*
                const data = getData()
                
            */
    },[])
    
    return(
        <div className="border border-danger">
            <table className="w-100">
                {theRows}
            </table>
            
        </div>
    )
}