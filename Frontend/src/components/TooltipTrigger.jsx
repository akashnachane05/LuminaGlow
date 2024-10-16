
// src/components/ui/tooltip/TooltipTrigger.js

import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const TooltipTrigger = ({ children }) => {
  return (
    <Tooltip.Trigger asChild>
      {children}
    </Tooltip.Trigger>
  );
};

export default TooltipTrigger;
