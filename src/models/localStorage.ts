export interface LocationResponse {
  id: string,
  search: string,
  address: string,
  placeId: string,
  coords: {
    lat: number,
    lng: number,
  },
  timestamp: string;
}