import { FC, useEffect, useState } from "react";
import './styles/main.css'
import { Servant } from "./models/servant";
import Header from "./components/Header";
import { getServants } from "./Api";
import ServantList from "./components/ServantList";
import './i18n'
import MasterList from "./components/MasterList";
import ContractList from "./components/ContractList";
import NoblePhantasmList from "./components/NoblePhantasmList";
import SkillList from "./components/SkillList";
import QueryList from "./components/QueryList";

const App: FC = () => {

  const [data, setData] = useState<Servant[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState(Math.floor(Date.now() / 1000))
  const reload = () => { setLastUpdated(Math.floor(Date.now() / 1000)) }
  const [highlighted, setHighlighted] = useState('servant')
  const isHighlighted = (a: string) => {
    return highlighted === a
  }
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
      <div className='subheader'>
        <div className="nav lora">
          <div
            onClick={() => setHighlighted('servant')}
            style={{ textDecoration: isHighlighted('servant') ? 'underline' : 'none' }}
          >
            Персонажи
          </div>
          <div
            onClick={() => setHighlighted('master')}
            style={{ textDecoration: isHighlighted('master') ? 'underline' : 'none' }}
          >
            Игроки
          </div>
          <div
            onClick={() => setHighlighted('contract')}
            style={{ textDecoration: isHighlighted('contract') ? 'underline' : 'none' }}
          >
            Контракты
          </div>
          <div
            onClick={() => setHighlighted('np')}
            style={{ textDecoration: isHighlighted('np') ? 'underline' : 'none' }}
          >
            Фантазмы
          </div>
          <div
            onClick={() => setHighlighted('skill')}
            style={{ textDecoration: isHighlighted('skill') ? 'underline' : 'none' }}
          >
            Навыки
          </div>
          <div
            onClick={() => setHighlighted('query')}
            style={{ textDecoration: isHighlighted('query') ? 'underline' : 'none' }}
          >
            Запросы
          </div>
        </div>
      </div>
      <div className="main-window">
        {highlighted === 'servant' ? (
          <div>
            {data && (<ServantList reload={reload} servants={data}></ServantList>)}
          </div>
        )
          :
          highlighted === 'master' ? (
            <div>
              <MasterList reload={reload}></MasterList>
            </div>
          ) : 
          highlighted === 'contract' ? (
            <div>
              <ContractList reload={reload}></ContractList>
            </div>
          ): 
          highlighted === 'np' ? (
            <div>
              <NoblePhantasmList reload={reload}></NoblePhantasmList>
            </div>
          ): 
          highlighted === 'skill' ? (
            <div>
              <SkillList reload={reload}></SkillList>
            </div>
          ): 
          highlighted === 'query' ? (
            <div>
              <QueryList></QueryList>
            </div>
          ): ''}

      </div>
    </>
  )

}

export default App;
