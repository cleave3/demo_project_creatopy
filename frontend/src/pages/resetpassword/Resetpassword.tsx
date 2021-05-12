import { useRef, SyntheticEvent, Fragment } from "react"
import { Link, Redirect } from "react-router-dom"
import { resetPassword } from "../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Resetpassword = () => {
    const resettoken = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();

    const { loading, message, token } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('was-validated');
        if (e.currentTarget.checkValidity()) {
            const data = {
                query: `
                mutation {
                    resetPassword(password: "${password.current.value}", resettoken: ${resettoken.current.value}) {
                        message
                      }
                }
            `}
            dispatch(resetPassword(data, token));
        }
    }

    return message === "reset-sucessful" ? <Redirect to="/auth" /> : (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 200px)" }}>
                <div className="container">
                    <div className="alert alert-success text-center" role="alert">
                        <p>We've sent you an email containing your reset token. Kindly check your email inbox or spam folder. </p>
                        <hr />
                        <p className="mb-0">If you do not get the email. Kindly wait a few minutes and try again, Thank you</p>
                    </div>
                    <form id="forgotpasswordform" className="mx-auto py-4 px-md-3 px-2 needs-validation" noValidate onSubmit={submit}>
                        <div className="text-center d-flex justify-content-center"><h3 className="p-3">Reset Password</h3></div>
                        <div className="form-group">
                            <label className="d-none d-md-block">Token</label>
                            <div className="input-group mb-3">
                                <input
                                    required
                                    type="token"
                                    className="form-control"
                                    name="token"
                                    placeholder="Enter token"
                                    ref={resettoken}
                                />
                                <div className="invalid-feedback">Reset token is required</div>
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
                                        pattern=".{6,}"
                                        ref={password}
                                    />
                                    <div className="invalid-feedback">Password must be atleast 6 characters long</div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-info  w-100" disabled={loading}>
                            {!loading && <span>Reset password <i className="fas fa-paper-plane"></i></span>}
                            {loading && <i className="fas fa-pulse fa-spinner text-white"></i>}
                        </button>
                        <div>
                            <small className="m-1 text-left"><span><Link to="/auth">Back to Login</Link></span></small>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Resetpassword
