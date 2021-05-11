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


export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(value);
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat().format(value);
}

export const formatCryptoCurrency = (value: number) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 10 }).format(value);

export const determineClass = (status: string) => {
  switch (status) {
    case "onhand":
    case "pending":
    case "processing":
    case "noresponse":
      return "warning";
    case "sent":
    case "paid":
    case "submitted":
    case "intransit":
    case "reversed":
      return "primary";
    case "recieved":
    case "confirmed":
    case "active":
    case "delivered":
    case "verified":
    case "complete":
    case "received":
    case "YES":
      return "success";
    case "deactivated":
    case "suspended":
    case "inactive":
    case "unpaid":
    case "cancelled":
    case "NO":
      return "danger";
    default:
      return "dark";
  }
}

export const formatDescription = data => {
  if (data.tradeType === "sell") {
    return `Sold ${formatCryptoCurrency(data.amount)} ${data.cryptoCurrency.toUpperCase()} 
                  for ₦${formatCurrency(data.exchangeValue)} at the 
                  rate of ₦${formatCurrency(data.exchangeRate)} per ${data.cryptoCurrency.toUpperCase()}`;
  } else {
    return `Bought ₦${formatCurrency(data.amount)} worth of ${data.cryptoCurrency.toUpperCase()} at the
              rate of ₦${formatCurrency(data.exchangeRate)} per ${data.cryptoCurrency.toUpperCase()}`;
  }
}

export const formatAmount = (data) => {
  return data.tradeType === "sell" ?
    `${formatCryptoCurrency(data.amount)} ${data.cryptoCurrency.toUpperCase()}` :
    `${formatCryptoCurrency(data.exchangeValue)} ${data.cryptoCurrency.toUpperCase()}`
}

export const formatDate = (date: string) => new Date(date).toLocaleString();
