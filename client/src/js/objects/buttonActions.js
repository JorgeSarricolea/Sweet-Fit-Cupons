export const actions = {
  logout: function () {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
  redirectToHome: function () {
    window.location.href = "https://sweetandfit.mx/sucursales/";
  },
  test: function () {
    console.log("Test function called");
  },
};
