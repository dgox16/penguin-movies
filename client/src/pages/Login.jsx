import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signin, isAuthenticated, errors: loginError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated]);

    const onSubmit = handleSubmit((values) => {
        signin(values);
    });

    return (
        <div>
            <header>Login</header>
            <main className="bg-zinc-800 max-w-md p-10 rounded-md">
                {loginError.map((err) => (
                    <div className="bg-red-500 text-white rounded-md">{err}</div>
                ))}
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Username"
                    />
                    {errors.username && <p className="text-red-500">Username is required</p>}
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-red-500">Password is required</p>}
                    <button type="submit">Login</button>
                </form>

                <p className=" flex gap-x-2 justify-between">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="text-sky-500">
                        SignUp
                    </Link>
                </p>
            </main>
        </div>
    );
};
