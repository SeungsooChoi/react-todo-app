import { useCallback, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 0; i < 2500; i++) {
    array.push({
      id: i,
      text: `할 일${i}`,
      checked: false,
    });
  }

  return array;
}

const App = () => {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트 기초 다지기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '앱 만들기',
  //     checked: false,
  //   },
  // ]);
  const [todos, setTodos] = useState(createBulkTodos);

  // id는 렌더링되는 정보가 아니므로 useRef로 관리
  const nextId = useRef(4);
  // const nextId = useRef(2501);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };

      setTodos((todos) => todos.concat(todo)); // 새로운 배열을 만들어서 setTodos
      nextId.current++;
    },
    [], // 함수 안에서 todos에 의존성이 있음.
  );

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos(
      // 불변성 유지하면서 특정 배열 원소를 업데이트하기 위해 map 사용
      (todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
