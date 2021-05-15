export const overlay = (isShow: boolean) => (document.getElementById("overlay")!.style.display = isShow ? "block" : "none");

export const openNav = () => {
  overlay(true);
  document.getElementById("sidenav")!.classList.add("toggled");
};

export const closeNav = () => {
  overlay(false);
  document.getElementById("sidenav")!.classList.remove("toggled");
};

export const toggleNav = () => {
  if (document.getElementById("sidenav")!.classList.contains("toggled")) {
    closeNav();
  } else {
    openNav();
  }
};

export const toggleShow = () => {
  const password = document.getElementById("password") as HTMLInputElement;
  password.type = password.type === "password" ? "text" : "password";
  document.getElementById("eye").classList.toggle("fa-eye-slash");
}


export const formatDate = (date: string) => new Date(date).toLocaleString();
