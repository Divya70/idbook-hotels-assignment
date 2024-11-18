"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FaGithub } from "react-icons/fa";
import ErrorMessage from "@/components/ErrorMessage";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/LoadingButton";
import {
  handleCredentialsSignin,
  handleGithubSignin,
} from "@/app/actions/authActions";
const Signin = () => {
  const [globalError, setGlobalError] = useState("");
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Handle Submit method
  const onSubmit = async (values) => {
    try {
      const result = await handleCredentialsSignin(values);
      if (result?.message) {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="w-full " action={handleGithubSignin}>
            <Button
              variant="outline"
              className="w-full bg-blue-100 rounded-md py-5"
              type="submit"
            >
              <FaGithub className="h-4 w-4 mr-2" />
              {/* <GitHubLogoIcon className="h-4 w-4 mr-2" /> */}
              <span className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                Sign in with GitHub
              </span>
            </Button>
          </form>
          <span className="text-sm text-gray-500 text-center block my-2">
            or
          </span>
          {globalError && <ErrorMessage error={globalError} />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="nc-Label text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Email <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="nc-Label text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Password <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button will go here */}
              <LoadingButton pending={form.formState.isSubmitting} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
