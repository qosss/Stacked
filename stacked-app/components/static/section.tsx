import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-text-primary text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}
