import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  /**
   * 재사용을 위해 useCallback
   * props로 전달해야 할 함수는 useCallback 사용을 습관화.
   */
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); // value값 초기화

      // submit 이벤트가 브라우저 새로고침 발생하는것을 막음
      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={handleSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={handleChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
