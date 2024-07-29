import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TemporaryStartPage from './pages/TemporaryStartPage';
import ChannelSelectPage from './pages/channel_select/channelselectpage';
import MainPage from './pages/main/MainPage';
import './index.css';
import LoginPage from './pages/login/Loginpage';
import FindAccount from './pages/login/FIndAccount';
import LoadingPage from './pages/loading/Loadingpage';
import PwResetPage from './pages/login/PwResetPage';
import SettingPage from './pages/item_store/settingpage';
import SignupPage from './pages/login/SignupPage';
import FeedListPage from './pages/feed/FeedListPage';
import FeedCreatePage from './pages/feed/FeedCreatePage';

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
  },
  {
    path : "/PwReset",
    element : <PwResetPage />
  },
  {
    path : "/setting",
    element : <SettingPage />
  },
  {
    path : "/signup",
    element : <SignupPage />
  },
  {
    path : "/feedlist",
    element : <FeedListPage />
  },
  {
    path : "/feedcreate",
    element : <FeedCreatePage />
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