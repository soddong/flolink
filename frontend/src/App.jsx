import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TemporaryStartPage from './pages/TemporaryStartPage';
import ChannelSelectPage from './pages/channel_select/channelselectpage';
import MainPage from './pages/main/MainPage';
import './index.css';
import LoginPage from './pages/login/Loginpage';
import FindAccount from './pages/login/FIndAccount';
import LoadingPage from './pages/loading/Loadingpage';
import PwResetPage from './pages/login/PwResetPage';
import ItemStorePage from './pages/item_store/ItemStorePage';
import SignupPage from './pages/login/SignupPage';
import FeedListPage from './pages/feed/FeedListPage';
import FeedCreatePage from './pages/feed/FeedCreatePage';
import SchedulePage from './pages/schedule/SchedulePage';
import FamilyGardenPage from './pages/garden/FamilyGardenPage';
import MyRoomPage from './pages/my_room/myRoomPage';
import PaymentPage from './pages/payment/PaymentPage';
import SettingPage from './pages/setting/SettingPage';
import LocationPage from './pages/location/LocationPage';
import UserCertPage from './pages/certificate/UserCertPage';

const router = createBrowserRouter([  
  {
    path : "/",
    element : 
    <UserCertPage>
      <TemporaryStartPage/>
    </UserCertPage>
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
    path : "/itemstore",
    element : <ItemStorePage />
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
  },
  {
    path: "/schedule",
    element : <SchedulePage />
  },
  {
    path: "/garden",
    element: <FamilyGardenPage />
  },
  {
    path: "/myroom",
    element: <MyRoomPage />
  },
  {
    path: "/payment",
    element: <PaymentPage />
  },
  {
    path: "/setting",
    element: <SettingPage />
  },
  {
    path: "/location",
    element: <LocationPage />
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