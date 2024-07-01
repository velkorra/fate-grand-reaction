import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import { useTranslation } from 'react-i18next';
import { Contract } from '../schemas';
import { getContracts } from '../Api';
import ContractCard from './ContractCard';

interface ContractListProps {
    reload: () => void
}

const ContractList: FC<ContractListProps> = ({reload}) => {
    const { t } = useTranslation()
  
    const [state, setState] = useState<string>("initial")
    const [contracts, setContracts] = useState<Contract[]>([])
    const openCreateWindow = () => { setState('opened') }
    const closeCreateWindow = () => { setState('initial') }
    useEffect(() =>{
      const getData = async () =>{
        const data = await getContracts()
        setContracts(data)
      }
      getData()
      
    }, [])
    return (
      <div>
        
        <div className='master-list'>
          <div className='create-card' onClick={openCreateWindow}>
            {t('create_master')}
          </div>
          {contracts.map((contract: Contract, id : number) => (
            <ContractCard key={id} contract={contract} reload={reload}></ContractCard>
          ))}
        </div>
        {/* {state === "opened"? (
          <MasterCreate reload={reload} onClose={closeCreateWindow}></MasterCreate>
          // <div className='popup-effect'></div>
        ):''} */}
      </div>
    );
  };
  

export default ContractList;