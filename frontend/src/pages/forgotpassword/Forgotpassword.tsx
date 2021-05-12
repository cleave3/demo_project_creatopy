import { SyntheticEvent, Fragment, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { forgotPassword } from "../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Forgotpassword.css"

const Forgotpassword = () => {
    const email = useRef<HTMLInputElement>();
    const { loading, message } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();

    const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('was-validated');
        if (e.currentTarget.checkValidity()) {
            const data = {
                query: `
                    mutation {
                        forgotPassword(email: "${email.current.value}") {
                            token,
                            message
                          }
                    }
                `}
            dispatch(forgotPassword(data));
        }
    }

    return message === "token sent" ? <Redirect to="/resetpassword" /> : (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 200px)" }}>
                <div className="container">
                    <form id="forgotpasswordform" className="mx-auto py-4 px-md-3 px-2 needs-validation" noValidate onSubmit={submit}>
                        <div className="text-center d-flex justify-content-center"><span><h3 className="p-3">Forgot Password</h3></span></div>
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
                                    <span style={{ cursor: "pointer" }} className="input-group-text" id="basic-addon2"><i className="fas fa-at text-dark" aria-hidden="true"></i></span>
                                </div>
                                <div className="invalid-feedback">Email is required</div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-info  w-100" id="loginbtn" disabled={loading}>
                            {!loading && <span>Submit <i className="fas fa-paper-plane"></i></span>}
                            {loading && <i className="fas fa-pulse fa-spinner text-white"></i>}
                        </button>
                        <div>
                            <small className="m-1 text-left"><span><Link to="/auth">Back to Login</Link></span></small>
                        </div>
                    </form>

                </div>

            </div>
        </Fragment >
    )
}

export default Forgotpassword
