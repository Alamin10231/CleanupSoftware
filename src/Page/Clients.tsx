import Button from "@/Components/Button";
import { useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const Clients = () => {
    const location = useLocation();
    const currentPage = location.pathname.split("/");
    return (
        <div className="px-4 pt-5">
            <div className="flex justify-between">
                <div>
                    <h2>{currentPage}</h2>
                    <p>Manage clients and subscription</p>
                </div>
                <Button icon={<FiPlus />} text="Add Client" />
            </div>
        </div>
    )
}

export default Clients;