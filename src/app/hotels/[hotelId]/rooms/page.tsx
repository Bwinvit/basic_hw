import RoomsPageClient from './RoomsPageClient'
import { Room } from './RoomsTable'

interface Params {
  params: { hotelId: string }
}

export default async function RoomsPage({ params }: Params) {
  const res = await fetch(
    `http://localhost:3000/api/hotels/${params.hotelId}/rooms`,
    { cache: 'no-store' }
  )
  const rooms: Room[] = await res.json()

  return <RoomsPageClient hotelId={params.hotelId} rooms={rooms} />
}
