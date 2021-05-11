import moment from "moment"

const ListItem = ({ data, deleteAction }) => {
    return (
        <div className="card p-2 my-1">
            <div className="d-flex justify-content-between py-2">
                <div className="card-title font-weight-bold">{data.title}</div>
                <div className="action-btn">
                    <button className="btn btn-danger" title="Delete Item" onClick={() => deleteAction(data.id)}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-between">
                    <div className="creator">created by  <em>{data.creator.name}</em> </div>
                    <div className="time"><em>created At </em> {moment(new Date(data.createdAt)).format("LLLL")}</div>
                </div>
            </div>
        </div>
    )
}

export default ListItem
