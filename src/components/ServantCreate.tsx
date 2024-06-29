import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";

type ServantCreateProps = {
    onClose: () => void;
};

const ServantCreate: FC<ServantCreateProps> = ({ onClose }) => {
    // State for the form fields
    const { t } = useTranslation()
    const servantOptions = t('servant', { returnObjects: true });
    const [servant, setServant] = useState({
        id: '',
        name: '',
        className: '',
        alignment: '',
        gender: 'undefined'
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // State for the attached file
    const [file, setFile] = useState<File | null>(null);

    // Handle change in form fields
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServant({
            ...servant,
            [name]: value
        });

    };
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setServant({
            ...servant,
            [name]: value
        });
    };

    // Handle file attachment
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files
        if (selectedFile) {
            setFile(selectedFile[0]);
        }
        if (selectedFile) {
            // Создание URL для предварительного просмотра
            const url = URL.createObjectURL(selectedFile[0]);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create FormData object to send data to server
        const formData = new FormData();
        formData.append('id', servant.id);
        formData.append('name', servant.name);
        formData.append('className', servant.className);
        formData.append('gender', servant.gender);
        formData.append('alignment', servant.alignment);
        if (file) {
            formData.append('file', file);
        }

        // Send form data to server
        try {
            const response = await fetch('/your-server-endpoint', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Handle success
                console.log('Form submitted successfully.');
                onClose();
            } else {
                // Handle error
                console.error('Form submission failed.');
            }
        } catch (error) {
            // Handle network error
            console.error('Network error:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <label>
                            ID:
                            <input type="number" name="id" value={servant.id} onChange={handleChange} required />
                        </label>
                        <label>
                            Name:
                            <input type="text" name="name" value={servant.name} onChange={handleChange} required />
                        </label>
                        <label>
                            Class Name:
                            <select name="className" value={servant.className} onChange={handleSelectChange} required>
                                {Object.entries(servantOptions).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Ascension Level:
                            <input type="number" name="ascensionLevel" value={servant.gender} onChange={handleChange} required />
                        </label>
                        <label>
                            {t('gender')}:
                        </label>
                        <select name="gender" value={servant.gender} onChange={handleSelectChange} required>
                            <option value="undefined">{t('undefined')}</option>
                            <option value="male">{t('male')}</option>
                            <option value="female">{t('female')}</option>
                        </select>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Attach Photo:
                        </label>
                        <input id="file-upload" type="file" onChange={handleFileChange} />
                        {previewUrl && (
                            <div>
                                <img src={previewUrl} alt="Preview" className="select-picture" />
                            </div>
                        )}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServantCreate;