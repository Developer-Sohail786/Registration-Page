import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const sleep = (miliSeconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, miliSeconds);
    });
  };

  const onSubmit = async (data) => {
    await sleep(2000);

    console.log("Form Submitted:", data);

    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Backend response:", result, data);
  };

  return (
    <div className="container flex items-center justify-center min-h-screen px-3">

      <div className="form bg-white flex flex-col rounded-lg text-black w-full sm:w-[90%] md:w-[60%] lg:w-[40%] py-6">

        <div className="text-[2rem] sm:text-[2.2rem] font-bold mt-6 flex justify-center">
          <h1>Register Here</h1>
        </div>

        <div className="create mt-3 text-[1.1rem] flex justify-center text-gray-400">
          <p>Create your new account here</p>
        </div>

        <div className="inputsFields text-[1.1rem] flex flex-col items-center mt-8 px-4">

          <form
            className="w-full max-w-md"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* EMAIL */}
            <p className="text-gray-500">Email</p>

            <input
              className="border-2 h-12 w-full border-black rounded-lg mt-2 pl-4"
              type="text"
              placeholder="Enter your email"
              {...register("email", {
                required: { value: true, message: "Field can't be empty" },
                minLength: { value: 6, message: "Minimum length is 6 characters" },
                maxLength: { value: 24, message: "Maximum length is 24 characters" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email Invalid",
                },
              })}
            />

            {errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </div>
            )}

            {/* PASSWORD */}
            <p className="text-gray-500 mt-5">Password</p>

            <input
              className="border-2 h-12 w-full border-black rounded-lg mt-2 pl-4"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: { value: true, message: "Field can't be empty" },
                minLength: { value: 8, message: "Minimum length is 8 characters" },
                maxLength: { value: 16, message: "Maximum length is 16 characters" },
                validate: (value) => {
                  if (!/[a-z]/.test(value))
                    return "Lowercase character is required";
                  if (!/[A-Z]/.test(value))
                    return "Uppercase character is required";
                  if (!/\d/.test(value)) return "Number is required";
                  if (!/[@$!%*?&]/.test(value))
                    return "Special character is required (@$!%*?&)";
                  return true;
                },
              })}
            />

            {errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </div>
            )}

            {/* BUTTON */}
            <div className="btn flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-12 w-full sm:w-[80%] rounded-lg mt-6 font-bold text-[1.1rem]
                ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-800 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </div>

          </form>
        </div>

        <p className="text-blue-500 flex justify-center mt-5 cursor-pointer">
          Forgot Password?
        </p>

      </div>
    </div>
  );
}

export default App;

