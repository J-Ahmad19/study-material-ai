"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

//  Import server action
import { checkOrCreateUser } from "./providerAction";

const Provider = ({ children }) => {
  const { user } = useUser();
  const [users, setUsers] = useState([]); // 🔹 state array

  useEffect(() => {
    if (user) {
      checkOrCreateUser({
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
      })
        .then((res) => {
          // add user to array
          setUsers((prev) => [...prev, res.user]);
        })
        .catch((err) => console.error("User check failed:", err));
    }
  }, [user]);

  // Log whenever users array changes
  useEffect(() => {
    if (users.length > 0) {
      console.log("Users array:", users);
    }
  }, [users]);

  return <>
  
  {children}
  
  </>;
};

export default Provider;
