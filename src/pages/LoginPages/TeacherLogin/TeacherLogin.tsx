// TeacherLogin.tsx
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LoginForm from './LoginForm';

interface TeacherLoginProps {}

const TeacherLogin: React.FC<TeacherLoginProps> = () => {
  return (
    <div className="flex flex-col min-h-screen font-bold bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center pb-20">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default TeacherLogin;
