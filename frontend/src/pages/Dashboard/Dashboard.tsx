/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, SyntheticEvent, useRef } from "react"
import ListItem from "../../components/ListItem"
import { toastr } from "../../notification/notify";
import { addItem, getItems, removedItem } from "../../redux/actions/itemActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Dashboard = () => {
    const title = useRef<HTMLInputElement>();
    const { user: { name, token }, items: { loading, submitting, items } } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const getUserItems = () => {
        const data = {
            query: `
            query { items {
                id,
                title,
                creator {name}, 
                createdAt
                }
            }`
        }
        dispatch(getItems(data, token));
    }

    useEffect(() => {
        getUserItems();
    }, [token])

    const submitItem = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('was-validated');
        if (e.currentTarget.checkValidity()) {
            const data = {
                query: `
                mutation {
                        addItem(title: "${title.current.value}") {
                            id,
                            title,
                            creator {name},
                            createdAt
                          }
                    }
                `}
            dispatch(addItem(data, token));
        }
    }


    const deleteAction = async (id: number) => {
        toastr.confirm("Are you sure you want to delete this item ?", {
            yes: () => {
                const data = {
                    query: `
                    mutation {
                            removeItem(itemId: ${id}) {
                                id,
                                title
                              }
                        }
                    `}
                dispatch(removedItem(data, token))
            }
        })
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <h5 className="font-weight-bold text-right"> Welcome {name} <i className="fas fa-user-circle"></i></h5>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h3 className="text-center">Add Item</h3>
                        <div className="bg-white p-4">
                            <form className="needs-validation" noValidate onSubmit={submitItem}>
                                <input required type="text" className="form-control" placeholder="Enter Item title" ref={title} />
                                <div className="invalid-feedback">Please enter an item</div>
                                <div className="d-flex justify-content-center m-2">
                                    <button className="btn btn-info rounded w-50" disabled={submitting}>
                                        {submitting && "Submitting..."}
                                        {!submitting && "Add"} {" "}
                                        {!submitting && <i className="fas fa-plus-circle"></i>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="text-center">My Items</h3>
                        <div className="items-container">
                            {loading && <div className="text-center d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
                                <div>
                                    <p>Loading your items</p>
                                    <i className="fas fa-spinner fa-pulse fa-3x text-info"></i>
                                </div>
                            </div>}
                            {!loading && items.length < 1 && <div className="text-center d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
                                <div>
                                    <p>Your Item list is empty</p>
                                    <i className="fas fa-box-open fa-3x"></i>
                                </div>
                            </div>}
                            {!loading && items.map((data) => <ListItem key={data.id} data={data} deleteAction={deleteAction} />)}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard
