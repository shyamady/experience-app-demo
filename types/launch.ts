export interface LaunchProduct {
  category: string;
  title: string;
  description: string;
  price: number;
  capacity: string;
  imageQuery: string;
  imageUrl?: string;
}

export interface LaunchResponse {
  heroTitle: string;
  heroDescription: string;
  estimatedRevenue: string;
  products: LaunchProduct[];
}

export interface GenerateLaunchRequest {
  activity: string;
  frequency: string;
  participation: string[];
}
