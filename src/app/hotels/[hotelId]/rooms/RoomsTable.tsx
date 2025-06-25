'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid'

export type Room = {
  _id: string
  name: string
  type: string
  capacity: number
}

export default function RoomsTable({ rooms }: { rooms: Room[] }) {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'capacity', headerName: 'Capacity', type: 'number', flex: 1 },
  ]

  const rows = rooms.map((room) => ({ id: room._id, ...room }))

  return <DataGrid rows={rows} columns={columns} autoHeight />
}
