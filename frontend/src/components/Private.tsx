import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

type Props = {
  children: React.ReactNode;
};

const Private = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .get("https://mychat-1-4ru5.onrender.com/api/verify", {
        withCredentials: true,
      })
      .then((res) => {
        setIsAuth(res.data.authenticated);
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, []);

  if (isAuth === null) {
    return <div>Chargement...</div>;
  }

  return isAuth ? <>{children}</> : <Navigate to="/signin" />;
};

export default Private;
