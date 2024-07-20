import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateNoblePhantasm } from '../Api';
import { NoblePhantasm } from '../models/NoblePhantasm';
import { PHANTASM_TYPES, RANKS } from '../constants';

interface NoblePhantasmEditProps {
    currentNoblePhantasm: NoblePhantasm;
    reload: () => void;
    onClose: () => void;
}

const NoblePhantasmEdit: FC<NoblePhantasmEditProps> = ({ currentNoblePhantasm, reload, onClose }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(currentNoblePhantasm.name);
    const [rank, setRank] = useState(currentNoblePhantasm.rank);
    const [activationType, setActivationType] = useState(currentNoblePhantasm.activation_type);
    const [description, setDescription] = useState(currentNoblePhantasm.description);
    const [servantId, setServantId] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedNoblePhantasm = { ...currentNoblePhantasm, name, rank, activation_type : activationType, description };
        await updateNoblePhantasm(updatedNoblePhantasm);
        reload();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="content edit-window" style={{ width: "300px" }}>
                    <button className="close-button" onClick={onClose}>&times;</button>
                    <form onSubmit={handleSubmit}>
                        <div className='create-container'>

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
export default NoblePhantasmEdit;