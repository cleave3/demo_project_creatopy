/* eslint-disable jsx-a11y/anchor-is-valid */
import { SyntheticEvent, Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { toggleShow } from "../../utils/utilities"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/actions/userActions";

const Login = ({ switchMode }) => {
    const email = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const { loading } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('was-validated');
        if (e.currentTarget.checkValidity()) {
            const data = {
                query: `
                    query {
                        login(email: "${email.current.value}", password: "${password.current.value}") {
                            name,
                            token
                          }
                    }
                `}
            dispatch(login(data));
        }
    }

    return (
        <Fragment>
            <form className="needs-validation" noValidate onSubmit={submit}>
                <div className="form-group">
                    <label className="d-none d-md-block">Email</label>
                    <div className="input-group mb-3">
                        <input
                            required
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            ref={email}
                        />
                        <div className="input-group-append">
                            <span style={{ cursor: "pointer" }} className="input-group-text" id="basic-addon2"><i className="fa fa-at text-dark" aria-hidden="true"></i></span>
                        </div>
                        <div className="invalid-feedback">Email is required</div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="d-none d-md-block">Password</label>
                    <div className="input-group mb-3">
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="*****"
                            ref={password}
                        />
                        <div className="input-group-append">
                            <span style={{ cursor: "pointer" }} className="input-group-text" id="basic-addon2" onClick={toggleShow}><i id="eye" className="fa fa-eye text-dark" aria-hidden="true"></i></span>
                        </div>
                        <div className="invalid-feedback">Password is required</div>
                    </div>
                </div>
                <button type="submit" className="btn  w-100 btn btn-info" id="loginbtn" disabled={loading}>
                    {!loading && <span>Login <i className="fas fa-sign-in-alt"></i></span>}
                    {loading && <i className="fas fa-pulse fa-spinner text-white"></i>}
                </button>
                <div>
                    <small className="m-1 text-left">Forgot Password ? <span><Link className="text-info" to="/forgotpassword">Click Here</Link></span></small>
                </div>
                <div>
                    <small className="m-1 text-left">Don't Have an Account ? <span><a href="#" className="text-info" onClick={() => switchMode(false)} >Register</a></span></small><br />
                </div>
            </form>
        </Fragment >
    )
}

export default Login
