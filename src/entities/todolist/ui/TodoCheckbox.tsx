import { useCallback } from 'react';

import {
  PatchTodoListParams,
  TodoCheckboxProps,
} from '@/entities/todolist/model';
import { getTodoList, patchTodo } from '@/entities/todolist/api';

const TodoCheckbox = ({ is_completed, id, setTodos }: TodoCheckboxProps) => {
  const onComplete = useCallback(
    async ({
      id,
      is_completed,
    }: Pick<PatchTodoListParams, 'is_completed' | 'id'>) => {
      try {
        await patchTodo({ id, is_completed: !is_completed });
        const { data: todos } = await getTodoList();

        setTodos(todos);
      } catch (error) {
        console.error(error);
      }
    },
    [setTodos],
  );

  return (
    <label htmlFor={id} className={'flex'}>
      <input
        id={id}
        className={'peer hidden'}
        type={'checkbox'}
        checked={is_completed}
        onChange={() => onComplete({ id, is_completed })}
      />
      <div className={'bg-gray-300 w-4 h-4 peer-checked:bg-green-500'} />
    </label>
  );
};

export default TodoCheckbox;
