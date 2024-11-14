export interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  image: string;
  amenities: {
    icon: string;
    label: string;
  }[];
}

export interface Reservation {
  id: string;
  roomId: string;
  date: Date;
  startTime: string;
  endTime: string;
}