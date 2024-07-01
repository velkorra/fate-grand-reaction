import { FC, useEffect, useState } from 'react';
import '../styles/main.css';

import { useTranslation } from 'react-i18next';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { deleteNoblePhantasm, getSkillPicture } from '../Api';
import NoblePhantasmEdit from './NoblePhantasmEdit';
import { NoblePhantasm } from '../models/NoblePhantasm';
import SkillEdit from './SkillEdit';
import { FaPlus } from 'react-icons/fa';
import { isAxiosError } from 'axios';


interface SkillCardProps {
    skill: Skill;
    reload: () => void;
}

const SkillCard: FC<SkillCardProps> = ({ skill, reload }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const deleteThis = async () => {
        await deleteNoblePhantasm(skill.id);
        reload();
    };
    useEffect(() => {
        const fetchIcon = async () => {
            try {
                const response = await getSkillPicture(skill.id)
                setImageUrl(URL.createObjectURL(response.data))
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        
                    }
                }
                console.error('Error fetching image:', error);
            }
        }
        fetchIcon()
    }
    )
    return (
        <div>
            <div className='skill-card'>
                <div className='servant-image-container'>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={`${skill.name}`}
                            className='servant-image'
                        />
                    ) : (<div>
                        <p>Loading...</p>
                    </div>
                    )}
                </div>
                <div className='servant-info'>
                    <div className='name'>{t('name')}: {skill.name}</div>
                    <div className='rank'>{t('rank')}: {skill.rank}</div>
                    <div className='activation-type'>{t('activation_type')}: {skill.skill_type}</div>
                    <div className='description'>{t('description')}: {skill.description}</div>
                </div>
                <div className='servant-control'>
                    <EditButton reload={reload} onClick={openModal} />
                    <DeleteButton reload={reload} deleteServant={deleteThis} />

                </div>
            </div>
            {isModalOpen && (
                <SkillEdit onClose={closeModal} reload={reload} currentSkill={skill} />
            )}
        </div>
    );
};

export default SkillCard;