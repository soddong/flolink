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
import PaymentSuccessPage from './pages/payment/PaymentSuccessPage';
import SettingPage from './pages/setting/SettingPage';
import LocationPage from './pages/location/LocationPage';
import UserCertPage from './pages/certificate/UserCertPage';
import LoginRedirectPage from './pages/login/LoginRedirectPage';
import FeedEditPage from './pages/feed/FeedEditPage';
import MainLayout from './pages/main/MainLayout';
import YourRoomPage from './pages/my_room/yourRoomPage';
import NewFeedListPage from './pages/feed/NewFeedListPage';
import NewFeedCreatePage from './pages/feed/NewFeedCreatePage';

const router = createBrowserRouter([  
  {
    path : "/",
    element : 
    <UserCertPage>
      <TemporaryStartPage/>
    </UserCertPage>
  },
  {
    path : "/channelselect",
    element : <ChannelSelectPage/>
  },
  {
    path : "/login",
    element : <LoginPage/>
  },
  {
    path: "/main",
    element: <MainLayout />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "myroom", element: <MyRoomPage /> },
      { path: "schedule", element: <SchedulePage /> },
      { 
        path: "feed", 
        children: [
          { path: "", element: <NewFeedListPage /> },
          { path: "edit", element: <FeedEditPage /> },
          { path: "create", element: <NewFeedCreatePage /> },
        ]
      },
      { path: "garden", element: <FamilyGardenPage /> },
    ]
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
    path: "/payment-success",
    element: <PaymentSuccessPage />
  },
  {
    path: "/setting",
    element: <SettingPage />
  },
  {
    path: "/location",
    element: <LocationPage />
  },
  {
    path: "/auth/fetch",
    element: <LoginRedirectPage />
  },
  {
    path: "/feededit",
    element: <FeedEditPage />
  },
  {
    path: "/yourroom",
    element: <YourRoomPage />
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