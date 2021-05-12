import { Fragment } from 'react'
import { Link } from "react-router-dom"
import { logout } from '../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const TopNav = () => {
    const { auth } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    return (
        <Fragment>
            <nav className="navbar navbar-expand-md navbar-white bg-white border border-bottom fixed-top d-flex justify-content-between" style={{ height: "60px" }}>
                <Link to="/" className="navbar-brand text-dark font-weight-bold">
                    LOGME <i className="fas fa-book-open  text-info "></i>
                </Link>
                {auth && <div className="d-flex">
                    <button className="btn btn-danger btn-sm w-100 mx-2" onClick={() => dispatch(logout())}>
                        <i className="fas fa-sign-in-alt"></i>&nbsp;Logout
                    </button>
                </div>}
            </nav>
        </Fragment>
    )
}

export default TopNav;
