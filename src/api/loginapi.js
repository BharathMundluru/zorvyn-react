export const loginWithGoogle = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Google User",
        role: "user",
        email: "user@gmail.com"
      });
    }, 1000);
  });
};