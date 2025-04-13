import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import "./App.css";
import Login from "./Pages/Login.jsx";
import ChatLayout from "./Components/ChatLayout.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Settings from "./Pages/Settings.jsx";
import ProfileSetup from "./Pages/ProfileSetup.jsx";


function App() {
  const { authUser } = useAuthContext();

  return (
    <div>
      <Routes>
        {/* Protected Route - only accessible when authenticated */}
        <Route
          path='/'
          element={authUser ? <ChatLayout /> : <Navigate to="/login" />}
        />
        <Route
          path='/settings' 
          element = {<Settings />}
           />
        <Route
          path='/profile' 
          element={authUser ? <ProfileSetup /> : <Navigate to="/login" />}
           />

        {/* Auth Routes - only accessible when NOT authenticated */}
        <Route
          path='/login'
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />

        {/* Fallback route for undefined paths */}
        <Route
          path='*'
          element={<Navigate to={authUser ? "/" : "/login"} />}
        />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;

// // Temporarily modify App.jsx to test basic rendering
// const App = () => {

//   return (
//     <div>
//       {/* <h1 className="text-2xl font-bold">App is rendering</h1> */}
//       {/* <ChatLayout /> */}
//       <Routes>
//         <Route path="/" element={<ChatLayout />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </div>
//   );
// }
// export default App;