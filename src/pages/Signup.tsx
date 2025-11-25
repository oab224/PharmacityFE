import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    // Validate
    if (!username || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    // Đăng ký thành công (giả lập)
    setError("");
    setSuccess("Đăng ký thành công! Chuyển đến trang đăng nhập...");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center text-white">
          Create Account
        </h2>
        <p className="text-gray-400 text-center mb-8">Đăng ký tài khoản mới</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded-xl mb-6 text-sm text-center">
            {success}
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
            <label className="text-gray-400 text-sm mb-2 block">Email</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-600 transition-all placeholder-gray-500"
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Xác nhận mật khẩu
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-600 transition-all placeholder-gray-500"
              type="password"
              placeholder="Nhập lại password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all mt-2 shadow-lg"
          >
            Đăng ký
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="text-white hover:underline font-semibold"
            >
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
