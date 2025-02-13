import { Dispatch, SetStateAction } from 'react';

import { TODO_LIST_STATUS } from '@/entities/todolist/consts';

export type TodoListStatus =
  (typeof TODO_LIST_STATUS)[keyof typeof TODO_LIST_STATUS];

export interface Todo {
  id: string;
  content: string;
  status: TodoListStatus;
  start_date: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string | null;
  completed_at: string | null;
  deleted_at: string | null;
  is_deleted: boolean;
  is_completed: boolean;
  created_by: string;
}

export interface GetTodoListResponse extends Array<Todo> {}

export interface PostTodoListParams extends Pick<Todo, 'content'> {}

export interface PatchTodoListParams
  extends Pick<Todo, 'id'>,
    Partial<
      Pick<Todo, 'content' | 'is_completed' | 'start_date' | 'due_date'>
    > {}

export interface DeleteTodoListParams extends Pick<Todo, 'id'> {}

export interface TodoInputProps {
  setTodos: Dispatch<SetStateAction<GetTodoListResponse>>;
}

export interface TodoItemProps
  extends Pick<Todo, 'id' | 'is_completed' | 'content'> {
  setTodos: Dispatch<SetStateAction<GetTodoListResponse>>;
}

export interface TodoCheckboxProps
  extends Pick<TodoItemProps, 'id' | 'is_completed' | 'setTodos'> {}

export interface TodoContentProps
  extends Pick<TodoItemProps, 'id' | 'setTodos' | 'content'> {
  isEditMode: boolean;
  setValue: Dispatch<SetStateAction<Todo['content']>>;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

export interface TodoEditButtonProps {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

export interface TodoDeleteButtonProps
  extends Pick<TodoItemProps, 'id' | 'setTodos'> {}
