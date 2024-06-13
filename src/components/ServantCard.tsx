import { FC } from 'react'
import { Servant } from '../models/servant'
import '../styles/main.css'
interface ServantCardProps {
  servant : Servant
}

const ServantCard: FC<ServantCardProps> = ({ servant }) => {
  return (
    <div className='servant'>
      <p>{servant.name}</p>
      <p>{servant.className}</p>
    </div>
  )
}

export default ServantCard