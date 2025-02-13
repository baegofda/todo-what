import { ChangeEvent, FormEvent, useState } from 'react';

import { getTodoList, postTodo } from '@/entities/todolist/api';
import { Todo, TodoInputProps } from '@/entities/todolist/model';

const TodoInput = ({ setTodos }: TodoInputProps) => {
  const [todoContent, setTodoContent] = useState<Todo['content']>('');

  const onSubmit = async () => {
    setTodoContent('');

    try {
      await postTodo({ content: todoContent });
      const { data: todos } = await getTodoList();

      setTodos(todos);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(event.target.value);
  };

  return (
    <form
      className={'flex items-center gap-x-2'}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit();
      }}
    >
      <input
        className={'border rounded-sm'}
        value={todoContent}
        onChange={onChange}
      />
      <button type={'submit'} className={'cursor-pointer'}>
        등록 하기
      </button>
    </form>
  );
};

export default TodoInput;
