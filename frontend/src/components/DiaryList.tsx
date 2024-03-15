// src/components/DiaryList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiaryList: React.FC = () => {
    const [diaries, setDiaries] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/v1/diaries')
            .then(response => {
                setDiaries(response.data);
            })
            .catch(error => {
                console.error('Error fetching diaries:', error);
            });
    }, []);

    return (
        <div>
            <h2>Diary List</h2>
            <ul>
                {diaries.map(diary => (
                    <li key={diary.id}>{diary.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default DiaryList;
