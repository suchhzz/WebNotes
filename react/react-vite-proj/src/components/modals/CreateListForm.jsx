
export default function CreateListForm({listItems, handleInputChange, handleRemoveListItem}) {

    return (
        <form className="container" id="listForm">
            <div id="listItem" className="row list-container">
                <input class="modal-input-title" placeholder="Title" type="text" />
                <hr />
                {listItems.map((item, index) => (
                    <div key={index} className="item-list-row row d-flex mb-2">
                        <input
                            type="text"
                            className="col-10"
                            value={item.title}
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
        </form>
    )
}