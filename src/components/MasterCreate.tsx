import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createMaster } from '../Api';
import { capitalize } from '../capitalize';

interface MasterCreateProps {
    onClose: () => void;
    reload: () => void
}

const MasterCreate: FC<MasterCreateProps> = ({ onClose, reload }) => {
    const { t } = useTranslation()
    const [master, setMaster] = useState({
        nickname: '',
        display_name: ''
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMaster({
            ...master,
            [name]: value
        });

    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nickname', master.nickname);
        formData.append('display_name', master.display_name);
        try {
            const response = await createMaster(formData)
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
                            <button type="submit">Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MasterCreate;