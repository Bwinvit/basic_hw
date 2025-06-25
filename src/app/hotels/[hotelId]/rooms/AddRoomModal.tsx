"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material"

type Props = {
  hotelId: string
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddRoomModal({
  hotelId,
  open,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [capacity, setCapacity] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedCapacity = Number(capacity)
    if (!name || !type || Number.isNaN(parsedCapacity)) {
      return
    }

    await fetch(`/api/hotels/${hotelId}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, capacity: parsedCapacity }),
    })

    onSuccess()
    onClose()

    setName("")
    setType("")
    setCapacity("")
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Room</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              fullWidth
              inputProps={{ min: 1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
