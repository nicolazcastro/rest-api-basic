import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDiaryEntries } from '../services/diaryServices';

const DiaryList: React.FC = () => {
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getEntries();
    }, []);

    const getEntries = async () => {
        try {
            setIsLoading(true);
            const response = await getDiaryEntries();
            setDiaryEntries(response);
        } catch (error) {
            console.error('Error fetching diary entries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Diary Entries</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {diaryEntries.map((entry: any) => (
                        <li key={entry.id}>
                            <Link to={`/diary-form/edit/${entry.id}`}>{entry.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DiaryList;
