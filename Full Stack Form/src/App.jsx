import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  // function for delaying the submission
  const sleep = (miliSeconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, miliSeconds);
    });
  };

  const onSubmit = async (data) => {
    await sleep(2000); //delaying submission
    console.log("Form Submitted:", data);

    // sending data to the backend

    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json(); //we can also use text()
    console.log("Backend response:", result,data);
  };
  return (
    <div className="container flex items-center justify-center  h-screen ">
      <div className="form bg-white flex flex-col   border-2 border-none rounded-lg text-black h-[80%] w-[40%]">
        <div className="text-[2.2rem] font-bold mt-10 flex justify-center ">
          <h1>Register Here</h1>
        </div>
        <div className="create mt-4 text-[1.2rem] flex justify-center text-gray-400">
          <p>Create your new account here </p>
        </div>
        <div className="inputsFields text-[1.2rem] flex flex-col items-center mt-10">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <p className="mr-[63.9%] text-gray-500">Email</p>
            <input
              className="border-2 h-12 w-[30vw] border-black rounded-lg mt-2 pl-8"
              type="text"
              placeholder="Enter your email"
              {...register("email", {
                required: { value: true, message: "Field can't be empty" },
                minLength: {
                  value: 6,
                  message: "Minimum length is 6 characters",
                },
                maxLength: {
                  value: 24,
                  message: "Maximum length is 24 characters",
                },
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

            <p className="mr-[64%] text-gray-500 mt-5">Password</p>
            <input
              className="border-2 h-12 w-[30vw] border-black rounded-lg mt-2 pl-8"
              type="text"
              placeholder="Enter your password"
              {...register("password", {
                required: { value: true, message: "Field can't be empty" },
                minLength: {
                  value: 8,
                  message: "Minimum length is 8 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Maximum length is 16 characters",
                },
                validate: (value) => {
                  if (!/[a-z]/.test(value))
                    return "Lowercase character is required";
                  if (!/[A-Z]/.test(value))
                    return "Uppercase character is required";
                  if (!/\d/.test(value)) return "Number is required";
                  if (!/[@$!%*?&]/.test(value))
                    return "Special character is required (@$!%*?&)";
                  return true; // valid password
                },
              })}
            />

            {errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </div>
            )}

            <div className="btn flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-12 w-[80%] rounded-lg mt-5 font-bold text-[1.2rem] 
    ${
      isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-800 text-white"
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
