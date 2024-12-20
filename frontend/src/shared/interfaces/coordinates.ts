export interface Coordinates {
  id: string;
  name: string;
  lat: number;
  lng: number;
  userId: string
}

export interface CoordinatesViewModel {
  name: string;
  lat: number;
  lng: number
  userId: string
}