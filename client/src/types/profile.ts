// Profile Types - No imports needed here

export interface Profile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  headline?: string;
  bio?: string;
  skills?: string[];
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  location?: string;
}

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Profile;
}
