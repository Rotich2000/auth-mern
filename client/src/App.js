import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** import all components */

import Username from './components/Username'
// import Password from './components/Password'
import Register from './components/Register'
import Recovery from './components/Recovery'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'
import Reset from './components/Reset'
import ForgotPassword from "./components/ForgotPassword";



/** root routes */

const route = createBrowserRouter([
  {
    path: "/",
    element: <Username/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
  },
  {
    path: "/recovery",
    element: <Recovery/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/reset",
    element: <Reset/>,
  },
  {
    path: "*",
    element: <PageNotFound/>,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={route}/>
    </main>
  );
};

export default App;
