import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/questions', { name, email, question });
            alert('Question submitted successfully');
        } catch (error) {
            alert('Error submitting question');
        }
    };

    const handlePhotoUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', photo);

        try {
            await axios.post('http://localhost:5000/api/upload', formData);
            alert('Photo uploaded successfully');
        } catch (error) {
            alert('Error uploading photo');
        }
    };

    return (
        <div className="App">
            <h1>Farming Dashboard</h1>
            
            <form onSubmit={handleQuestionSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Ask your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
                <button type="submit">Submit Question</button>
            </form>

            <form onSubmit={handlePhotoUpload}>
                <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    required
                />
                <button type="submit">Upload Photo</button>
            </form>
        </div>
    );
}

export default App;
