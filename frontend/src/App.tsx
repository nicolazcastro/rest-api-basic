import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/diary-list" element={<DiaryList />} />
          <Route path="/diary-form" element={<DiaryForm />} />
        </Routes>
        <Footer />

        {showLoginModal && <LoginModal onClose={handleCloseModal} />}
        {showRegisterModal && <RegisterModal onClose={handleCloseModal} />}
      </div>
    </Router>
  );
};

export default App;
