type User = {
  id: string;
  name: string;
};

interface Task {
  id: string;
  title: string;
  description: string;
  department: string;
  status: string;
  user: User;
}

export type { Task };
