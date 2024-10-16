// src/components/ui/tooltip/TooltipContent.js

import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const TooltipContent = ({ children }) => {
  return (
    <Tooltip.Portal>
      <Tooltip.Content className="bg-gray-800 text-white text-sm p-2 rounded shadow-lg">
        {children}
        <Tooltip.Arrow className="fill-gray-800" />
      </Tooltip.Content>
    </Tooltip.Portal>
  );
};

export default TooltipContent;
