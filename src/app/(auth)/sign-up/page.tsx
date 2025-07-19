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
          href="/sign-in-2"
          className="hover:text-primary underline underline-offset-4"
        >
          Sign In
        </Link>
      </p>
      <SignUpForm />
      <p className="text-muted-foreground px-8 text-center text-sm">
        By clicking login, you agree to our{" "}
        <a
          href="/terms"
          className="hover:text-primary underline underline-offset-4"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="hover:text-primary underline underline-offset-4"
        >
          Privacy Policy
        </a>
        .
      </p>
    </>
  );
}
