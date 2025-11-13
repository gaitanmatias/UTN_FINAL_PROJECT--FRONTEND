export const handleExpiredSession = (err) => {
  if (err?.response?.status === 401 || 
      err?.response?.data?.message?.toLowerCase().includes("token")) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
    return true;
  }
  return false;
};
