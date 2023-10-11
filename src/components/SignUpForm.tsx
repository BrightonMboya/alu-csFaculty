import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components";
import { useRouter } from "next/router";
import { useState } from "react";
import Password from "./Password";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const schema = z.object({
  ...loginSchema.shape,
  role: z.enum(["student", "facilitator", "admin"]),
});

type ValidationSchema = z.infer<typeof schema>;

export default function Index() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { password, username } = data;
    const response = await fetch(`/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const user = await response.json();
      router.push("/");
      //   setUser(user);
      //   setIsLoggedIn(true);
    } else {
      console.log(`Signing up failed`);
    }
  };

  return (
    <form>
      <div>
        <label>Username</label>

        <Input {...register("username")} placeholder="Enter your username" />
      </div>

      <Password
        password={password}
        setPassword={setPassword}
        placeholder="Enter your password"
        label="Password"
      />
      <Password
        password={retypedPassword}
        setPassword={setRetypedPassword}
        label="re typed the password"
        placeholder="Re Enter your password"
      />
      {password !== retypedPassword && (
        <span className="text-sm font-medium text-red-500">
          The two password must match
        </span>
      )}

      <div className="space-x-5">
        <button
          type="submit"
          className="mt-5 rounded-md bg-green px-4 py-2 text-lg  text-white shadow-sm hover:text-white md:py-4"
        >
          Signup
        </button>
      </div>
    </form>
  );
}
