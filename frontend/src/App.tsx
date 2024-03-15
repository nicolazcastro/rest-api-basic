import React from 'react';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import UserInfo from './components/UserInfo';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App: React.FC = () => {
  return (
    <UserProvider> {/* Wrap your application with UserProvider */}
      <div>
        <Header />
        <UserInfo />
        <LoginModal />
        <RegisterModal />
        <DiaryList />
        <DiaryForm />
        <Footer />
      </div>
    </UserProvider>
  );
};

export default App;
