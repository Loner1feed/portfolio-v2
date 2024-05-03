export interface Item extends ShortItem {
  description: string;
  websiteUrl: string;
  repoUrl: string;
  stack: string[];
  imagePublicId?: string;
}

export interface ShortItem {
  title: string;
  id: string;
  imageUrl?: string;
}
