import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Dropdowns(prop){

    

    const populate = () => {
        const selection = []
        prop.values.forEach(parameter=>{
            selection.push(<Dropdown.Item href="#/action-1" eventKey={parameter}>{parameter}</Dropdown.Item>)
        })
        return selection
    }

    return(
        <div>
            <Dropdown onSelect={(e)=>{prop.changeParameterValue(prop.parameterName,e)}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    {prop.parameterName}
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                    {populate()}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

}