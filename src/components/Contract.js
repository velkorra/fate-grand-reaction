import '../styles/main.css'
import Master from './Master'
import Servant from './Servant'

function Contract(props) {
    return (
        <div className='contract'>
            <Servant data={props.data}></Servant>
            <Master data={props.data}></Master>
        </div>
    )
}

export default Contract