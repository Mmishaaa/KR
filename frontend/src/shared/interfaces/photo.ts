export interface Photo {
  id: string
  isAvatar: boolean;
  photoURL: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PhotoViewModel {
  img: File;
  isAvatar: boolean;
  userId: string
}