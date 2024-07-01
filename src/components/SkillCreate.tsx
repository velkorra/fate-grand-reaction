import { FC, useEffect, useState } from 'react';
import '../styles/main.css';
import { useTranslation } from 'react-i18next';
import { createNoblePhantasm, getName } from '../Api';
import { PHANTASM_TYPES, RANKS } from '../constants';
import { Servant } from '../models/servant';
import { NoblePhantasm } from '../models/NoblePhantasm';

interface SkillCreateProps {
    reload: () => void;
    onClose: () => void;
}

const SkillCreate: FC<SkillCreateProps> = ({ reload, onClose }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    const [skillType, setSkillType] = useState('');
    const [description, setDescription] = useState('');
    const [skillId, setSkillId] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedSkill = { name, rank, skill_type: skillType, description };
        // await updateNoblePhantasm(updatedSkill);
        reload();
        onClose();
    };

    const sname = async (servant_id: any) => {
        const name = await getName(t('lang'), servant_id)
        return name
    }


    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="content edit-window" style={{ width: "300px" }}>
                    <button className="close-button" onClick={onClose}>&times;</button>
                    <form onSubmit={handleSubmit}>
                        <div className='create-container' style={{width: "100%"}}>

                            <label>Название</label>
                            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />

                            <label htmlFor="rank">Ранг: </label>
                            <select id="rank" value={rank} onChange={(e) => setRank(e.target.value)}>
                                <option value="" disabled>Выберите ранг</option>
                                {RANKS.map(rank => (
                                    <option key={rank} value={rank}>{rank.toUpperCase()}</option>
                                ))}
                            </select>
                            <label htmlFor="skillType">Тип Навыка: </label>
                            <select id="skillType" value={skillType} onChange={(e) => setSkillType(e.target.value)}>
                                <option value="" disabled>Выберите тип</option>

                                <option key={"Пассивный"} value={"Пассивный"}>Пассивный</option>
                                <option key={"Активный"} value={"Активный"}>Активный</option>

                            </select>

                            <label>Описание</label>
                            <textarea className="text-box" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <button type='submit'>Создать навык</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default SkillCreate;