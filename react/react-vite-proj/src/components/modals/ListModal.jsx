import CreateListForm from "./CreateListForm"
import { useState } from "react";

export default function ListModal() {

    const [listItems, setListItems] = useState([{ text: '' }]);

    

    const handleRemoveListItem = (index) => {
        setListItems(listItems.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, event) => {
        const newListItems = [...listItems];
        newListItems[index].text = event.target.value;
        setListItems(newListItems);
    };

    return (
        <div className="modal fade" id="listModal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">New list</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <CreateListForm 
                            listItems = {listItems}
                            setListItems={setListItems}
                            handleInputChange={handleInputChange}
                            handleRemoveListItem={handleRemoveListItem}
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}