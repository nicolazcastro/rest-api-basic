// src/App.tsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import UserInfo from './components/UserInfo';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <UserInfo />
      <LoginModal />
      <RegisterModal />
      <DiaryList />
      <DiaryForm />
      <Footer />
    </div>
  );
};

export default App;
