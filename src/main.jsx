import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import api, { setAuthToken } from "./utils/mockApi";
import useStore from "./store";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import RequireOrganizer from "./components/RequireOrganizer";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import CalendarPage from "./pages/CalendarPage";
(async function restore() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
    try {
      const r = await api.get("/api/auth/me");
      if (r.data && r.data.user) useStore.getState().setUser(r.data.user);
    } catch (err) {
      console.warn("Could not restore user", err);
      localStorage.removeItem("token");
      setAuthToken(null);
    }
  }
})();
const RootIndex = () => (localStorage.getItem("token") ? <Home /> : <Landing />);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <RootIndex /> },
        { path: "events/:id", element: <EventDetails /> },
        { path: "my-events", element: <MyEvents /> },
        { path: "calendar", element: <CalendarPage /> },
        { path: "create", element: <RequireOrganizer><CreateEvent /></RequireOrganizer> },
        { path: "notifications", element: <Notifications /> },
        { path: "admin", element: <AdminDashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "*", element: <Navigate to="/" replace /> }
      ]
    }
  ],
  { future: { v7_startTransition: true, v7_relativeSplatPath: true } }
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
