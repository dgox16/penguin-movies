import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
export const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signup, isAuthenticated, errors: registerError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const onSubmit = handleSubmit((values) => {
        signup(values);
    });

    return (
        <div>
            <header>Register</header>
            <main className="bg-zinc-800 max-w-md p-10 rounded-md">
                {registerError.map((err) => (
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
                    <input
                        type="text"
                        {...register("firstName", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="First Name"
                    />
                    {errors.firstName && <p className="text-red-500">First name is required</p>}
                    <input
                        type="text"
                        {...register("lastName", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Last Name"
                    />
                    {errors.lastName && <p className="text-red-500">Last name is required</p>}
                    <button type="submit">Register</button>
                </form>
                <p className=" flex gap-x-2 justify-between">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-sky-500">
                        Login
                    </Link>
                </p>
            </main>
        </div>
    );
};
