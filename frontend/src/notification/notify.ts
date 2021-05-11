import "./notify.css";

interface IToast {
    position: string[];
    timeout: number;
    container: HTMLDivElement;
    success(msg: string): void;
    error(msg: string): void;
    warning(msg: string): void;
    info(msg: string): void;
    confirm(msg: string, options: Options): void;
}

type Options = {
    yes: Function;
    no?: Function;
}

class Toast implements IToast {
    position: string[];
    timeout: number;
    container: HTMLDivElement;
    constructor(position = "top right", timeout = 5000) {
        this.position = position.split(" ");
        this.timeout = timeout;
        this.container = document.createElement("div");
        this.container.classList.add("toast-container");
        this.container.classList.add(this.position[0]);
        this.container.classList.add(this.position[1]);
        document.body.prepend(this.container);
    }

    success(msg: any) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.classList.add("opaque");
        toast.classList.add("success");
        toast.innerHTML = `&#10003&nbsp;${msg}`;
        this.container.appendChild(toast);

        setTimeout(() => {
            this.container.removeChild(toast);
        }, this.timeout);
    }

    error(msg: any) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.classList.add("opaque");
        toast.classList.add("error");
        toast.innerHTML = `&#x1F5D9;&nbsp;${msg}`;
        this.container.appendChild(toast);

        setTimeout(() => {
            this.container.removeChild(toast);
        }, this.timeout);
    }

    warning(msg: any) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.classList.add("opaque");
        toast.classList.add("warning");
        toast.innerHTML = `&#9888;&nbsp;${msg}`;
        this.container.appendChild(toast);

        setTimeout(() => {
            this.container.removeChild(toast);
        }, this.timeout);
    }

    info(msg: any) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.classList.add("opaque");
        toast.classList.add("info");
        toast.innerHTML = `&#8505;&nbsp;${msg}`;
        this.container.appendChild(toast);

        setTimeout(() => {
            this.container.removeChild(toast);
        }, this.timeout);
    }

    confirm(message: any, options: Options) {
        const confirm = document.createElement("div");
        confirm.classList.add("toastr-confirm");
        confirm.innerHTML = `<div class='toastr-confirm-body'>
    <h3 class='toastr-title text-red t-2'>&#9888;</h3>
    <div class='toastr-title'>${message}</div>
    <div class='toastr-actions'>
      <button id='toastr-btn-no' class='btn btn-danger'>&#x1F5D9;&nbsp;Cancel</button>
      <button id='toastr-btn-yes' class='btn btn-primary'>Confirm&nbsp;&#10003</button>
    </div></div>`;

        this.container.appendChild(confirm);
        document.querySelector("#toastr-btn-no")!.addEventListener(
            "click",
            () => {
                this.container.removeChild(confirm);
            },
            true
        );
        document.querySelector("#toastr-btn-yes")!.addEventListener(
            "click",
            () => {
                this.container.removeChild(confirm);
                options.yes();
            },
            true
        );
    }
}

export const toastr = new Toast();