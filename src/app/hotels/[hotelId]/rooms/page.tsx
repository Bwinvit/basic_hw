import AddRoomModal from './AddRoomModal'
import RoomsTable, { Room } from './RoomsTable'

interface Params {
  params: { hotelId: string }
}

export default async function RoomsPage({ params }: Params) {
  const res = await fetch(`http://localhost:3000/api/hotels/${params.hotelId}/rooms`, { cache: 'no-store' })
  const rooms: Room[] = await res.json()

  return (
    <div style={{ padding: '16px' }}>
      <AddRoomModal hotelId={params.hotelId} />
      <div style={{ marginTop: '16px' }}>
        <RoomsTable rooms={rooms} />
      </div>
    </div>
  )
}
