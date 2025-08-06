import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import OwnerPage from './pages/OwnerPage';
import ZamerchiPage from './pages/ZamerchiPage';
import BrigaderPage from './pages/BrigaderPage';
import ManagerPage from './pages/ManagerPage';

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    WebApp.ready();
    const tgId = WebApp.initDataUnsafe?.user?.id;

    if (!tgId) {
      alert("Telegram ID topilmadi!");
      return;
    }

    fetch(`https://yourdomain.uz/api/users/get-by-tgid/${tgId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          const role = data.user.role;
          if (role === "owner") navigate("/owner");
          else if (role === "zamerchi") navigate("/zamerchi");
          else if (role === "brigader") navigate("/brigader");
          else if (role === "manager") navigate("/manager");
          else alert("Roli aniqlanmadi!");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Server xatosi!");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <h2>Yuklanmoqda...</h2>;

  return (
    <Routes>
      <Route path="/owner" element={<OwnerPage />} />
      <Route path="/zamerchi" element={<ZamerchiPage />} />
      <Route path="/brigader" element={<BrigaderPage />} />
      <Route path="/manager" element={<ManagerPage />} />
    </Routes>
  );
};

export default App;
