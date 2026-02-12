import API from "../services/Api";
export default function Footer() {
    return (
        <div className="bg-gray-800 text-white py-4 text-center">
            <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        </div>
    );
}