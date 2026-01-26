export const checkAdminAuth = (): boolean => {
    if (typeof window === "undefined") return false;

    const session = localStorage.getItem("k9hope_admin_session");
    const username = localStorage.getItem("k9hope_admin_username");

    return session === "true" && username === "ADMIN";
};

export const logoutAdmin = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("k9hope_admin_session");
        localStorage.removeItem("k9hope_admin_username");
        localStorage.removeItem("k9hope_admin_login_time");
    }
};

export const getAdminSession = () => {
    if (typeof window === "undefined") return null;

    return {
        isAuthenticated: checkAdminAuth(),
        username: localStorage.getItem("k9hope_admin_username"),
        loginTime: localStorage.getItem("k9hope_admin_login_time"),
    };
};
