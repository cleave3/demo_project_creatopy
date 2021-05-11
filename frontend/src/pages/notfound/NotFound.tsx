import {Link} from "react-router-dom"

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 100px)" }}>
            <div className="error404-area pt-30 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 card text-dark py-3">
                            <div className="error-wrapper text-center ptb-50 pt-xs-20">
                                <div className="error-text">
                                    <h1>404</h1>
                                    <h2>Oops! PAGE NOT FOUND</h2>
                                    <p>Sorry but the page you are looking for does not exist, have been removed, <br /> name changed or is temporarity unavailable.</p>
                                    <Link to="/" className="btn btn-sm btn-info">Go to Home <i className="fas fa-home    "></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
