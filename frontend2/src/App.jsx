// import react from "react"
// import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom"
// import Register from "./pages/Register"
// import Login from "./pages/Login"
// import Home from "./pages/Home"
// import NotFound from "./pages/NotFound"
// import ProtectedRoute from "./components/ProtectedRoute"




// function Logout(){
//   localStorage.clear();
//   const navigate = useNavigate();
//   navigate('/login', {replace:true});
// }

// function RegisterAndLogout() {
//   localStorage.clear()
//   return <Register />
// }

// function App() {
//   return (
//    <>
//    <BrowserRouter>
//     <Routes>
//        <Route
//          path = "/"
//          element = {
//            <ProtectedRoute>
//             <Home onLogout ={Logout} />
//            </ProtectedRoute>
//          }/>
//          <Route path="/register" element={<RegisterAndLogout />}/>
//          <Route path="/login" element={<Login />}/>
//          <Route path="*" element={<NotFound />}/>
//     </Routes>
//    </BrowserRouter>
//    </>
//   )
// }

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MyReviews from "./pages/MyReviews";



function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function Logout() {
  localStorage.clear();
  return <Login/>;
}

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home onLogout={Logout} />
            </ProtectedRoute>
          }
        />
         <Route
          path="/my-reviews"
          element={
            <ProtectedRoute>
              <MyReviews/>
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
