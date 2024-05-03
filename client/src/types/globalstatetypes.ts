export type userData = {
  username: string;
  email: string;
  id: string;
  profileUrl: string;
};

export type sideBarUsers = {
  email: string;
  username: string;
  profileUrl: string;
  id: string;
  conversationsId: string;
  createdAt: string;
  updatedAt: string;
};

export type message = {
  id: string;
  senderId: string;
  recieverId: string;
  message: string;
  createdAt: string;
};
