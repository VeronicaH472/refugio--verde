/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import ActiveWorkspace from './components/ActiveWorkspace';

export default function App() {
  const [userName, setUserName] = useState<string>('');
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Restore session from localStorage if available
  useEffect(() => {
    const savedName = localStorage.getItem('refugio_verde_user_name');
    if (savedName) {
      setUserName(savedName);
      setHasEntered(true);
    }
  }, []);

  const handleEnterPortal = (name: string) => {
    setUserName(name);
    setHasEntered(true);
    localStorage.setItem('refugio_verde_user_name', name);
  };

  const handleExitPortal = () => {
    setHasEntered(false);
    setUserName('');
    localStorage.removeItem('refugio_verde_user_name');
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9F5]">
      {hasEntered ? (
        <ActiveWorkspace userName={userName} onExit={handleExitPortal} />
      ) : (
        <IntroScreen onEnterPortal={handleEnterPortal} />
      )}
    </div>
  );
}

