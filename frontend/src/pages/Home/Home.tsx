import {Link} from "react-router-dom"
const Home = () => {
    return (
        <div className="container-fluid">
        <div className="jumbotron jumbotron-fluid">
            <div className="container text-center">
                <h1 className="display-3">WELCOME TO LOGME</h1>
                <p className="lead">Click on Get Started to Begin</p>
                <hr className="my-2"/>
                <p className="d-flex justify-content-center">
                    <Link className="btn btn-success" to="/auth" role="button">Get Started <i className="fas fa-chevron-circle-right    "></i></Link>
                </p>
            </div>
        </div>
        </div>
    )
}

export default Home
