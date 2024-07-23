import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TemporaryStartPage from './pages/TemporaryStartPage';
import ChannelSelectPage from './pages/channelselectpage';
import './index.css';

const router = createBrowserRouter([
  {
    path : "/",
    element : <TemporaryStartPage/>
  },
  {
    path : "/test",
    element : <ChannelSelectPage/>
  }
])

function App() {
    return (
        <div className="root">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;