export const toggleShow = () => {
  const password = document.getElementById("password") as HTMLInputElement;
  password.type = password.type === "password" ? "text" : "password";
  document.getElementById("eye").classList.toggle("fa-eye-slash");
}

export const formatDate = (date: string) => new Date(date).toLocaleString();
