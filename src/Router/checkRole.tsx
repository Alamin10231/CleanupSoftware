import type { RootState } from "@/redux/store";
import type { UserRole } from "@/Types/Types";
import type { ComponentType } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const checkRole = (Component: ComponentType, role?: UserRole) => {
   return function AuthWrapper() {
      const { user } = useSelector((state: RootState) => state.auth);

      if (!user?.user_type) return <Navigate to='/login' />
      if (role && user.user_type !== role) return <Navigate to='/unauthorized' />
      if (!user.email) return <Navigate to='/login' />
      return <Component />
   }
}
