import axios from "axios";
import { useEffect, useState } from "react";
import './styles/main.css'
import Contract from "./components/Contract";

function App() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState()
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/servants')
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) return (<p>loading</p>)
  if (error) return (<p>error:{error}</p>)

  return (
    <div className="main-window">
      {/* {console.log(data[0].name)} */}
      {/* {data.forEach(contract => {
        return <Contract data={contract}></Contract>
      })} */}
      <Contract data={data[0]}></Contract>
    </div>
  )

}

export default App;
