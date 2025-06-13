import { Navigate, Route, Routes } from "react-router"

import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import NotificationsPage from "./pages/NotificationsPage"
import CallPage from "./pages/CallPage"
import ChatPage from "./pages/ChatPage"
import OnBoardingPage from "./pages/OnBoardingPage"

import { Toaster } from "react-hot-toast"

import PageLoader from "./components/PageLoader"
import useAuthUser from "./hooks/useAuthUser.js"
import Layout from "./components/Layout.jsx"
import { useThemeStore } from "./store/useThemeStore.js"


const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();



  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded; //verifier si l'utilisateur est connecté et si il a rempli son profil

  if (isLoading) { return <PageLoader />; }

  return (
    <>
      <section className="h-screen" data-theme={theme}>
        <Routes>
          <Route path="/" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={true} > <HomePage /></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
          <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
          <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationsPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} /> 
          )} />
          <Route path="/call/:callId" element={
            isAuthenticated && isOnboarded ? (
                <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } />

          <Route path="/chat/:chatId" element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />

          <Route path="/onboarding"
            element={isAuthenticated ? (
              !isOnboarded ? (
                <OnBoardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )} />
        </Routes>

        <Toaster />
      </section>
    </>
  )
}

export default App 