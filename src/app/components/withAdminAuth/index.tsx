import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ComponentType, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const withAdminAuth = (WrappedComponent: ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { user } = useContext(UserContext);

    useEffect(() => {
      // Check if we are on the client side before using router
      if (typeof window !== "undefined") {
        if (!user) {
          router.push("/login");
        } else if (user && user.role !== "LIBRARIAN") {
          router.back();
        }
      }
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAdminAuth;
