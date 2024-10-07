import ListCard from "./ListCard";
import NoteCard from "./NoteCard";
import { useEffect, useState } from "react";
import { getLists, getNotes } from "../../services/notes";
import { deleteNote } from "../../services/noteService";

export default function CardContainer({ onEditNote, onEditList }) {
    const [noteData, setNoteData] = useState([]);
    const [listData, setListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const noteResponseData = await getNotes();
                setNoteData(noteResponseData);
                console.log(noteResponseData);

                const listResponseData = await getLists();
                setListData(listResponseData);
                console.log(listResponseData);

                console.log("user id" + user.id);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="cardContainer" className="card-section container d-flex row">
            {noteData.map((item) => (
                <NoteCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    onEditNote={onEditNote}
                />
            ))}

            {listData.map((item) => (
                <ListCard
                    id={item.id}
                    title={item.title}
                    contents={item.contents}
                    onEditList={onEditList}
                />
            ))}
        </div>
    );
}
