/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState, SyntheticEvent, Fragment } from "react";
import { register } from "../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Register = ({ switchMode }) => {
    const [noMatch, setNoMatch] = useState(false);
    const name = useRef<HTMLInputElement>();
    const email = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const cpassword = useRef<HTMLInputElement>();

    const { loading } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const submit = async (e: SyntheticEvent<HTMLFormElement>) => {

        e.preventDefault();
        e.currentTarget.classList.add('was-validated');
        if (e.currentTarget.checkValidity()) {
            if (password.current.value !== cpassword.current.value) {
                setNoMatch(true);
                return;
            }
            const data = {
                query: `
                    mutation {
                        register(name: "${name.current.value}", email: "${email.current.value}", password: "${password.current.value}") {
                            name,
                            token
                          }
                    }
                `}
            dispatch(register(data));
        }
    }

    return (
        <Fragment>
            <form noValidate onSubmit={submit}>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label className="d-none d-md-block">Name</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter Name"
                            ref={name}
                        />
                        <div className="invalid-feedback">Name is required</div>
                    </div>
                    <div className="form-group col-md-12">
                        <label className="d-none d-md-block">Email</label>
                        <input
                            required
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            ref={email}
                        />
                        <div className="invalid-feedback">A valid email is required</div>
                    </div>
                    <div className="form-group col-md-12">
                        <label className="d-none d-md-block">Password</label>
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
                    <div className="form-group col-md-12">
                        <label className="d-none d-md-block">Confirm Password</label>
                        <input
                            required
                            type="password"
                            className="form-control"
                            name="cpassword"
                            placeholder="Confirm password"
                            ref={cpassword}
                        />
                        <div className="invalid-feedback">Please confirm your password</div>
                        {noMatch && <div className="text-danger">Password does not match</div>}
                    </div>
                </div>
                <button type="submit" className="btn  w-100 btn-info" id="registerbtn" disabled={loading}>
                    {!loading && <span>Register <i className="fas fa-sign-in-alt"></i></span>}
                    {loading && <i className="fas fa-pulse fa-spinner text-white"></i>}
                </button>
                <div>
                    <small className="m-1 text-left">Already Have an Account ? <span><a href="#" className="text-info" rel="noreferrer" onClick={() => switchMode(true)} >Login</a></span></small>
                </div>
            </form>
        </Fragment >
    )
}

export default Register
