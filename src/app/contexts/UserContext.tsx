"use client";
import React, { createContext, useReducer, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UserContextProps {
  user: any;
  dispatch?: React.Dispatch<any>;
}

const getInitialUserState = () => {
  // Check if localStorage is available (client-side)
  if (typeof window !== "undefined" && localStorage) {
    const storedUser = localStorage.getItem("user");
    return { user: storedUser ? JSON.parse(storedUser) : null };
  }
  return { user: null };
};

const INITIAL_STATE: UserContextProps = getInitialUserState();

export const UserContext = createContext<UserContextProps>(INITIAL_STATE);

const UserReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      toast.success("Login successfully !");
      return { user: action.payload };
    }
    case "LOGOUT": {
      toast.success("Logout successfully !");
      return { user: null };
    }
    case "LOGIN_FAILURE": {
      toast.error("Login Failure !");
      return { user: null };
    }
    default:
      return state;
  }
};

export const UserContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
