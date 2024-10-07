import { createList } from "../../services/listService"
import { useState } from "react";

export default function CreateListForm({listItems, setListItems, handleInputChange, handleRemoveListItem}) {
    const [title, setTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onSubmitHandler = () => {
        event.preventDefault();
        createList(title, listItems);
    }
    
    const handleAddListItem = () => {
        event.preventDefault();
        setListItems([...listItems, { text: '' }]);
    };

    return (
        <form className="container" id="listForm" onSubmit={onSubmitHandler}>
            <div id="listItem" className="row list-container">
                <input class="modal-input-title" placeholder="Title" type="text" onChange={handleTitleChange} />
                <hr />
                {listItems.map((item, index) => (
                    <div key={index} className="item-list-row row d-flex mb-2">
                        <input
                            type="text"
                            className="col-10"
                            value={item.text}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                        <button
                            type="button"
                            className="col-2 btn-close"
                            onClick={() => handleRemoveListItem(index)}
                        ></button>
                    </div>
                ))}
            </div>
            <div className="modal-footer">
                <div className="add-list-button">
                    <button id="newListItemBtn" className="col-3 btn btn-outline-dark" onClick={handleAddListItem}>+</button>
                </div>
                <div>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <input type="submit" className="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
    )
}