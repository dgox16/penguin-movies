import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { handleLogin } from "../services/usersAdministration";
import { useAuthStore } from "../store/auth";
import Cookies from "js-cookie";

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const {
        setUser,
        setToken,
        isAuthenticated,
        errors: loginError,
        setErrors,
    } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (loginError.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [loginError]);

    const signin = async (values) => {
        try {
            const res = await handleLogin(values);
            setUser(res);
            setToken(res.token);
            navigate("/");
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const onSubmit = handleSubmit((values) => {
        signin(values);
    });

    return (
        <div className="flex items-center justify-center mt-60">
            <main className="bg-gray-800 max-w-md p-10 rounded-md">
                {loginError.map((err) => (
                    <div className="bg-red-500 text-white rounded-md" key={err}>
                        {err}
                    </div>
                ))}
                <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                        >
                            Your username
                        </label>
                        <input
                            type="text"
                            {...register("username", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Username"
                        />
                        {errors.username && (
                            <p className="text-red-500">Username is required</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                            Your password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <p className="text-red-500">Password is required</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                </form>

                <p className=" flex gap-x-2 justify-between mt-5">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="text-blue-600">
                        SignUp
                    </Link>
                </p>
            </main>
        </div>
    );
};
