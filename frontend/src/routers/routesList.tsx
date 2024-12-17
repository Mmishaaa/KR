import LikesPage from '../pages/LikesPage';
import ChatsPage from '../pages/ChatsPage';
import NearPage from "../pages/NearPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import HitOrMissPage from "../pages/HitOrMissPage";
import AuthPage from '../pages/Auth';

interface RouterType {
  title: string;
  path: string;
  element: JSX.Element;
}

export const publicRoutes: RouterType[] = [
  { title: "Likes", path: '/likes', element: <LikesPage /> },
  { title: "Chats", path: '/chats', element: <ChatsPage /> },
  { title: "Home", path: '/near', element: <NearPage /> },
  { title: "HitOrMiss", path: "/", element: <HitOrMissPage /> },
  { title: "Profile", path: "/profiles/:id", element: <ProfilePage /> },
  { title: "NotFound", path: "*", element: <NotFoundPage /> },
  { title: "Login", path: "/login", element: <AuthPage /> },
  { title: "Registration", path: "/registration", element: <AuthPage /> },

]

export const privateRoutes: RouterType[] = [
  ...publicRoutes,
  { title: "Admin", path: '/admin', element: <LikesPage /> },
]