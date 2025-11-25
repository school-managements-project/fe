import './App.css';
import AppRoute from './routes';
import { ToastContainer } from 'react-toastify';
function App() {
    return (
        <>
            <AppRoute />
            <ToastContainer />
        </>
    );
}

export default App;
