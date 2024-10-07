import { editList } from "../../services/listService"
import { useEffect, useState } from "react";

export default function EditListForm({listId, listTitle, listItems, setListItems, handleInputChange, handleRemoveListItem}) {
    const [title, setTitle] = useState(listTitle);
    const [contents, setContents] = useState(listItems);
    const [id, setId] = useState(listId);


    useEffect(() => {
        setId(listId);
        setTitle(listTitle);
        setContents(listItems);
    }, [listTitle, listItems]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onSubmitHandler = () => {
        event.preventDefault();
        editList(id, title, contents);
    }
    
    const handleAddListItem = (event) => {
        event.preventDefault();
        setListItems([...contents, { id: null, text: '', isChecked: false }]);
    };
    

    return (
        <form className="container" id="listForm" onSubmit={onSubmitHandler}>
            <div id="listItem" className="row list-container">
                <input class="modal-input-title" placeholder="Title" type="text" value={title} onChange={handleTitleChange} />
                <hr />
                {contents.map((item, index) => (
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
                    <input type="submit" className="btn btn-primary" value="Save" />
                </div>
            </div>
        </form>
    )
}