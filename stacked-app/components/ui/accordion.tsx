"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  question: string;
  answer: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItemComponent
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}

interface AccordionItemProps {
  question: string;
  answer: string | React.ReactNode;
}

function AccordionItemComponent({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded bg-background-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-background-elevated transition-colors text-left"
        aria-expanded={isOpen}
        aria-controls={`accordion-item-${question}`}
      >
        <span className="font-mono text-sm font-bold text-text-primary">
          {question}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-text-secondary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div
          id={`accordion-item-${question}`}
          className="px-6 pb-4 pt-2 text-sm leading-relaxed text-text-primary border-t border-border"
        >
          {answer}
        </div>
      )}
    </div>
  );
}
