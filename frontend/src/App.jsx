import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ChannelSelectPage from './pages/channel_select/channelselectpage';
import MainPage from './pages/main/MainPage';
import './index.css';
import LoginPage from './pages/login/Loginpage';
import FindAccount from './pages/login/FIndAccount';
import LoadingPage from './pages/loading/Loadingpage';
import PwResetPage from './pages/login/PwResetPage';
import ItemStorePage from './pages/item_store/ItemStorePage';
import SignupPage from './pages/login/SignupPage';
import SchedulePage from './pages/schedule/SchedulePage';
import FamilyGardenPage from './pages/garden/FamilyGardenPage';
import MyRoomPage from './pages/my_room/myRoomPage';
import PaymentPage from './pages/payment/PaymentPage';
import PaymentSuccessPage from './pages/payment/PaymentSuccessPage';
import SettingPage from './pages/setting/SettingPage';
import LoginRedirectPage from './pages/login/LoginRedirectPage';
import FeedEditPage from './pages/feed/FeedEditPage';
import MainLayout from './pages/main/MainLayout';
import YourRoomPage from './pages/my_room/yourRoomPage';
import NewFeedListPage from './pages/feed/NewFeedListPage';
import NewFeedCreatePage from './pages/feed/NewFeedCreatePage';
import AnimatedLayout from './pages/animation/AnimatedLayout';

const router = createBrowserRouter([  
  {
    path : "/",
    element : 
    <AnimatedLayout>
      <LoadingPage />
    </AnimatedLayout>
  },
  {
    path : "/channelselect",
    element : 
    <AnimatedLayout>
      <ChannelSelectPage/>
    </AnimatedLayout>
  },
  {
    path : "/login",
    element : 
    <AnimatedLayout>
      <LoginPage/>
    </AnimatedLayout>
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
    element : 
    <AnimatedLayout>
      <FindAccount />
    </AnimatedLayout>
  },
  {
    path : "/Loading",
    element : 
    <AnimatedLayout>
      <LoadingPage />
    </AnimatedLayout>
  },
  {
    path : "/PwReset",
    element : 
    <AnimatedLayout>
      <PwResetPage />
    </AnimatedLayout>
  },
  {
    path : "/itemstore",
    element : 
    <AnimatedLayout>
      <ItemStorePage />
    </AnimatedLayout>
  },
  {
    path : "/signup",
    element : <SignupPage />,
  },
  {
    path: "/payment",
    element: 
    <AnimatedLayout>
      <PaymentPage />
    </AnimatedLayout>
  },
  {
    path: "/payment-success",
    element: 
    <AnimatedLayout>
      <PaymentSuccessPage />
    </AnimatedLayout>
  },
  {
    path: "/setting",
    element: 
    <SettingPage />
  },
  {
    path: "/auth/fetch",
    element: 
    <AnimatedLayout>
      <LoginRedirectPage />
    </AnimatedLayout>
  },
  {
    path: "/yourroom",
    element: 
    <AnimatedLayout>
      <YourRoomPage />
    </AnimatedLayout>
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