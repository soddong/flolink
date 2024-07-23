import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TemporaryStartPage from './pages/TemporaryStartPage';
import ChannelSelectPage from './pages/channelselectpage';
import './index.css';
import LoginPage from './pages/Loginpage';

const router = createBrowserRouter([  
  {
    path : "/",
    element : <TemporaryStartPage/>
  },
  {
    path : "/test",
    element : <ChannelSelectPage/>
  },
  {
    path : "/login",
    element : <LoginPage/>
  }
])

function App() {
    return (
      <div className="root APP">
        <RouterProvider router={router} />
      </div>
    );
}

export default App;