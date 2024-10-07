import ListModal from "../components/modals/ListModal"
import NoteModal from "../components/modals/NoteModal"
import Header from "../components/Header"
import CardContainer from "../components/cards/CardContainer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUser } from "../services/userService"
import EditNoteModal from "./modals/EditNoteModal"
import EditListModal from "./modals/EditListModal"

export default function MainComponent() {

    const [user, setUser] = useState([]);
    const [editNoteData, setEditNoteData] = useState({ id: "", title: "", description: "" });
    const [editListData, setEditListData] = useState({ id: "", title: "", contents: null });
    const navigate = useNavigate();

    useEffect(() => {
        const authorize = async () => {
            try {
                const fetchedUser = await fetchUser();
                console.log('Fetched User:', fetchedUser);
                setUser(fetchedUser);
            } catch (error) {
                console.error("Error fetching user:", error);
                navigate("/login");
            }
        };
        authorize();
    }, []);

    useEffect(() => {
        console.log("List data updated:", editListData);
    }, [editListData]);

    const handlerEditNote = (id, title, description) => {
        setEditNoteData({ id, title, description });
        const modal = new bootstrap.Modal(document.getElementById('editNoteModal'));
        modal.show();
    }

    const handlerEditList = (id, title, contents) => {
        setEditListData({ id, title, contents: [...contents] });
        const modal = new bootstrap.Modal(document.getElementById('editListModal'));
        modal.show();
    }


    return (
        <>
            <Header username={user?.username} />
            <section className="container">
                <div className="create-note row">
                    <button className="col-3 btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#noteModal">Create Note</button>
                    <button className="col-3 btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#listModal">Create List</button>
                </div>
                <NoteModal />
                <ListModal />

                <EditNoteModal
                    id={editNoteData.id}
                    title={editNoteData.title}
                    descripition={editNoteData.description} />

                <EditListModal
                    id={editListData.id}
                    title={editListData.title}
                    contents={editListData.contents}
                />

                <CardContainer
                    onEditNote={handlerEditNote}
                    onEditList={handlerEditList} />
            </section>
        </>
    )
}