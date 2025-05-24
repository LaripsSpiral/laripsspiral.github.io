export interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  organize?: string[];
  platform?: string[];
  link: string;
  date: string;
}

export type ProjectCreateInput = Omit<Project, 'id'>;
export type ProjectUpdateInput = Partial<Project>;
