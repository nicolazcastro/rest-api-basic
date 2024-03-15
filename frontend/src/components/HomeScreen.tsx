import React from 'react';
import UserInfo from './UserInfo';
import DiaryList from './DiaryList';
import DiaryForm from './DiaryForm';

const HomeScreen: React.FC = () => {
    return (
        <div className="container">
            <h1>Home</h1>
            <UserInfo />
            <DiaryList />
            <DiaryForm />
        </div>
    );
};

export default HomeScreen;
