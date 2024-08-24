import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import { Tabs, Tab } from "@nextui-org/react";
import Home from '../Home';
import About from '../About';
import AuthController from '../Auth/AuthController';

// Array of route objects
const routes = [
  { path: '/', title: `Home`, component: <Home /> },
  { path: '/auth', title: 'AuthController', component: <AuthController /> },
  { path: '/about', title: 'About', component: <About /> },
];

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-col gap-2 p-4">
      <Tabs selectedKey={currentPath} aria-label="Tabs">
        {routes.map((route) => (
          <Tab key={route.path} title={route.title} as={Link} to={route.path} />
        ))}
      </Tabs>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </div>
  );
}

export default Layout;
