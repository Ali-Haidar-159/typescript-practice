type User = {
  id: string;
  name: string;
};

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;

  user: User;
}

export type { Task }; // Task is a type . so i have to say explicitly when i export it. so i use -> export type
