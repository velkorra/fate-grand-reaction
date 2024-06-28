import axios from "axios";
import { FC, useEffect, useState } from "react";
import './styles/main.css'
// import Contract from "./components/Contract";
import ServantCard from "./components/ServantCard";
import { Servant } from "./models/servant";
import Header from "./components/Header";

const App : FC = () => {

  const [data, setData] = useState<Servant[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/servants')
      .then(response => {
        const servants = response.data.map(
          (s : any) => new Servant(s.id, s.name, s.class_name, s.ascension_level, s.level)
        )
        setData(servants)
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
     <>

      <Header></Header>
    <div className="main-window">
      {data && data.map((servant : Servant, id : number) => (
        <ServantCard key={id} servant={servant}></ServantCard>
      ))}

    </div>
    </> 
  )

}

export default App;
