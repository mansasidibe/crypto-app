import React, { useState, useRef, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Wallet, ChevronDown, LogOut, ExternalLink, DollarSign } from 'lucide-react';

const Header = ({ darkMode, setDarkMode }) => {
  const { account, balance, connectWallet, disconnectWallet } = useWeb3();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 p-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3">CryptoChain</h1>
        <div className="d-flex align-items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-outline-light rounded-circle mr-3"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
          {account ? (
            <div className="dropdown" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-outline-primary d-flex align-items-center"
                aria-haspopup="true"
                aria-expanded={dropdownOpen ? 'true' : 'false'}
              >
                <Wallet size={18} />
                <span className="text-truncate ml-2" style={{ maxWidth: '150px' }}>
                  {account}
                </span>
                <ChevronDown size={18} />
              </button>
              {dropdownOpen && (
                <div
                  className={`dropdown-menu show ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
                  aria-labelledby="dropdownMenuButton"
                  style={{
                    position: 'absolute',
                    zIndex: 1000,
                    minWidth: '200px',
                  }}
                >
                  <div className={`dropdown-item d-flex align-items-center ${darkMode ? 'text-light' : 'text-dark'}`}>
                    <DollarSign size={14} className="mr-2" />
                    <span className="font-weight-bold">Balance:</span>
                    <span className="ml-2">{parseFloat(balance).toFixed(4)} ETH</span>
                  </div>
                  <a
                    href={`https://sepolia.etherscan.io/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`dropdown-item d-flex align-items-center ${darkMode ? 'text-light' : 'text-dark'}`}
                  >
                    <ExternalLink size={14} className="mr-2" />
                    View on Etherscan
                  </a>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setDropdownOpen(false);
                    }}
                    className={`dropdown-item d-flex align-items-center ${darkMode ? 'text-light' : 'text-dark'}`}
                  >
                    <LogOut size={14} className="mr-2" />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className={`btn ${darkMode ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
            >
              <Wallet className="mr-2" size={18} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
