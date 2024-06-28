import axios from "axios";
import { FC, useEffect, useState } from "react";
import './styles/main.css'
// import Contract from "./components/Contract";
import ServantCard from "./components/ServantCard";
import { Servant } from "./models/servant";
import Header from "./components/Header";
import { getServants } from "./Api";


const App: FC = () => {

  const [data, setData] = useState<Servant[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadServants = async () => {
      setLoading(true)
      const data = await getServants()
      setData(data)
      setLoading(false) 
    }
    loadServants()
  }, [])


  if (loading) return (<p>loading</p>)
  if (error) return (<p>error:{error}</p>)

  return (
    <>

      <Header></Header>
      <div className="main-window">
        {data && data.map((servant: Servant, id: number) => (
          <ServantCard key={id} servant={servant}></ServantCard>
        ))}

      </div>
    </>
  )

}

export default App;
