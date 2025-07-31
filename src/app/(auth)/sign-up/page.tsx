import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "../layout";
import { SignUpForm } from "./components/sign-up-form";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <p className="text-muted-foreground text-sm">
        Enter your email and password to create an account. Already have an
        account?
        <Link
          href="/sign-in"
          className="hover:text-primary underline underline-offset-4"
        >
          Sign In
        </Link>
      </p>
      <SignUpForm />
     
    </>
  );
}
