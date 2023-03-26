import 'bootstrap/dist/css/bootstrap.min.css';



export default function Table(prop){

    // How will the table data come in?
    // Not all at once. 
    // First trade: entry price entry time entry date
    // middle trades: exit price exit time exit date pnl, entry price entry time entry date
    // final trade: exit price exit time exit date pnl
    
    // console.log("This: ",prop.tradeData)

    const convertDataToRows = () => {
        // console.log("converting data to rows...")
        const rows = []
        // console.log("Hello: ",prop.tradeData)
        prop.tradeData.forEach((data)=>{
            // console.log("THIS ONE: ",data)
            const row = <tr>
                <td className='border border-danger'>{data.startTime}</td>
                <td className='border border-danger'>{data.endTime}</td>
                <td className='border border-danger'>{data.startDate}</td>
                <td className='border border-danger'>{data.endDate}</td>
                <td className='border border-danger'>{data.entryPrice}</td>
                <td className='border border-danger'>{data.exitPrice}</td>
                <td className='border border-danger'>{data.PnL}</td>
            </tr>
            rows.push(row)
        })
        // console.log(rows)
        return rows
    }

    return(
        <table className='border border-danger'>
            <tbody>
                <tr className='border border-danger'>
                    <td className='border border-danger'>Entry Time</td>
                    <td className='border border-danger'>Exit Time</td>
                    <td className='border border-danger'>Entry Date</td>
                    <td className='border border-danger'>Exit Date</td>
                    <td className='border border-danger'>Entry Price</td>
                    <td className='border border-danger'>Exit Price</td>
                    <td className='border border-danger'>PnL</td>
                </tr>
             
                {convertDataToRows()}
            </tbody>
            
        </table>
    )
}