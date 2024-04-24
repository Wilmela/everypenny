"use client";

import React, { ChangeEventHandler, useState } from "react";
import { StatementProp } from "@/types";
import { generatePDF } from "@/lib/utils";
import { Button } from "../ui/button";
import { ButtonGradientWrapper } from "../blocks/ButtonGradientWrapper";
import { generateReceiptPerMonth } from "@/lib/actions/user.action.";

const Statement = ({ user, sum }: { user: any; sum: number }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [contributions, setContributions] = useState<StatementProp[]>([]);
  const min = "2024-06-07T00:00";
  const max = "2026-06-14T00:00";

  // Fetch data only when both fromDate and toDate have values
  const fetchData = async () => {
    try {
      if (fromDate && toDate) {
        const res: any = await generateReceiptPerMonth(
          user._id,
          new Date(fromDate),
          new Date(toDate)
        );
        setContributions(res.contributions);
      }
    } catch (error) {
      throw error;
    }
  };

  // Call fetchData on component mount and whenever fromDate or toDate changes
  React.useEffect(() => {
    fetchData();
  }, [user._id, fromDate, toDate]);

  // Generate pdf
  const handleGeneratePDF = () => {
    generatePDF(contributions, sum, fromDate, toDate);
  };
  return (
    <div>
      <form action="">
        <div className="flex gap-2 justify-center pb-6 ">
          <label htmlFor="from" className="label">
            From
            <input
              name="from"
              type="date"
              min={min}
              max={max}
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                // Call fetchData after setting fromDate
                fetchData();
              }}
              className="date"
            />
          </label>

          <label htmlFor="to" className="label">
            To
            <input
              name="to"
              type="date"
              min={min}
              max={max}
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                // Call fetchData after setting toDate
                fetchData();
              }}
              className="date"
            />
          </label>
        </div>

        <ButtonGradientWrapper>
          <Button
            className="form-btn w-fit"
            size="lg"
            onClick={handleGeneratePDF}
          >
            Statement
          </Button>
        </ButtonGradientWrapper>
      </form>
    </div>
  );
};

export default Statement;
