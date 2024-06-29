import { FC, useEffect, useState } from "react";
import './styles/main.css'
import { Servant } from "./models/servant";
import Header from "./components/Header";
import { getServants } from "./Api";
import ServantList from "./components/ServantList";
import './i18n'

const App: FC = () => {

  const [data, setData] = useState<Servant[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState(Math.floor(Date.now() / 1000))
  const reload = () => {setLastUpdated(Math.floor(Date.now() / 1000))}
  useEffect(() => {
    const loadServants = async () => {
      setLoading(true)
      const data = await getServants()
      setData(data)
      setLoading(false) 
    }
    loadServants()
  }, [lastUpdated])


  if (loading) return (<p>loading</p>)
  if (error) return (<p>error:{error}</p>)

  return (
    <>

      <Header></Header>
      <div className="main-window">
        {data && (<ServantList reload={reload} servants={data}></ServantList>)}

      </div>
    </>
  )

}

export default App;
