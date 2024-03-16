import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDiaryEntryById, createDiaryEntry, updateDiaryEntry } from '../services/diaryServices';

// Define la interfaz DiaryFormProps para especificar las props del componente
interface DiaryFormProps {
    mode: 'create' | 'edit'; // Define la prop mode como 'create' o 'edit'
}

// Usa la interfaz DiaryFormProps para tipar las props del componente
const DiaryForm: React.FC<DiaryFormProps> = ({ mode }) => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const getDiaryEntry = async () => {
                try {
                    setIsLoading(true);
                    const response = await getDiaryEntryById(id!);
                    setTitle(response.title);
                    setContent(response.content);
                } catch (error) {
                    console.error('Error fetching diary entry:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            if (mode === 'edit' && id) {
                await getDiaryEntry();
            }
        };

        fetchData();
    }, [mode, id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            if (mode === 'edit') {
                await updateDiaryEntry(id!, { title, content });
            } else {
                await createDiaryEntry({ title, content });
            }
        } catch (error) {
            console.error('Error saving diary entry:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Diary Entry' : 'Create Diary Entry'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>
            </form>
        </div>
    );
};

export default DiaryForm;
