'use client'

import { useState } from 'react'
import { Button } from '@mui/material'
import AddRoomModal from './AddRoomModal'
import RoomsTable, { type Room } from './RoomsTable'
import { useRouter } from 'next/navigation'

interface Props {
  hotelId: string
  rooms: Room[]
}

export default function RoomsPageClient({ hotelId, rooms }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSuccess = () => {
    router.refresh()
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
        <RoomsTable rooms={rooms} />
      </div>
    </div>
  )
}
