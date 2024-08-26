import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link, Navigate } from 'react-router-dom';
import { Tabs, Tab } from "@nextui-org/react";
import Home from '../Home';
import About from '../About';
import NotFound from '../NotFound';
import AuthController from '../Auth/AuthController';
import { getToken } from '../../../lib/helper';

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authToken = getToken(); // Assume this function retrieves the token

  useEffect(() => {
    // Set the boolean state based on authToken
    setIsAuthenticated(Boolean(authToken));
  }, [authToken]);

  // Define routes with token-based visibility
  const routes = [
    { path: '/', title: 'Home', component: <Home />, tokenBased: true },
    { path: '/auth', title: 'AuthController', component: <AuthController />, tokenBased: isAuthenticated },
    { path: '/about', title: 'About', component: <About />, tokenBased: true },
  ];

  // Filter routes based on the presence of an authentication token
  const filteredRoutes = routes.filter(route => route.tokenBased === Boolean(authToken));

  return (
    <div className="flex flex-col gap-2 p-4">
      <Tabs selectedKey={currentPath} aria-label="Tabs">
        {filteredRoutes.map((route) => (
          <Tab key={route.path} title={route.title} as={Link} to={route.path} />
        ))}
      </Tabs>
      <Routes>
        {/* Redirect to login if not authenticated and trying to access token-based routes */}
        {filteredRoutes.length === 0 && !isAuthenticated && (
          <Route path="*" element={<Navigate to="/auth" replace />} />
        )}
     {/* Redirect to /auth if not authenticated and trying to access token-based routes */}
     {routes.map(route => 
          route.tokenBased && !isAuthenticated ? (
            <Route key={route.path} path={route.path} element={<Navigate to="/auth" replace />} />
          ) : null
        )}
        {/* Map filtered routes */}
        {filteredRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        
        {/* Catch-all route for "Not Found" */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Layout;
