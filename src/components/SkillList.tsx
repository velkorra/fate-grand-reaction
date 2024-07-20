import { FC, useEffect, useState } from 'react';
import '../styles/main.css'
import { useTranslation } from 'react-i18next';
import SkillCard from './SkillCard';
import { getSkills } from '../Api';
import SkillCreate from './SkillCreate';


interface SkillListProps {
  reload: () => void
}

const SkillList: FC<SkillListProps> = ({ reload }) => {
  
  const { t } = useTranslation()
  const [state, setState] = useState<string>("initial")
  const openCreateWindow = () => { setState('opened') }
  const closeCreateWindow = () => { setState('initial') }
  const [skills, setSkills] = useState<Skill[]>([])
  useEffect(() => {
    const getData = async () => {
        const response = await getSkills();
        setSkills(response.data);
    };
    getData();
}, []);
  return (
    <div>
      <div className='master-list'>
        <div className='create-card' onClick={openCreateWindow}>
          {t('Создать навык')}
        </div>
        {skills.map((skill: Skill, id: number) => (
          <SkillCard  skill={skill} key={id} reload={reload}></SkillCard>
        ))}
      </div>
      {state === "opened"? (
        <SkillCreate  reload={reload} onClose={closeCreateWindow}></SkillCreate>
      ):''}
    </div>
  );
};


export default SkillList;