import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import TodoPage from './TodoPage';

function RouterView() {
  return (
    <Routes>
      <Route path={"/"} element={<LoginPage />} />
      <Route path={"/todo"} element={<TodoPage />} />

      {/* <Route path={'*'} element={<NotFound />} /> */}
    </Routes>
  );
}

export default RouterView;