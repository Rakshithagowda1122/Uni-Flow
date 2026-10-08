import { Button } from "@/components/ui/button";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">UniFlow</h1>
        <p className="mt-2 text-slate-500">College Management Portal</p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3 outline-none"
          />

          <Button className="w-full">Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
