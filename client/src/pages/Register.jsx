import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { handleRegister } from "../services/usersAdministration";
import { useAuthStore } from "../store/auth";
export const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { setUser, isAuthenticated, errors: registerError, setErrors } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const signup = async (values) => {
        try {
            const res = await handleRegister(values);
            setUser(res);
            navigate("/");
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const onSubmit = handleSubmit((values) => {
        signup(values);
    });

    return (
        <div className="flex items-center justify-center mt-48">
            <main className="bg-gray-800 max-w-md p-10 rounded-md">
                {registerError.map((err) => (
                    <div className="bg-red-500 text-white rounded-md">{err}</div>
                ))}
                <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label
                            for="email"
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
                        <label
                            for="email"
                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                        >
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
                    <div className="mb-6">
                        <label
                            for="email"
                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                        >
                            Your first name
                        </label>
                        <input
                            type="text"
                            {...register("firstName", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="First Name"
                        />
                        {errors.firstName && (
                            <p className="text-red-500">First name is required</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            for="email"
                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                        >
                            Your last name
                        </label>
                        <input
                            type="text"
                            {...register("lastName", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Last Name"
                        />
                        {errors.lastName && (
                            <p className="text-red-500">Last name is required</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Register
                    </button>
                </form>
                <p className=" flex gap-x-2 justify-between mt-5">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-blue-600">
                        Login
                    </Link>
                </p>
            </main>
        </div>
    );
};
