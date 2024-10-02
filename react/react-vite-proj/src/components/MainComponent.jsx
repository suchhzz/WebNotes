import ListModal from "../components/modals/ListModal"
import NoteModal from "../components/modals/NoteModal"
import Header from "../components/Header"
import CardContainer from "../components/cards/CardContainer"

export default function MainComponent() {
    return (
        <>
            <Header />
                <section className="container">
                    <div className="create-note row">
                        <button className="col-3 btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#noteModal">Create Note</button>
                        <button className="col-3 btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#listModal">Create List</button>
                    </div>
                    <NoteModal />
                    <ListModal />

                    <CardContainer />
                </section>
        </>
    )
}