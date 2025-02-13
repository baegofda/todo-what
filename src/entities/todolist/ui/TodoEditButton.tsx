import { useCallback } from 'react';

import { TodoEditButtonProps } from '@/entities/todolist/model';

const TodoEditButton = ({ isEditMode, setIsEditMode }: TodoEditButtonProps) => {
  const onEditClick = useCallback(() => {
    setIsEditMode(true);
  }, [isEditMode]);

  return (
    <button
      type={'button'}
      className={'text-blue-400 cursor-pointer'}
      onClick={onEditClick}
    >
      {!isEditMode ? '수정' : '수정 완료'}
    </button>
  );
};

export default TodoEditButton;
