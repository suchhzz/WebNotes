export default function Header({ username }) {
    return (
        <header className="container">
            <div className="row text-center">
                <div className="col-6">
                    <p>Username: <b>{username}</b></p>
                </div>
            </div>
        </header>
    )
}