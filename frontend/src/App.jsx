import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { healthCheck } from "./hooks/healthCheck.js";
import { getCurrentUser } from "./hooks/getCurrentUser.js";
import { icons } from "./assets/Icons.jsx";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    healthCheck().then(() => {
      getCurrentUser(dispatch).then(() => {
        setLoading(false);
      });
    });
    setInterval(() => {
      healthCheck();
    }, 5 * 60 * 1000);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full overflow-y-auto bg-[#121212] text-white">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <span>{icons.loading}</span>
          <h1 className="text-3xl text-center mt-8 font-semibold">
            Please wait ....{" "}
          </h1>
          <h1 className="text-xl text-center mt-4">
            Refresh the page if it takes too long time!
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col bg-opacity-95">
      <Navbar />
      <div className="w-full h-full flex overflow-auto">
        <div className="w-72 hidden lg:block">
          <Sidebar />
        </div>
        <main className="overflow-y-auto h-full w-full">
          <Outlet />
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
