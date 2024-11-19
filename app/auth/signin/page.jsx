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
import RoleSwitcher from "../../../components/RoleSwitcher";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signin = () => {
  const [globalError, setGlobalError] = useState("");
  const [role, setRole] = useState("user");
  // React hook form
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Handle Submit logic
  const onSubmit = async (values) => {
    try {
      const result = await handleCredentialsSignin(values);
      if (result?.message) {
        role, setGlobalError(result.message);
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
              {/* Email Input Field */}
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
              {/* Password input field */}
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
              <RoleSwitcher in role={role} setRole={setRole} />
              {/* Sin and loading button */}
              <LoadingButton pending={form.formState.isSubmitting} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;

// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import RoleSwitcher from "../../../components/RoleSwitcher";
// import LoadingButton from "@/components/LoadingButton";
// const schema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export default function Signin() {
//   const [role, setRole] = useState("user");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(schema) });

//   const onSubmit = async (data) => {
//     const result = await signIn("credentials", {
//       redirect: false,
//       ...data,
//       role,
//     });
//     if (result.error) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="p-8 bg-white rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Sign In</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="block mb-1 text-sm font-medium">Email</label>
//             <input
//               {...register("email")}
//               className="w-full px-3 py-2 border rounded"
//               type="text"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1 text-sm font-medium">Password</label>
//             <input
//               {...register("password")}
//               className="w-full px-3 py-2 border rounded"
//               type="password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>
//           <RoleSwitcher role={role} setRole={setRole} />
//           {/* <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Sign In
//           </button> */}
//           {/* Sing in and loading button */}
//           <LoadingButton pending={form.formState.isSubmitting} />
//         </form>
//       </div>
//     </div>
//   );
// }
