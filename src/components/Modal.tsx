import React, { FC, useState, ChangeEvent, FormEvent } from "react";

type ModalProps = {
    onClose: () => void;
};

const Modal: FC<ModalProps> = ({ onClose }) => {
    // State for the form fields
    const [servant, setServant] = useState({
        id: '',
        name: '',
        className: '',
        ascensionLevel: '',
        level: ''
    });

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

    // Handle file attachment
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
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
        formData.append('ascensionLevel', servant.ascensionLevel);
        formData.append('level', servant.level);
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
                            <input type="text" name="className" value={servant.className} onChange={handleChange} required />
                        </label>
                        <label>
                            Ascension Level:
                            <input type="number" name="ascensionLevel" value={servant.ascensionLevel} onChange={handleChange} required />
                        </label>
                        <label>
                            Level:
                            <input type="number" name="level" value={servant.level} onChange={handleChange} required />
                        </label>
                        <label>
                            Attach Photo:
                            <input type="file" onChange={handleFileChange} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;