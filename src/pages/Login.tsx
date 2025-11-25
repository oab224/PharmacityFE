import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Tài khoản cố định
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "123456";

  const handleSubmit = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Đăng nhập thành công - chuyển về trang chủ
      window.location.href = "/";
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-4">
            <svg
              className="w-12 h-12 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center text-white">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">Đăng nhập để tiếp tục</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Tên đăng nhập
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-600 transition-all placeholder-gray-500"
              type="text"
              placeholder="Nhập username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Mật khẩu</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-600 transition-all placeholder-gray-500"
              type="password"
              placeholder="Nhập password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all mt-2 shadow-lg"
          >
            Đăng nhập
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gray-800 p-3 rounded-xl">
            <p className="text-gray-400 text-xs mb-1">Tài khoản demo:</p>
            <p className="text-white text-sm font-mono">admin / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
