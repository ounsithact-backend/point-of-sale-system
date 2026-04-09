import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignin } from "../../auth/useSignin";
import { toast } from "react-hot-toast";

function Signin() {
  const navigate = useNavigate();
  const { isLoading, signin } = useSignin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signin(email, password);

      if (res?.success) {

        if (res?.result?.role === "super" || res?.result.role === "admin") {
          navigate("/")
        } else {
          if (res?.result?.role === "cashier") {
            navigate("/cashier/pos");
          }
        }
        toast.success("sign in successFully");

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-700 mb-8">
          Master POS
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required

              placeholder="Enter your password"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 
              ${isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"}`}
          >
            {isLoading ? "កំពុងដំណើរការ..." : "Signin"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;