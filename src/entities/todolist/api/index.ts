import { supabase } from '@/app/supabase/config';
import {
  DeleteTodoListParams,
  GetTodoListResponse,
  PatchTodoListParams,
  PostTodoListParams,
} from '@/entities/todolist/model';
import { TODO_LIST_STATUS } from '@/entities/todolist/consts';

// function call, trigger 전환하기
export const getTodoList = async () => {
  const { data, error } = await supabase
    .from('todo_list')
    .select('*')
    .is('is_deleted', false);

  if (error) {
    throw error;
  }

  return { data } as { data: GetTodoListResponse };
};

export const postTodo = async ({ content }: PostTodoListParams) => {
  const { error } = await supabase.from('todo_list').insert({
    content,
  });

  if (error) {
    throw error;
  }
};

export const patchTodo = async ({
  id,
  content,
  is_completed,
  start_date,
  due_date,
}: PatchTodoListParams) => {
  const status = is_completed
    ? TODO_LIST_STATUS['COMPLETED']
    : TODO_LIST_STATUS['COMPLETED_YET'];
  const { error } = await supabase
    .from('todo_list')
    .update({
      content,
      status,
      is_completed,
      start_date,
      due_date,
    })
    .eq('id', id);

  if (error) {
    throw error;
  }
};

export const deleteTodo = async ({ id }: DeleteTodoListParams) => {
  const { error } = await supabase
    .from('todo_list')
    .update({
      is_deleted: true,
    })
    .eq('id', id);

  if (error) {
    throw error;
  }
};
