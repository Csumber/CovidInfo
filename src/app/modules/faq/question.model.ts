export interface Question {
  header: string;
  content: string;
  category: string;
}

export interface Category {
  category: string;
  questions: Question[];
}
