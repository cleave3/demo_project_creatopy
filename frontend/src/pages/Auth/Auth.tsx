import { useState } from "react"
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Auth.css"

const Auth = () => {
    const [isLogin, setIslogin] = useState(true);

    const switchMode = (input: boolean) => {
        setIslogin(input)
    }

    return (
        <div className="auth-container">
            <div className="auth-form-container py-4 px-md-3 px-2 bg-white">
                <h3 className="text-center">LOGME <i className="fas fa-book-open  text-info "></i></h3>
                <nav className="my-2 d-flex justify-content-center">
                    <button onClick={() => switchMode(true)} className={`auth-switch-button mx-1 ${isLogin && "active text-info"}`}>Login</button>
                    <button onClick={() => switchMode(false)} className={`auth-switch-button mx-1 ${!isLogin && "active text-info"}`}>Register</button>
                </nav>
                {isLogin ? <Login switchMode={switchMode} /> : <Register switchMode={switchMode} />}
            </div>
        </div>
    )
}

export default Auth
