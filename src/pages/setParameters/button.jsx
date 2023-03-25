import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export default function AButton(prop){
    return(
        <div>
            <Button onClick={()=>{prop.handleClick()}}>{prop.name}</Button>
        </div>
    )
}

