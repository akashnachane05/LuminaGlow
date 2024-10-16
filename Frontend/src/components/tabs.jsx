import React, { useState } from 'react';

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="tabs">
      {React.Children.map(children, (child) => {
        if (child.type === TabsList || child.type === TabsContent) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="tabs-list">
      {React.Children.map(children, (child) => {
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsTrigger = ({ children, value, activeTab, setActiveTab }) => {
  return (
    <button
      className={`tabs-trigger ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, activeTab }) => {
  if (value !== activeTab) return null;
  return <div className="tabs-content">{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };