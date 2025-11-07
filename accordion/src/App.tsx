import React, { useState, useRef, useEffect } from 'react';
import './Accordion.css';

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <button
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className={`accordion-icon ${isOpen ? 'rotated' : ''}`}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M4 6L8 10L12 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="accordion-content"
        style={{ height: `${height}px` }}
        aria-hidden={!isOpen}
      >
        <div className="accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

// Pre-built Accordion component for convenience
const Accordion = ({ items, multiple = false, className = '' }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleItem = (index) => {
    setOpenIndexes(current => {
      if (multiple) {
        return current.includes(index)
          ? current.filter(i => i !== index)
          : [...current, index];
      } else {
        return current.includes(index) ? [] : [index];
      }
    });
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

// Usage Examples
const Example1 = () => {
  // Using custom hook approach
  const { toggleItem, isItemOpen } = useAccordion();

  const items = [
    { title: "Item 1", content: "Content 1" },
    { title: "Item 2", content: "Content 2" },
    { title: "Item 3", content: "Content 3" }
  ];

  return (
    <div className="accordion">
      {items.map((item, index) => (
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
  );
};

const Example2 = () => {
  // Using pre-built Accordion component
  const faqItems = [
    {
      title: "How do I reset my password?",
      content: "Go to settings and click on 'Reset Password' to receive a reset link via email."
    },
    {
      title: "What is your refund policy?",
      content: "We offer 30-day money back guarantee for all purchases."
    },
    {
      title: "Do you offer technical support?",
      content: "Yes, we offer 24/7 technical support for all our customers."
    }
  ];

  return (
    <div>
      <h2>Single Open Accordion</h2>
      <Accordion items={faqItems} multiple={false} />
      
      <h2>Multiple Open Accordion</h2>
      <Accordion items={faqItems} multiple={true} />
    </div>
  );
};

export { Accordion, AccordionItem, useAccordion };