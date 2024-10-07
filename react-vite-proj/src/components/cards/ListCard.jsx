import { useState } from "react";
import { deleteList, checkList } from "../../services/listService";

export default function ListCard({ id, title, contents, onEditList }) {
    const [listItems, setListItems] = useState(contents); 

    const handleDelete = () => {
        event.preventDefault();
        deleteList(id);
    };

    const handleCheckboxChange = (index) => {
        const updatedItems = listItems.map((item, i) => 
            i === index ? { ...item, isChecked: !item.isChecked} : item
        );

        setListItems(updatedItems);

        checkList(title, updatedItems[index]);
    };

    const handleListEdit = () => {
        onEditList(id, title, listItems);
    }

    return (
        <div className="card col-3" style={{ width: '18rem' }} id={id}>
            <div className="card-body">
                <div className="card-title-container d-flex">
                    <h5 className="card-title" onClick={handleListEdit}>{title}</h5>
                    <button className="trash-icon-button bi bi-trash-fill btn" onClick={handleDelete}></button>
                </div>
                <hr />
                <div className="card-text-checkbox d-flex-left-centered">
                    {listItems.map((item, index) => (
                        <div className="list-item d-flex list-card-text" key={index}>
                            <input 
                                type="checkbox" 
                                checked={item.isChecked} 
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <p className="card-text">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>  
    );
}
