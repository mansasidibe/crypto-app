import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Web3Provider>
      <div className={`min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="container py-4">
          <div className="row">
            <div className="col-12">
              <TransactionForm darkMode={darkMode} />
            </div>
            <div className="col-12 mt-4">
              <TransactionHistory darkMode={darkMode} />
            </div>
          </div>
        </main>
        
        <Footer darkMode={darkMode} />
        
        <ToastContainer position="bottom-right" theme={darkMode ? 'dark' : 'light'} />
      </div>
    </Web3Provider>
  );
}

export default App;
