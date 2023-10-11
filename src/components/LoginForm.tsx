import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type ValidationSchema = z.infer<typeof loginSchema>;

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const { password, username } = data;
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const user = await response.json();

      //   setUser(user);
      //   setIsLoggedIn(true);
    } else {
      console.log(`Signing up failed`);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>

        <Input
          // value={username}
          {...register("username")}
          // onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          type="password"
          {...register("password")}

          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-x-5">
        <button
          type="submit"
          className="rounded-md bg-green px-4 py-2 text-lg  text-white shadow-sm hover:text-white md:py-4"
        >
          Login
        </button>
      </div>
    </form>
  );
}
