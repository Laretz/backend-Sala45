export interface Room {
  id: number;
  name: string;
  capacity: number;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoomData {
  name: string;
  capacity: number;
  location?: string;
}

export interface UpdateRoomData {
  name: string;
  capacity: number;
  location?: string;
}