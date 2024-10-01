import { deleteList } from "../../services/listOperations";

export default function ListCard({ key, id, title, contents}) {

    const handleDelete = () => {
        deleteList(id);
    };

    return (
    <div className="card col-3" style={{ width: '18rem' }} id={id}>
    <div className="card-body">
        <div className="card-title-container d-flex">
            <h5 className="card-title">{title}</h5>
            <button className="trash-icon-button bi bi-trash-fill btn" onClick={handleDelete}></button>
        </div>
      <hr />
        <div className="card-text-checkbox d-flex">
                {contents.map((item, index) => (
                    <div className="list-item d-flex" key={index}>
                        <input type="checkbox" checked={item.isChecked} />
                        <p className="card-text">{item.text}</p>
                    </div>
                ))}
        </div>
    </div>
</div>  
    )
}