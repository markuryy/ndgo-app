import React, { createContext, useContext, useState } from 'react';

const BlurContext = createContext({
  isBlurred: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleBlur: () => {}
});

export const BlurProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isBlurred, setIsBlurred] = useState(true);

  const toggleBlur = () => setIsBlurred(!isBlurred);
  return (
    <BlurContext.Provider value={{ isBlurred, toggleBlur }}>
      {children}
    </BlurContext.Provider>
  );
};

export const useBlur = () => useContext(BlurContext);