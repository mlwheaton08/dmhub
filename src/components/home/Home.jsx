import { useNavigate } from "react-router-dom"

export function Home() {

    const navigate = useNavigate()


    return (
        <div className="my-10">
            <div className="mb-20 text-center">
                <h1 className="text-5xl">Combat tracker</h1>
                <h2 className="text-lg italic text-gray-300">for DnD 5e</h2>
            </div>
            <div className="flex justify-around text-4xl">
                <h2
                    className="hover:cursor-pointer hover:text-teal-500 transition-all duration-200"
                    onClick={() => navigate("/combat_tracker_v1")}
                >
                    Version 1
                </h2>
                <h2
                    className="hover:cursor-pointer hover:text-amber-500 transition-all duration-200"
                    onClick={() => navigate("/combat_tracker_v2")}
                >
                    Version 2
                </h2>
            </div>
        </div>
    )
}