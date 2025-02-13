import { ChangeEvent, FormEvent, useCallback } from 'react';

import {
  PatchTodoListParams,
  TodoContentProps,
} from '@/entities/todolist/model';
import { getTodoList, patchTodo } from '@/entities/todolist/api';

const TodoContent = ({
  isEditMode,
  content,
  setValue,
  setTodos,
  setIsEditMode,
  id,
}: TodoContentProps) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue],
  );

  const onEditSubmit = useCallback(
    async ({ id, content }: Pick<PatchTodoListParams, 'content' | 'id'>) => {
      try {
        await patchTodo({ id, content });
        const { data: todos } = await getTodoList();

        setIsEditMode(false);
        setTodos(todos);
      } catch (error) {
        console.error(error);
      }
    },
    [setTodos, setIsEditMode],
  );

  if (isEditMode) {
    return (
      <form
        className={'flex items-center gap-x-2'}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          onEditSubmit({ id, content });
        }}
      >
        <input className={'border'} value={content} onChange={onChange} />
      </form>
    );
  }

  return <span className={'font-medium'}>{content}</span>;
};

export default TodoContent;
