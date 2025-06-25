'use client'

import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export type Room = {
  _id: string
  name: string
  type: string
  capacity: number
}

interface Props {
  hotelId: string
  refreshTrigger?: unknown
}

export default function RoomsTable({ hotelId, refreshTrigger }: Props) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let ignore = false

    async function fetchRooms() {
      setLoading(true)
      try {
        const res = await fetch(`/api/hotels/${hotelId}/rooms`)
        const data: Room[] = await res.json()
        if (!ignore) {
          setRooms(data)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchRooms()

    return () => {
      ignore = true
    }
  }, [hotelId, refreshTrigger])

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'capacity', headerName: 'Capacity', type: 'number', flex: 1 },
  ]

  const rows = rooms.map((room) => ({ id: room._id, ...room }))

  return <DataGrid rows={rows} columns={columns} loading={loading} autoHeight />
}
