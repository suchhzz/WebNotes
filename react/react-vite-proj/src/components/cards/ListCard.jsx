import { useState } from "react";
import { deleteList, checkList } from "../../services/listService";

export default function ListCard({ id, title, contents }) {
    const [listItems, setListItems] = useState(contents); 

    const handleDelete = () => {
        deleteList(id);
    };

    const handleCheckboxChange = (index) => {
        const updatedItems = listItems.map((item, i) => 
            i === index ? { ...item, isChecked: !item.isChecked} : item
        );

        setListItems(updatedItems);

        checkList(title, updatedItems[index]);

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
                    {listItems.map((item, index) => (
                        <div className="list-item d-flex" key={index}>
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
