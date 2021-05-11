import { useState, SyntheticEvent, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Http } from "../../Http/Http";
import { toastr } from "../../notification/notify";
import "./Forgotpassword.css"

const Forgotpassword = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [token, setToken] = useState(null)
    const [data, setData] = useState({ email: "" });
    const [resetdata, setResetData] = useState({ resettoken: "", password: "" });

    const history = useHistory();

    const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            e.currentTarget.classList.add('was-validated');
            if (e.currentTarget.checkValidity()) {
                setIsLoading(true)
                setIsSent(false)

                const result = await Http.post(data);

                if (result.status) {
                    toastr.success(result.message)
                    setIsSent(true)
                    setToken(result.data.token)
                } else {
                    result.error.map(error => toastr.error(error));
                }
            }
        } catch ({ message }) {
            toastr.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    const resetPassword = async (e: SyntheticEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            e.currentTarget.classList.add('was-validated');
            if (e.currentTarget.checkValidity()) {
                setIsLoading(true)
                const result = await Http.post(token);

                if (result.status) {
                    toastr.success(result.message)
                    history.push("/");
                } else {
                    result.error.map(error => toastr.error(error));
                }
            }
        } catch ({ message }) {
            toastr.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="container">
                    {isSent && <div className="alert alert-success text-center" role="alert">
                        <h4 className="alert-heading">Email sent Successfully <i className="fas fa-paper-plane    "></i></h4>
                        <p>We've sent an email to <b>{data.email}</b> containing your reset token. Kindly check your email inbox or spam folder. </p>
                        <hr />
                        <p className="mb-0">If you do not get the email. Kindly wait a few minutes and try again, Thank you</p>
                    </div>}
                    {!isSent && <form id="forgotpasswordform" className="mx-auto py-4 px-md-3 px-2 needs-validation" noValidate onSubmit={submit}>
                        <div className="text-center d-flex justify-content-center"><i className="fas fa-lock fa-3x"></i><span><h3 className="p-3">Forgot Password</h3></span></div>
                        <div className="form-group">
                            <label className="d-none d-md-block">Email</label>
                            <div className="input-group mb-3">
                                <input
                                    required
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })} />
                                <div className="input-group-append">
                                    <span style={{ cursor: "pointer" }} className="input-group-text" id="basic-addon2"><i className="fas fa-at text-dark" aria-hidden="true"></i></span>
                                </div>
                                <div className="invalid-feedback">Email is required</div>
                            </div>
                        </div>
                        <button type="submit" className="btn  w-100" id="loginbtn" disabled={isLoading}>
                            {!isLoading && <span>Submit <i className="fas fa-paper-plane"></i></span>}
                            {isLoading && <i className="fas fa-pulse fa-spinner text-white"></i>}
                        </button>
                        <div>
                            <small className="m-1 text-left"><span><Link to="/">Back to Login</Link></span></small>
                        </div>
                    </form>}
                    {isSent && <form id="forgotpasswordform" className="mx-auto py-4 px-md-3 px-2 needs-validation" noValidate onSubmit={resetPassword}>
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
                                    onChange={(e) => setResetData({ ...resetdata, resettoken: e.target.value })} />
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
                                        onChange={(e) => setResetData({ ...resetdata, password: e.target.value })} />
                                    <div className="invalid-feedback">Password is required</div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn  w-100" id="loginbtn" disabled={isLoading}>
                            {!isLoading && <span>Reset password <i className="fas fa-paper-plane"></i></span>}
                            {isLoading && <i className="fas fa-pulse fa-spinner text-white"></i>}
                        </button>
                        <div>
                            <small className="m-1 text-left"><span><Link to="/">Back to Login</Link></span></small>
                        </div>
                    </form>}
                </div>

            </div>
        </Fragment >
    )
}

export default Forgotpassword
