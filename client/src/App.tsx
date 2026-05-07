import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return <>
   <ToastContainer position="top-right" autoClose={2000} />
  <AppRouter />;
  </>
}

export default App;