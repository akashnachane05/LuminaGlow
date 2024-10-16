// src/components/ui/tooltip/TooltipProvider.js

import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const TooltipProvider = ({ children }) => {
  return (
    <Tooltip.Provider>
      {children}
    </Tooltip.Provider>
  );
};

export default TooltipProvider;
