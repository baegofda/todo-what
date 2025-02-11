import { TODO_LIST_STATUS } from '@/entities/todolist/consts';

export type TodoListStatus =
  (typeof TODO_LIST_STATUS)[keyof typeof TODO_LIST_STATUS];

export interface TodoList {
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
  created_by: string;
}

export interface GetTodoListResponse extends Array<TodoList> {}

export interface PostTodoListParams extends Pick<TodoList, 'content'> {}

export interface PatchTodoListParams
  extends Pick<TodoList, 'id'>,
    Partial<Pick<TodoList, 'content' | 'status' | 'start_date' | 'due_date'>> {}

export interface DeleteTodoListParams extends Pick<TodoList, 'id'> {}
