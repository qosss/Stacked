"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = true }: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);
        return (
          <div
            key={index}
            className={`border rounded-sm transition-colors ${
              isOpen ? "border-accent" : "border-border"
            }`}
          >
            <button
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-background-elevated transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-display font-bold text-text-primary">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-accent transition-transform duration-200 flex-shrink-0 ml-2 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-4 pb-4 text-text-primary text-sm leading-relaxed space-y-3">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
