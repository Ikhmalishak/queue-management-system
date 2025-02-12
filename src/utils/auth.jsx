export const isAuthenticated = () => !!localStorage.getItem("token");

export const getUserRole = () => localStorage.getItem("role");

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
};
