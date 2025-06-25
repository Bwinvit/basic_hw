"use client"

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

export type Hotel = {
  _id: string;
  name: string;
  city: string;
};

type Props = {
  hotels: Hotel[];
};

export default function HotelsTable({ hotels }: Props) {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link href={`/hotels/${params.row.id}/rooms`}>Rooms</Link>
      ),
      width: 150,
    },
  ];

  const rows = hotels.map((hotel) => ({
    id: hotel._id,
    name: hotel.name,
    city: hotel.city,
  }));

  return <DataGrid rows={rows} columns={columns} autoHeight />;
}
