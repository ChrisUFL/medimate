import "../../css/app.css"
import {Link} from "@inertiajs/react";
export default function Home() {
    return  (
        <>
            <h1 className="font-semibold, text-orange-600">Hello World</h1>
            <Link to={route('app.home')} className="text-indigo-400">Home</Link>
        </>
    )
}
