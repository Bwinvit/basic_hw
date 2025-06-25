'use client'

import { useState } from 'react'
import { Button } from '@mui/material'
import AddRoomModal from './AddRoomModal'
import RoomsTable from './RoomsTable'

interface Props {
  hotelId: string
}

export default function RoomsPageClient({ hotelId }: Props) {
  const [open, setOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div style={{ padding: '16px' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Room
      </Button>
      <AddRoomModal
        hotelId={hotelId}
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
      />
      <div style={{ marginTop: '16px' }}>
        <RoomsTable
          hotelId={hotelId}
          refreshTrigger={refreshTrigger}
          onDeleteSuccess={handleSuccess}
        />
      </div>
    </div>
  )
}
