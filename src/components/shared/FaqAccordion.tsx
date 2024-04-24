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
  answer: { main: string; points: string[] };
};

const FaQAccordion = () => {
  const [selected, setSelected] = useState<QA | null>(null);

  return (
    <Accordion type="single" collapsible>
      {FAQ.map((ques: QA) => (
        <AccordionItem key={ques.question} value={ques.answer.main}>
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
              <>
                <p className={cn("text-APP_GREEN font-light leading-8")}>
                  {ques.answer.main}
                </p>
                {ques.answer.points.map((point: string) => (
                  <div key={point} className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-APP_GREEN" />
                    <p className="font-cambay font-[400] leading-[1.5rem]">
                      {point}
                    </p>
                  </div>
                ))}
              </>
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaQAccordion;
