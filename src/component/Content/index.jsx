import {Outlet} from "react-router-dom";

function GlobalContent() {
    return (
        <>
            <div className="flex-auto h-screen bg-green-200">
                <Outlet />
            </div>
        </>
    );
}

export default GlobalContent