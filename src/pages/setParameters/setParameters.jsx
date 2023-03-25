import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './button';              // properties required: handleClick, name
import TextBox from './textbox';            // properties required: parameterName, changeParameterValue
import Dropdowns from './dropdowns';        // properties required: parameterName, changeParameterValue
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
const parameters = ['asset','trend','period','interval']

export default function SetParameters(){

    const [tradeParameters, setTradeParameters] = useState({
            asset: '',
            trend: '',
            period: '',
            interval: '',
    })

    const setValue = (parameter, value) => {
            const EditedTradeParameter = {...tradeParameters};
            EditedTradeParameter[parameter] = value
            setTradeParameters(EditedTradeParameter);
    }

    const handleClick = () => {
        console.log("CHecking submit button: ", tradeParameters);
    }
    
    return(
        <Form>
            <TextBox parameterName={'asset'} changeParameterValue={setValue}/>
            <Dropdowns parameterName={'trend'} values={['long','short']} changeParameterValue={setValue}/>
            <Dropdowns parameterName={'period'} values={[10,20,30]} changeParameterValue={setValue}/> 
            <Dropdowns parameterName={'interval'} values={[1,2,3]} changeParameterValue={setValue}/>
            <Button handleClick={handleClick} name={'Submit'}/>
        </Form>
            
        
    )
}