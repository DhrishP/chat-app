import { useEffect } from "react";
import DashComponent from "./components/dashboard";
import { useUserDataPersist } from "./store/globalstate";
import { useNavigate } from "react-router-dom";

function App() {
  const { userData } = useUserDataPersist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData?.email) {
      navigate("/login", { replace: true });
    }
  }, [userData]);
  return (
    <>
      <DashComponent />
    </>
  );
}

export default App;
