"use client";

import { baseUrl } from "@/lib/utils";
import { User } from "@/types";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";

//TData
// const baseUrl = process.env.CLOUDINARY_IMAGE_URL as string
const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("sn", {
    header: () => "S/N",
    cell: (info) => {
      const val = Number(info.row.id) + 1;
      return val;
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("firstName", {
    header: () => "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
  }),
  columnHelper.accessor("regId", {
    header: "Reg. ID",
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue().toUpperCase(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.imageUrl, {
    id: "imageUrl",
    cell: (info) => {
      // console.log(info.row.original.imageUrl);
      return (
        <div className="size-10 border border-APP_GRREN overflow-hidden rounded-full relative">
          <Image
            src={`${baseUrl}${info.getValue()}`}
            fill
            alt="user"
            className="object-cover"
          />
        </div>
      );
    },
    header: () => <span>Image</span>,
    footer: (info) => info.column.id,
  }),
];

const UsersTable = ({ users }: { users: User[] }) => {
  const [data, _setData] = useState(() => [...users]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-APP_GREEN text-white text-left"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className="h-4" />
    </>
  );
};

export default UsersTable;
