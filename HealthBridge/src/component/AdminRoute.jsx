import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("doctors")
        .select("id, is_admin")
        .eq("id", user.id)
        .single();

      if (error || !data || !data.is_admin) {
        setAllowed(false);
      } else {
        setAllowed(true);
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return allowed ? children : <Navigate to="/admin-login" />;
};

export default AdminRoute;