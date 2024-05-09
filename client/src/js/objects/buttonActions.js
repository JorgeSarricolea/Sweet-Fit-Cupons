export const actions = {
  logout: function () {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
  test: function () {
    console.log("Test function called");
  },
};
