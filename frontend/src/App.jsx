import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
function App() {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col bg-opacity-95">
      <Navbar />
      <div className="w-full h-full flex overflow-auto">
        <div className="w-72">
          <Sidebar />
        </div>
        <main className="overflow-y-auto h-full w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
