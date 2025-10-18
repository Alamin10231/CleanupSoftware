// src/types/building.types.ts

export interface Apartment {
  id: number;
  apartment_number: string;
  floor: number;
  living_rooms: number;
  bathrooms: number;
  outdoor_area: boolean;
  postcode: string;
  location: string;
  client: number;
  building: number;
}

export interface Building {
  id: number;
  apartments: Apartment[];
  region_name: string;
  total_apartments: number;
  active_apartments_in_building: number;
  name: string;
  type: "residential" | "commercial";
  city: string;
  location: string;
  latitude: string;
  longitude: string;
  created_at: string;
  region: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
