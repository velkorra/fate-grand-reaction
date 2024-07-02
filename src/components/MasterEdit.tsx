import { ChangeEvent, FC, FormEvent, useState } from 'react';
import '../styles/main.css'
import { useTranslation } from 'react-i18next';
import { createMaster, editMaster } from '../Api';
import { capitalize } from '../capitalize';
import { Master } from '../models/master';

interface MasterEditProps {
    onClose: () => void;
    reload: () => void
    current_master: Master
}

const MasterEdit: FC<MasterEditProps> = ({ onClose, reload, current_master }) => {
    const { t } = useTranslation()
    const [master, setMaster] = useState({
        nickname: current_master.nickname,
        display_name: current_master.display_name,
        level: current_master.level
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMaster({
            ...master,
            [name]: value
        });
        console.log(master);

    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nickname', master.nickname);
        formData.append('display_name', master.display_name);
        formData.append('level', ""+master.level);
        try {
            const response = await editMaster(formData, current_master.id)
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
                <div className="content edit-window" style={{ width: "200px" }}>
                    <form onSubmit={handleSubmit}>
                        <div className='subform'>
                            <label>
                                {capitalize(t('nickname'))}:
                            </label>
                            <input type="text" name="nickname" value={master.nickname} onChange={handleChange} required />
                            <label>
                                {capitalize(t('display_name'))}:
                            </label>
                            <input type="text" name="display_name" value={master.display_name} onChange={handleChange} required />
                            <label>
                                {capitalize(t('level'))}:
                            </label>
                            <input type="number" name="level" value={master.level} onChange={handleChange} required />
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MasterEdit;