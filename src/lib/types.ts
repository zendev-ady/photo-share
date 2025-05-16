export interface Gallery {
  id: string;
  unique_id: string;
  pin: string;
  title?: string;
  created_at: string;
  expires_at: string;
  max_photos: number;
  is_premium: boolean;
}

export interface Photo {
  id: string;
  gallery_id: string;
  filename: string;
  original_url: string;
  thumbnail_url?: string;
  metadata?: any;
  file_size?: number;
  mime_type?: string;
  uploaded_at: string;
}