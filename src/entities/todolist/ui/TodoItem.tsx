import { useState } from 'react';
import { motion } from 'motion/react';

import { Todo, TodoItemProps } from '@/entities/todolist/model';
import TodoCheckbox from '@/entities/todolist/ui/TodoCheckbox.tsx';
import TodoDeleteButton from '@/entities/todolist/ui/TodoDeleteButton.tsx';
import TodoEditButton from '@/entities/todolist/ui/TodoEditButton.tsx';
import TodoContent from '@/entities/todolist/ui/TodoContent.tsx';

const TodoItem = ({ id, is_completed, content, setTodos }: TodoItemProps) => {
  const [value, setValue] = useState<Todo['content']>(content);
  const [isEditMode, setIsEditMode] = useState(false);

  const variants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        opacity: {
          duration: 0.4,
          delay: 0.4,
        },
      },
    },
  };

  return (
    <motion.li
      variants={variants}
      initial={'initial'}
      animate={'in'}
      className={'list-disc flex items-center gap-x-3'}
    >
      <TodoCheckbox id={id} is_completed={is_completed} setTodos={setTodos} />
      <TodoContent
        content={value}
        isEditMode={isEditMode}
        setValue={setValue}
        setTodos={setTodos}
        id={id}
        setIsEditMode={setIsEditMode}
      />
      {!isEditMode && (
        <>
          <TodoEditButton
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
          <TodoDeleteButton id={id} setTodos={setTodos} />
        </>
      )}
    </motion.li>
  );
};

export default TodoItem;
