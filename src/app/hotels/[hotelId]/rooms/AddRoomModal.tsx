'use client'

import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'

type Props = { hotelId: string }

export default function AddRoomModal({ hotelId }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [capacity, setCapacity] = useState(1)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch(`/api/hotels/${hotelId}/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, capacity: Number(capacity) }),
    })
    setOpen(false)
    router.refresh()
    setName('')
    setType('')
    setCapacity(1)
  }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Room
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Room</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
              <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required fullWidth />
              <TextField label="Type" value={type} onChange={e => setType(e.target.value)} required fullWidth />
              <TextField label="Capacity" type="number" value={capacity} onChange={e => setCapacity(parseInt(e.target.value, 10))} required fullWidth inputProps={{ min: 1 }} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
