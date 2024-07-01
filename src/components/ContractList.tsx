import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import { useTranslation } from 'react-i18next';
import { Contract, ServantData } from '../schemas';
import { getContracts, getMasters, getServants } from '../Api';
import ContractCard from './ContractCard';
import { Master } from '../models/master';
import { Servant } from '../models/servant';
import ContractCreate from './ContractCreate';

interface ContractListProps {
  reload: () => void
}

const ContractList: FC<ContractListProps> = ({ reload }) => {
  const { t } = useTranslation()
  const [masters, setMasters] = useState<Master[]>([])
  const [servants, setServants] = useState<Servant[]>([])
  const [state, setState] = useState<string>("initial")
  const [contracts, setContracts] = useState<Contract[]>([])
  const openCreateWindow = () => { setState('opened') }
  const closeCreateWindow = () => { setState('initial') }
  useEffect(() => {
    const getData = async () => {
      const data = await getContracts()
      setContracts(data)
      const servs = await getServants()
      setServants(servs)
      const maste = await getMasters()
      setMasters(maste)
      console.log(servs);
      console.log(maste);

    }
    getData()

  }, [])
  return (
    <div>

      <div className='master-list'>
        <div className='create-card' onClick={openCreateWindow}>
          {t('create_master')}
        </div>
        {contracts.map((contract: Contract, id: number) => (
          <ContractCard key={id} contract={contract} reload={reload}></ContractCard>
        ))}
      </div>
      {state === "opened" ? (
        <ContractCreate masters={masters} servants={servants} reload={reload} onClose={closeCreateWindow}></ContractCreate>
        // <div className='popup-effect'></div>
      ) : ''}
    </div>
  );
};


export default ContractList;