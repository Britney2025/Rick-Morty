import React, { useEffect, useState } from 'react'

function CharacterDetails() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchCharacter() {
            try {
                const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                if (!res.ok) throw new Error('Failed to fetch character');
                const data = await res.json();
                setCharacter(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchCharacter();
    }, [id]);
    if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
    if (!character) return <div className="p-4">Loading...</div>;
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Back to list
            </Link>
            <div className='bg-white shadow rounded-lg p-6 mt-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6'>
                <img src={character.image} alt={character.name} className="w-48 h-48 rounded-full border-4 border-gray-300" />
                <div className='text-center md:text-left'>
                    <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li><strong>Status:</strong> {character.status}</li>
                        <li><strong>Species:</strong> {character.species}</li>
                        <li><strong>Type:</strong> {character.type || 'N/A'}</li>
                        <li><strong>Gender:</strong> {character.gender}</li>
                        <li><strong>Origin:</strong> {character.origin?.name}</li>
                        <li><strong>Location:</strong> {character.location?.name}</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default CharacterDetails