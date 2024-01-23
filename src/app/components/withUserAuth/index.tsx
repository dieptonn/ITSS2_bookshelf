"use client";
import { useRouter } from "next/navigation";
import { ComponentType, ReactNode, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

const withUserAuth = (WrappedComponent: ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { user } = useContext(UserContext);

    useEffect(() => {
      // Check if we are on the client side before using router
      if (!user) {
        router.push("/login");
      } else if (user && user.role !== "USER") {
        router.back();
      }
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withUserAuth;
