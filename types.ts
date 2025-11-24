export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type POIType = 'red' | 'ecology' | 'folk';

export interface PointOfInterest {
  id: string;
  name: string;
  local_name: string;
  type: POIType;
  desc: string;
  location: string;
  images: string[];
  video: string;
  recognizable: string[];
  duration: string;
  open_time: string;
  tips: string;
  related_knowledge: string[];
  related_pois: string[];
  lat: number;
  lng: number;
  image: string; // Keep a primary image for cards
}

export interface TourRoute {
  id: string;
  name: string;
  local_name: string;
  type: string;
  desc: string;
  location: string;
  images: string[];
  video: string;
  recognizable: string[];
  duration: string;
  open_time: string;
  tips: string;
  related_knowledge: string[];
  related_pois: string[];
  route_config: {
    type: string;
    difficulty: string;
    target_audience: string[];
    theme?: string;
    highlight?: string;
    service_items: string[];
  };
  image: string; // Keep a primary image for cards
}


export interface NavigationStep {
  text: string;
  lat: number;
  lng: number;
}

export interface Route {
  instructions: NavigationStep[];
  polyline: [number, number][];
}

export interface POIDetail {
  story: string;
  subTopics: {
    title: string;
    content: string;
  }[];
}