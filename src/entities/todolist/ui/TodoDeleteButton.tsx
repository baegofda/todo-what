import {
  DeleteTodoListParams,
  TodoDeleteButtonProps,
} from '@/entities/todolist/model';
import { deleteTodo, getTodoList } from '@/entities/todolist/api';

const TodoDeleteButton = ({ id, setTodos }: TodoDeleteButtonProps) => {
  const onDelete = async ({ id }: DeleteTodoListParams) => {
    try {
      await deleteTodo({ id });
      const { data: todos } = await getTodoList();

      setTodos(todos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type={'button'}
      className={'text-red-500 cursor-pointer'}
      onClick={() => onDelete({ id })}
    >
      삭제
    </button>
  );
};

export default TodoDeleteButton;
