import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { Layout } from "@/ui";
import { ProtectedRoute, NoProtectedRoute } from "@/router";
import { SignUp } from "@/pages/SignUp";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/Home";

export function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="auth/login"
          element={
            <NoProtectedRoute>
              <Login />
            </NoProtectedRoute>
          }
        />
        <Route
          path="auth/signup"
          element={
            <NoProtectedRoute>
              <SignUp />
            </NoProtectedRoute>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}