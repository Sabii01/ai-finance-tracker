"use client";

export function LogoutButton() {
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <button onClick={logout} className="text-sm text-red-500">
      Logout
    </button>
  );
}
