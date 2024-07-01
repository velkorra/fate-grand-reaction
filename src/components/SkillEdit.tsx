import { ChangeEvent, FC, useState } from 'react';
import '../styles/main.css';
import { useTranslation } from 'react-i18next';


import { RANKS } from '../constants';
import { UpdateSkill, addSkillPicture } from '../Api';

interface SkillEditProps {
    currentSkill: Skill;
    reload: () => void;
    onClose: () => void;
}

const SkillEdit: FC<SkillEditProps> = ({ currentSkill, reload, onClose }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(currentSkill.name);
    const [rank, setRank] = useState(currentSkill.rank);
    const [skillType, setSkillType] = useState(currentSkill.skill_type);
    const [description, setDescription] = useState(currentSkill.description);
    const [skillId, setSkillId] = useState('')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files
        if (selectedFile) {
            setFile(selectedFile[0]);
        }
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile[0]);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedSkill = { ...currentSkill, name, rank, skill_type: skillType, description };
        await UpdateSkill(updatedSkill);
        reload();
        onClose();
        if (file) {
            const form = new FormData()
            form.append("file", file)
            await addSkillPicture(form, currentSkill.id)
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="content edit-window" style={{ width: "300px" }}>
                    <button className="close-button" onClick={onClose}>&times;</button>
                    <form onSubmit={handleSubmit}>
                        <div className='create-container' style={{ width: "100%" }}>

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
                            <label htmlFor="file-upload" className="custom-file-upload">
                                {t('attach_photo')}
                            </label>
                            <input id="file-upload" type="file" onChange={handleFileChange} />
                            {previewUrl && (
                                <div>
                                    <img src={previewUrl} alt="Preview" className="select-picture" style={{maxHeight: "130px"}} />
                                </div>
                            )}
                            <button type='submit'>Сохранить</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
};
export default SkillEdit;