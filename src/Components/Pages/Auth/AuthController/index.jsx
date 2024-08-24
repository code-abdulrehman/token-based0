import React, { useEffect } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";

import Login from "./Login";
import TokenControl from "./TokenControl";
import Logout from "./Logout";
import { authToken } from "../../../../lib/helper";

export default function AuthController() {
  console.log(authToken)
          


  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = React.useState("login");
  const appTitle = import.meta.env.VITE_APP_NAME
  // Update the tab based on the URL when the component mounts
  useEffect(() => {
    const currentTab = new URLSearchParams(location.search).get("");
    if (currentTab) {
      setSelected(currentTab);
    }
  }, [location.search]);

  // // Update the URL and document title when the selected tab changes
  useEffect(() => {
    navigate(`?${selected}`, { replace: true });
    switch (selected) {
      case "login":
        document.title = `Login | ${appTitle}`;
        break;
      case "logout":
        document.title = `Logout | ${appTitle}`;
        break;
      case "token":
        document.title = `Token Exp. | ${appTitle}`;
        break;
      default:
        document.title = `${appTitle}`;
    }
  }, [selected, navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[90vh]">
      <Card className="max-w-full w-[340px] h-[400px]">

        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="token" title="Token">
            <TokenControl/>
            </Tab>
            <Tab key="login" title="Login">

            <Login/>
            </Tab>
            <Tab key="logout" title="Logout">
            <Logout/>
            </Tab>

          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
