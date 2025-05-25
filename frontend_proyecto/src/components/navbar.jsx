import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-violet-800 text-white p-4 flex justify-between items-center font-[consolas]">
            <Link to="/" className="text-2xl font-bold hover:underline">
                💻 Computer specs
            </Link>
            <div className="flex space-x-4 text-lg">
            </div>
        </nav>
    );
}