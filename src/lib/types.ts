export interface Bookmark {
  id: string;
  url: string;
  title: string;
  tags: string[];
  isRead: boolean;
  deadline?: string;
  createdAt: string;
}

export interface Dashboard {
  totalLinks: number;
  totaltags: number;
  upcomingLinks: number;
}