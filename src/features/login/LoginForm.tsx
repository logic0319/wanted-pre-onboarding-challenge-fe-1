import Button from "@/ui/Button";
import TextField from "@/ui/TextField";

import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginForm = {
  email: string;
  password: string;
};

const loginFormschema = object().shape({
  email: string().email().required(),
  password: string().min(8).max(24).required(),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginFormschema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginForm) => console.log(data);
  const { email, password } = watch();

  return (
    <>
      <form
        className="w-96 mx-auto grid gap-5 p-8 border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Login</h1>
        <div>
          <TextField label="Email" {...register("email")} />
          <p className="text-xs text-rose-600 mt-1">{errors.email?.message}</p>
        </div>
        <div>
          <TextField
            label="Password"
            {...register("password")}
            type="password"
          />
          <p className="text-xs text-rose-600 mt-1">
            {errors.password?.message}
          </p>
        </div>
        <Button
          disabled={
            Object.keys(errors).length !== 0 || email === "" || password === ""
          }
        >
          로그인
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
