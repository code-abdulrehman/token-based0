import React, { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaChevronCircleLeft, FaLock } from "react-icons/fa";

import Login from "./Login";
import TokenControl from "./TokenControl";
import Logout from "./Logout";
import SignIn from "./SignIn";
import PasswordResetRequest from "./PasswordResetRequest";
import OtpVerification from "./OtpVerification";
import PasswordReset from "./PasswordReset";

import { getEmail, setEmail, removeEmail, getToken } from "../../../../lib/helper";
import { otpVerify, resetPassword, resetPasswordReq } from "../../../../lib/redux/slices/authSlice/apis";

export default function AuthController() {
  const authToken = getToken();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("login");
  const [resetTabOpen, setResetTabOpen] = useState(false);
  const [resetTabs, setResetTabs] = useState([]);

  const email = getEmail();
  const appTitle = import.meta.env.VITE_APP_NAME;

  useEffect(() => {
    const currentTab = new URLSearchParams(location.search).get("tab");
    if (currentTab) {
      setSelected(currentTab);
    }
  }, [location.search, authToken]);

  useEffect(() => {
    navigate(`?${selected}`, { replace: true });
    switch (selected) {
      case "login":
        document.title = `Login | ${appTitle}`;
        break;
      case "signin":
        document.title = `SignIn | ${appTitle}`;
        break;
      case "logout":
        document.title = `Logout | ${appTitle}`;
        break;
      case "token":
        document.title = `Token Exp. | ${appTitle}`;
        break;
      case "reset-request":
        document.title = `Password Reset Request | ${appTitle}`;
        break;
      case "password-reset":
        document.title = `Password Reset | ${appTitle}`;
        break;
      case "otp-verification":
        document.title = `OTP Verification | ${appTitle}`;
        break;
      default:
        document.title = `${appTitle}`;
    }
  }, [selected, navigate]);

  const handleResetRequest = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(resetPasswordReq(values));
      setEmail(values.email);
      setResetTabs([passwordTabs[1]]); // Only set the OTP Verification tab
      setResetTabOpen(true); // Open the reset tab section
    } catch (error) {
      setErrors({ email: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpVerification = async (values, { setErrors }) => {
    try {
      const otp = values.otp;
      await dispatch(otpVerify({ otp, email }));
      setResetTabs([passwordTabs[2]]); // Only set the Password Reset tab
    } catch (error) {
      setErrors({ otp: error.message });
    }
  };

  const handlePasswordReset = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(resetPassword({ email, password: values.password }));
      setResetTabOpen(false);
      setResetTabs([]); // Clear reset tabs
      removeEmail();
      setSelected('login'); // Redirect back to login tab or any default tab
    } catch (error) {
      setErrors({ password: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { key: "token", title: "Token", component: <TokenControl />, tokenBased: true },
    { key: "login", title: "Login", component: <Login />, tokenBased: false },
    { key: "signin", title: "SignIn", component: <SignIn />, tokenBased: false },
    { key: "logout", title: "Logout", component: <Logout />, tokenBased: true },
  ];

  const passwordTabs = [
    { key: "reset-request", title: "Reset Request", component: <PasswordResetRequest onRequest={handleResetRequest} />, tokenBased: false },
    { key: "otp-verification", title: "OTP Verification", component: <OtpVerification onVerify={handleOtpVerification} />, tokenBased: false },
    { key: "password-reset", title: "Password Reset", component: <PasswordReset onReset={handlePasswordReset} />, tokenBased: false }
  ];

  const filteredTabs = !resetTabOpen ? tabs.filter(tab => tab.tokenBased === Boolean(authToken)) : resetTabs;

  const backPage = (tab) => {
    if(tab.key === 'reset-request'){
      setResetTabOpen(false)
    }
    else if(tab.key === 'otp-verification'){
      setResetTabs([passwordTabs[0]])
    }
    else if(tab.key === 'password-reset'){
      setResetTabs([passwordTabs[1]])
    }else{
      setResetTabOpen(false)
    }
  }

  return (
    <div className="flex items-center justify-center rounded-xl min-h-[88vh] overflow-auto bg-gray-100 p-4 w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            {filteredTabs.map(tab => (
              <Tab key={tab.key} title={tab.title}>
                {tab.component}
                {tab.key === 'login' && !resetTabOpen && (
                  <div className="flex justify-center items-center gap-4 py-2 text-sx">
                    Reset
                    <b
                      className="underline cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        setResetTabOpen(true);
                        setResetTabs([passwordTabs[0]]); // Open reset request tab
                      }}
                    >
                      Password  <FaLock className="bounce" />
                    </b>
                  </div>
                )}
                {(tab.key === 'reset-request' || tab.key === 'otp-verification' || tab.key === 'password-reset') && resetTabOpen && (
                  <div className="absolute bottom-0 flex justify-center items-center gap-4 py-2 text-sx">
                    <FaChevronCircleLeft />
                    <b
                      className="underline cursor-pointer hover:text-blue-600"
                      onClick={() =>  backPage(tab)}
                    >
                      {tab.key === 'reset-request'
                        ? 'Login'
                        : tab.key === 'otp-verification'
                          ? 'Reset Request'
                          : tab.key === 'password-reset'
                            ? 'OTP Verification'
                            : ''
                      }
                    </b>
                  </div>
                )}
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
