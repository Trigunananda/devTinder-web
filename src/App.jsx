import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          {/* parent route */}
          <Route path="/" element={<Body />}>
            {/* <Route path="/login"  element={<Login/>}/> */}
            {/* children route */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;