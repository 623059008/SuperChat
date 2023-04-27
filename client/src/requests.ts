export const loginRequest = async (email: string, password: string) => {
  const response = await fetch("/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  console.log(`response: ${response}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

export const registerRequest = async (
  username: string,
  email: string,
  password: string,
) => {
  const response = await fetch("/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  console.log(`response: ${response}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};