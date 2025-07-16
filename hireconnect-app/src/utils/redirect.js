// utils/redirect.js
export const redirectToSignIn = () => {
  window.history.pushState({}, "", "/signin");
  window.dispatchEvent(new PopStateEvent("popstate"));
};
