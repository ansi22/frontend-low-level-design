import React, { useState } from 'react';
import './Accordion.css';

// Custom hook for accordion logic
const useAccordion = (options = {}) => {
  const { multiple = false, defaultOpen = [] } = options;
  const [openIndexes, setOpenIndexes] = useState(defaultOpen);

  const toggleItem = (index) => {
    setOpenIndexes(currentOpenIndexes => {
      if (multiple) {
        return currentOpenIndexes.includes(index)
          ? currentOpenIndexes.filter(i => i !== index)
          : [...currentOpenIndexes, index];
      } else {
        return currentOpenIndexes.includes(index) ? [] : [index];
      }
    });
  };

  const isItemOpen = (index) => openIndexes.includes(index);

  return { toggleItem, isItemOpen, openIndexes };
};

// Standalone AccordionItem component
const AccordionItem = ({ 
  title, 
  children, 
  isOpen, 
  onToggle,
  className = '' 
}) => {
  return (
    <div className={`accordion-item ${className}`}>
      <button
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div 
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

// Usage Example
const App = () => {
  const { toggleItem, isItemOpen } = useAccordion({ multiple: false });

  const accordionData = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces."
    },
    {
      title: "Why use React?",
      content: "React offers component-based architecture, virtual DOM, and great performance."
    },
    {
      title: "How to get started?",
      content: "Use Create React App or Vite to bootstrap your React project."
    }
  ];

  return (
    <div className="accordion-wrapper">
      <h1>FAQ</h1>
      <div className="accordion">
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            isOpen={isItemOpen(index)}
            onToggle={() => toggleItem(index)}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default App;