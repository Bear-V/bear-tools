import {Outlet} from "react-router-dom";

function GlobalContent() {
    return (
        <>
            <div className="flex-auto flex flex-col  h-screen bg-green-200">
                <Outlet/>
            </div>
        </>
    );
}

export default GlobalContent