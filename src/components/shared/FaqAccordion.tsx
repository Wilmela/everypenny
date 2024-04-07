"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/constants";

import { cn } from "@/lib/utils";
import { useState } from "react";

type QA = {
  question: string;
  answer: string;
};

const FaQAccordion = () => {
  const [selected, setSelected] = useState<QA | null>(null);

  return (
    <Accordion type="single" collapsible>
      {FAQ.map((ques: QA) => (
        <AccordionItem key={ques.question} value={ques.answer}>
          <AccordionTrigger
            onClick={() => {
              setSelected(ques);
            }}
          >
            <p className={cn("p-text font-semibold text-left")}>
              {ques.question}
            </p>
          </AccordionTrigger>
          {/* If the current question is selected, show its answer */}
          {selected === ques && (
            <AccordionContent>
              <p className={cn("text-APP_GREEN font-light leading-8")}>
                {ques.answer}
              </p>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaQAccordion;
