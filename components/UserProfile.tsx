"use client";

import { useSession } from "next-auth/react";
import React from "react";

const UserProfile = () => {
  const session = useSession();
  const name = session.data?.user?.name?.split(" ")[0].split("")[0];
  return (
    <div className="h-10 w-10 flex justify-center items-center rounded-full bg-secondary-btn text-secondary-btn-text">
      <p>{name}</p>
    </div>
  );
};

export default UserProfile;
