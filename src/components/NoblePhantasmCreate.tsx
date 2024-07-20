import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createNoblePhantasm, getName } from '../Api';
import { PHANTASM_TYPES, RANKS } from '../constants';
import { Servant } from '../models/servant';
import { NoblePhantasm } from '../models/NoblePhantasm';

interface NoblePhantasmCreateProps {
    reload: () => void;
    onClose: () => void;
    servants: Servant[]
}

const NoblePhantasmCreate: FC<NoblePhantasmCreateProps> = ({ reload, onClose, servants }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    const [activationType, setActivationType] = useState('');
    const [description, setDescription] = useState('');
    const [servantId, setServantId] = useState(0)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newNoblePhantasm: NoblePhantasm = {
            servant_id: servantId,
            rank,
            activation_type: activationType,
            name,
            description
        };
        await createNoblePhantasm(newNoblePhantasm);
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
                        <div className='create-container'>
                            <label>
                                Выберите Слугу:
                            </label>
                            <select name="servant_id" value={servantId} onChange={(e) => setServantId(Number(e.target.value))} required>
                                <option value={0}>Select a servant</option>
                                {servants.map(servant => (
                                    <option key={servant.id} value={servant.id}>{servant.name}</option>
                                ))}
                            </select>
                            <label>Название</label>
                            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />

                            <label htmlFor="rank">Ранг: </label>
                            <select id="rank" value={rank} onChange={(e) => setRank(e.target.value)}>
                                <option value="" disabled>Выберите ранг</option>
                                {RANKS.map(rank => (
                                    <option key={rank} value={rank}>{rank.toUpperCase()}</option>
                                ))}
                            </select>
                            <label htmlFor="activationType">Тип Фантазма: </label>
                            <select id="activationType" value={activationType} onChange={(e) => setActivationType(e.target.value)}>
                                <option value="" disabled>Выберите тип</option>
                                {PHANTASM_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>


                            <label>Описание</label>
                            <textarea className="text-box" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <button type='submit'>Создать благородный фантазм</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default NoblePhantasmCreate;