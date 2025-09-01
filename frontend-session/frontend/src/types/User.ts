export interface User {
  _id: string;
  name: string;
  username: string;
  address: string;
  __v: number;
  // Additional fields for enhanced UI
  image?: string;
  description?: string;
}
