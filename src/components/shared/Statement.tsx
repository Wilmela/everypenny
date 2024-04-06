"use client";

import React from "react";
import { StatementProp } from "@/types";
import { generatePDF } from "@/lib/utils";
import { Button } from "../ui/button";

const Statement = ({
  userContributions,
}: {
  userContributions: StatementProp[];
}) => {
  const handleGeneratePDF = () => {
    generatePDF(userContributions);
  };
  return (
    <Button className="form-btn w-fit" size="lg" onClick={handleGeneratePDF}>
      Statement
    </Button>
  );
};

export default Statement;

// const GenerateStatementButton = ({
//   onGeneratePDF,
// }: {
//   onGeneratePDF: () => void;
// }) => {
//   return (
//     <Button className="btn w-fit" size="lg" onClick={onGeneratePDF}>
//       Statement
//     </Button>
//   );
// };

// const RenderStatement = () => {
//   const statements = [
//     {
//       id: "1",
//       amount: "100",
//       status: "Verified",
//       createdAt: new Date(),
//     },
//     {
//       id: "1",
//       amount: "100",
//       status: "Not verified",
//       createdAt: new Date(),
//     },
//   ];

//   return (
//     <div className="container">
//       {statements.length === 0 ? (
//         "You currently have no tickets created"
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Amount</th>
//               <th scope="col">Status</th>
//               <th scope="col">Date</th>
//               <th scope="col"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {statements.map((statement: StatementProp) => (
//               <tr key={statement.id}>
//                 <td>{statement.id}</td>
//                 <td>{statement.contributionId}</td>
//                 <td>{statement.amount}</td>
//                 <td>{statement.plan}</td>
//                 <td>{statement.verifiedContribution}</td>
//                 <td>{statement.dateOfContribution}</td>
//                 {/* <td>{statement.createdAt}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };
