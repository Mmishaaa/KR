import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/appRouter";
import { useEffect } from "react";
import { check, setIsAuth } from "../state/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(check()).then((data: boolean) => {
      dispatch(setIsAuth(data));
    });
  }, [dispatch]);


  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App
