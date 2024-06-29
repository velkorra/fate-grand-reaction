import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { capitalize } from "../capitalize";
import axios from "axios";

type ServantCreateProps = {
    onClose: () => void;
};

const ServantCreate: FC<ServantCreateProps> = ({ onClose }) => {
    // State for the form fields
    const { t } = useTranslation()
    const servantOptions = t('servant', { returnObjects: true });
    const alignmentOptions = t('alignments', { returnObjects: true });
    const [servant, setServant] = useState({
        name: '',
        className: Object.keys(servantOptions)[0],
        alignment: Object.keys(alignmentOptions)[0],
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
        formData.append('name', servant.name);
        formData.append('class_name', servant.className);
        formData.append('gender', servant.gender);
        formData.append('alignment', servant.alignment);
        if (file) {
            formData.append('file', file);
        }

        // Send form data to server
        try {
            console.log(formData);
            
            const response = await axios.post('http://localhost:8000/servants_new', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
        
            if (response.status === 200) {
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
                    <div className="title">{capitalize(t("create"))}</div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            {capitalize(t('name'))}:
                            <input type="text" name="name" value={servant.name} onChange={handleChange} required />
                        </label>
                        <label>{capitalize(t('class'))}:</label>

                        <select name="className" value={servant.className} onChange={handleSelectChange} required>
                            {Object.entries(servantOptions).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>

                        <label>
                            {capitalize(t('alignment'))}:
                        </label>
                        <select name="alignment" value={servant.alignment} onChange={handleSelectChange} required>
                            {Object.entries(alignmentOptions).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {capitalize(value)}
                                </option>
                            ))}
                        </select>
                        <label>
                            {t('gender')}:
                        </label>
                        <select name="gender" value={servant.gender} onChange={handleSelectChange} required>
                            <option value="undefined">{capitalize(t('undefined'))}</option>
                            <option value="male">{capitalize(t('male'))}</option>
                            <option value="female">{capitalize(t('female'))}</option>
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