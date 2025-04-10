import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-red-600 p-4 shadow-md border-b border-gray-700 text-center">
            <h1 className="text-3xl font-bold text-black mb-4">Pokémon Database</h1>
            <div className="flex justify-center gap-4">
                <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-400 hover:text-black">
                    Home
                </Link>
            </div>
        </header>
    );
};

export default Header;