import '../styles/main.css'

function Servant(props) {
  return (
    <div className='servant'>
        <p>{props.data.name}</p>
        <p>{props.data.class}</p>
    </div>
  )
}

export default Servant