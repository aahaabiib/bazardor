import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
export default () => (
  <Suspense>
    <AuthForm up={true} />
  </Suspense>
);
