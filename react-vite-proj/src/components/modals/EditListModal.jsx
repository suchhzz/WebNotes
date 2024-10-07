import EditListForm from "./EditListForm"
import { useEffect, useState } from "react";

export default function EditListModal({ id, title, contents }) {

    const [listItems, setListItems] = useState(contents ? [...contents] : [{ text: '' }]);

    useEffect(() => {
        if (contents) {
            setListItems([...contents]);
        }
    }, [contents]);


    const handleRemoveListItem = (index) => {
        setListItems(listItems.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, event) => {
        const newListItems = [...listItems];
        newListItems[index].text = event.target.value;
        setListItems(newListItems);
    };

    return (
        <div className="modal fade" id="editListModal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit list</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <EditListForm
                            listId={id}
                            listTitle={title}
                            listItems={listItems}
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