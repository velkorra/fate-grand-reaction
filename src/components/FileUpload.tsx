import { FC, useState } from 'react'
import '../styles/main.css'
import axios from 'axios';

const FileUpload: FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('grade', "1");
    try {
      const response = await axios.post('http://127.0.0.1:8000/servants/1/pictures/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
}


export default FileUpload