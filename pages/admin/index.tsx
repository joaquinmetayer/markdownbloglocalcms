import React, { useState, useEffect } from "react";
import AdminPanel from "./components/AdminPanel";
import "./admin.css";
import AdminLayout from "./components/Layout";

const Admin: React.FC = () => {
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsLocal(
      typeof window !== "undefined" &&
        window.location.href.startsWith("http://localhost")
    );
  }, []);

  return (
    <>
      <AdminLayout>
        {isLocal ? (
          <>
            <AdminPanel />
          </>
        ) : (
          <p>Administrator panel only in localhost</p>
        )}
      </AdminLayout>
    </>
  );
};

export default Admin;
