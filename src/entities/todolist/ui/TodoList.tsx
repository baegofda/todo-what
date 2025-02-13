import LoadingSpinner from '@/widgets/LoadingSpinner.tsx';
import TodoInput from '@/entities/todolist/ui/TodoInput.tsx';
import TodoItem from '@/entities/todolist/ui/TodoItem.tsx';
import useTodoList from '@/entities/todolist/hooks/useTodoList.ts';

const TodoList = () => {
  const { todos, setTodos, isLoading } = useTodoList();

  if (isLoading)
    return (
      <div className={'flex flex-x-1'}>
        데이터 불러오는 중...
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <TodoInput setTodos={setTodos} />
      {todos.length > 0 ? (
        <ul className={'flex flex-col gap-y-2'}>
          {todos.map(({ id, content, is_completed }) => (
            <TodoItem
              key={id}
              id={id}
              content={content}
              is_completed={is_completed}
              setTodos={setTodos}
            />
          ))}
        </ul>
      ) : (
        <div>없음!! 등록하셈</div>
      )}
    </>
  );
};

export default TodoList;
