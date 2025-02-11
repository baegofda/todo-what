import { supabase } from '@/app/supabase/config';
import {
  DeleteTodoListParams,
  GetTodoListResponse,
  PatchTodoListParams,
  PostTodoListParams,
} from '@/entities/todolist/model';

// function call, trigger 전환하기
export const getTodoList = async () => {
  const { data, error } = await supabase.from('todo_list').select('*');

  if (error) {
    throw error;
  }

  return data as GetTodoListResponse;
};

export const postTodo = async ({ content }: PostTodoListParams) => {
  const { data, error } = await supabase
    .from('todo_list')
    .insert({
      content,
    })
    .select('*');

  if (error) {
    throw error;
  }

  return data as GetTodoListResponse;
};

export const patchTodo = async ({
  id,
  content,
  status,
  start_date,
  due_date,
}: PatchTodoListParams) => {
  const { data, error } = await supabase
    .from('todo_list')
    .update({
      content,
      status,
      start_date,
      due_date,
    })
    .eq('id', id)
    .select('*');

  if (error) {
    throw error;
  }

  return data as GetTodoListResponse;
};

export const deleteTodo = async ({ id }: DeleteTodoListParams) => {
  const { data, error } = await supabase
    .from('todo_list')
    .update({
      is_deleted: true,
    })
    .eq('id', id)
    .select('*');

  if (error) {
    throw error;
  }

  return data as GetTodoListResponse;
};
