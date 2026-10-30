
export interface Certification {
  id: string;
  title: string;
  organization: string;
  category: string;
  categorySlug: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  skills: string[];
  link: string;
  featured?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
}
