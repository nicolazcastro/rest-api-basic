import React, { useState } from 'react';
import axios from 'axios';

const DiaryForm: React.FC = () => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        axios.post('/api/v1/diaries', { date, weather, visibility, comment })
            .then(response => {
                console.log('Diary entry added:', response.data);
                // Optionally, you can reset the form fields after successful submission
                setDate('');
                setWeather('');
                setVisibility('');
                setComment('');
            })
            .catch(error => {
                console.error('Error adding diary entry:', error);
            });
    };

    return (
        <div>
            <h2>Diary Form</h2>
            <label>Date:</label>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} />
            <label>Weather:</label>
            <input type="text" value={weather} onChange={e => setWeather(e.target.value)} />
            <label>Visibility:</label>
            <input type="text" value={visibility} onChange={e => setVisibility(e.target.value)} />
            <label>Comment:</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default DiaryForm;
