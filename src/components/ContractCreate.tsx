import { ChangeEvent, FC, FormEvent, useState } from 'react';
import '../styles/main.css'
import { useTranslation } from 'react-i18next';
import { createContract, createMaster } from '../Api';
import { capitalize } from '../capitalize';
import { Servant } from '../models/servant';
import { Master } from '../models/master';

interface ContractCreateProps {
    onClose: () => void;
    reload: () => void
    servants: Servant[]
    masters: Master[]
}

const ContractCreate: FC<ContractCreateProps> = ({ onClose, reload, servants, masters }) => {
    const { t } = useTranslation()
    const [contract, setContract] = useState({
        servant_id: 0,
        master_id: 0,
    })
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setContract({
            ...contract,
            [name]: value
        });


    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        try {
            const response = await createContract(contract.servant_id, contract.master_id)
            reload()
            if (response.status === 200) {
                console.log('Form submitted successfully.');
                onClose()

            }
        }
        catch (error) {
            alert(error)
        }
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="content edit-window" style={{ width: "300px" }}>
                    <form onSubmit={handleSubmit}>
                        <div className='subform'>
                            <label>
                                Выберите Слугу:
                                <select name="servant_id" value={contract.servant_id} onChange={handleChange} required>
                                    <option value={0}>Select a servant</option>
                                    {servants.map(servant => (
                                        <option key={servant.id} value={servant.id}>{servant.name}</option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label>
                                Выберите Мастера:
                                <select name="master_id" value={contract.master_id} onChange={handleChange} required>
                                    <option value={0}>Select a master</option>
                                    {masters.map(master => (
                                        <option key={master.id} value={master.id}>{master.display_name} ({master.nickname})</option>
                                    ))}
                                </select>
                            </label>
                            <button type="submit">Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContractCreate;