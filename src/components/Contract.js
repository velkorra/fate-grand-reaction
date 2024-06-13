import '../styles/main.css'
import Master from './Master'
import Servant from './ServantCard'

const Contract = ({data}) => {
    return (
        <div className='contract'>
            <Servant data={data}></Servant>
            <Master data={data}></Master>
        </div>
    )
}

export default Contract