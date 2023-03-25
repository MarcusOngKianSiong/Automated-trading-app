import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

export default function TextBox(prop){
    return(
            
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>{prop.parameterName}</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{prop.changeParameterValue(prop.parameterName,e.target.value)}}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                
    )
}