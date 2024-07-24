import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TemporaryStartPage from './pages/TemporaryStartPage';
import ChannelSelectPage from './pages/channelselectpage';
import MainPage from './pages/MainPage';
import './index.css';
import LoginPage from './pages/Loginpage';
import FindAccount from './pages/FIndAccount';
import LoadingPage from './pages/Loadingpage';

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
  },
  {
    path: "/main",
    element : <MainPage />
  },
  {
    path : "/FindAccount",
    element : <FindAccount />
  },
  {
    path : "/Loading",
    element : <LoadingPage />
  }
])

function App() {
    return (
      <div className="apps">
        <RouterProvider router={router} />
      </div>
    );
}

export default App;