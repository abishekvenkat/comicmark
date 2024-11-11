export interface Bookmark {
  id: string;
  url: string;
  title: string;
  gangs: string[];
  isRead: boolean;
  deadline?: string;
  createdAt: string;
}

export interface Dashboard {
  totalLinks: number;
  totalGangs: number;
  upcomingLinks: number;
}