import { useEffect, useState } from 'react';

import { getTodoList } from '@/entities/todolist/api';
import { GetTodoListResponse } from '@/entities/todolist/model';

const useTodoList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<GetTodoListResponse>([]);

  const getTodos = async () => {
    try {
      const { data: todos } = await getTodoList();

      setTodos(todos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return { todos, setTodos, isLoading };
};

export default useTodoList;
