import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { capitalize } from "../capitalize";
import { addPicture, updateLocalization, updateServant } from "../Api";
import { ServantLocalization, ServantUpdate, ServantWhithLocalization } from "../schemas";

type ServantEditProps = {
    onClose: () => void;
    reload: () => void;
    currentServant: ServantWhithLocalization;
};

const ServantEdit: FC<ServantEditProps> = ({ onClose, reload, currentServant }) => {
    const { t } = useTranslation();
    const servantOptions = t('servant', { returnObjects: true });
    const alignmentOptions = t('alignments', { returnObjects: true });
    const ruLoc = currentServant.localizations.find(loc => loc.language === 'ru')
    const enLoc = currentServant.localizations.find(loc => loc.language === 'en')

    const [servant, setServant] = useState<any>({
        name: currentServant.name,
        className: currentServant.className,
        alignment: currentServant.alignment,
        gender: currentServant.gender,
        "english": {
            name: enLoc?.name,
            description: enLoc?.description,
            history: enLoc?.history,
            prototype_person: enLoc?.prototypePerson,
            illustrator: enLoc?.illustrator,
            voice_actor: enLoc?.voiceActor,
            temper: enLoc?.temper,
            intro: enLoc?.intro
        },
        "russian": {
            name: ruLoc?.name,
            description: ruLoc?.description,
            history: ruLoc?.history,
            prototype_person: ruLoc?.prototypePerson,
            illustrator: ruLoc?.illustrator,
            voice_actor: ruLoc?.voiceActor,
            temper: ruLoc?.temper,
            intro: ruLoc?.intro
        },

    });
    const createServantLocalizationObject = (localeData: any, language: string): ServantLocalization => ({
        language,
        name: localeData.name,
        description: localeData.description,
        history: localeData.history,
        prototypePerson: localeData.prototype_person,
        illustrator: localeData.illustrator,
        voiceActor: localeData.voice_actor,
        temper: localeData.temper,
        intro: localeData.intro
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [language, setLanguage] = useState<'english' | 'russian'>('english');

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'english' ? 'russian' : 'english'));
    };
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServant({
            ...servant,
            [name]: value
        });
    };
    const handleLanguageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang: 'english' | 'russian') => {
        const { name, value } = e.target;
        setServant((prevState: any) => ({
            ...prevState,
            [lang]: {
                ...prevState[lang],
                [name]: value
            }
        }));
        console.log(servant);
    };
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedServant: ServantUpdate = {
            name: servant.name,
            className: servant.className,
            alignment: servant.alignment,
            gender: servant.gender
        }


        const englishLocalization = createServantLocalizationObject(servant.english, "en");
        const russianLocalization = createServantLocalizationObject(servant.russian, "ru");


        try {
            const response = await updateServant(updatedServant, currentServant.id)

            await updateLocalization(russianLocalization, "ru", currentServant.id)
            await updateLocalization(englishLocalization, "en", currentServant.id)
            if (file) {
                const fileData = new FormData()
                fileData.append("file", file)
                await addPicture(fileData, currentServant.id)
            }
            reload()
            if (response.status === 200) {
                console.log('Form submitted successfully.');
                onClose();
            } else {
                console.error('Form submission failed.');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="content edit-window">
                    <div className="language-switcher-container">
                        <button onClick={toggleLanguage} className="language-button">
                            {language === 'english' ? 'english' : 'russian'}
                        </button>
                    </div>
                    <div className="title">{capitalize(t("create"))}</div>
                    <div className="add-localization">{capitalize(t("add-localization"))}</div>
                    <form onSubmit={handleSubmit}>
                        <div className="subform">
                            <label>
                                {capitalize(t('name'))}:
                            </label>
                            <input type="text" name="name" value={servant.name} onChange={handleChange} required />
                            <label>{capitalize(t('class'))}:</label>

                            <select name="className" value={servant.className} onChange={handleChange} required>
                                {Object.entries(servantOptions).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>

                            <label>
                                {capitalize(t('alignment'))}:
                            </label>
                            <select name="alignment" value={servant.alignment} onChange={handleChange} required>
                                {Object.entries(alignmentOptions).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {capitalize(value)}
                                    </option>
                                ))}
                            </select>
                            <label>
                                {t('gender')}:
                            </label>
                            <select name="gender" value={servant.gender} onChange={handleChange} required>
                                <option value="undefined">{capitalize(t('undefined'))}</option>
                                <option value="male">{capitalize(t('male'))}</option>
                                <option value="female">{capitalize(t('female'))}</option>
                            </select>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                {t('attach_photo')}
                            </label>
                            <input id="file-upload" type="file" onChange={handleFileChange} />
                            {previewUrl && (
                                <div>
                                    <img src={previewUrl} alt="Preview" className="select-picture" />
                                </div>
                            )}
                            <button type="submit">Сохранить</button>
                        </div>
                        <div className="subform scrolling">
                            <label>
                                {capitalize(t('name'))}:
                                <input type="text" name="name" value={servant[language].name} onChange={(e) => handleLanguageChange(e, language)} />
                            </label>
                            <label>
                                {capitalize(t('description'))}:
                                <textarea className="text-box" name="description" value={servant[language].description} onChange={(e) => handleLanguageChange(e, language)} />
                            </label>
                            <label>
                                {capitalize(t('history'))}:
                                <textarea className="text-box" name="history" value={servant[language].history} onChange={(e) => handleLanguageChange(e, language)} />
                            </label>
                            <label>
                                {capitalize(t('prototypePerson'))}:
                                <input type="text" name="prototype_person" value={servant[language].prototype_person} onChange={(e) => handleLanguageChange(e, language)} />
                            </label>
                            <label>
                                {capitalize(t('illustrator'))}:
                                <input type="text" name="illustrator" value={servant[language].illustrator} onChange={(e) => handleLanguageChange(e, language)} />
                            </label>
                            <label>
                                {capitalize(t('voice_actor'))}:
                                <input type="text" name="voice_actor" value={servant[language].voice_actor} onChange={(e) => handleLanguageChange(e, language)} />
                            </label>
                            <label>
                                {capitalize(t('temper'))}:
                                <input type="text" name="temper" value={servant[language].temper} onChange={(e) => handleLanguageChange(e, language)} />
                            </label>
                            <label>
                                {capitalize(t('intro'))}:
                                <input type="text" name="intro" value={servant[language].intro} onChange={(e) => handleLanguageChange(e, language)} />
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServantEdit;