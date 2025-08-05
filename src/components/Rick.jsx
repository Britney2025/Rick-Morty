import React, { useEffect, useState } from 'react'


const BASE_URL = 'https://rickandmortyapi.com/api/character'

function Rick() {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('')
    useEffect(() => {
        let aborted = false
        async function fetchAllChars() {
            try {
                let allCharacters = [];
                let nextUrl = BASE_URL;

                while (nextUrl) {
                    const res = await fetch(nextUrl);
                    if (!res.ok) throw new Error(`Failed with status ${res.status}`);

                    const data = await res.json();
                    allCharacters = allCharacters.concat(data.results);
                    nextUrl = data.info.next;

                    if (aborted) break;

                }
                if (!aborted) {
                    console.log("Character fetched: ", allCharacters);
                    setCharacters(allCharacters);
                }


            } catch (err) {
                if (!aborted) setError(err.message);
                console.log('Error fetching all Data:', err)
            }
        }
        fetchAllChars();

        return () => {
            aborted = true;
        }

    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    };

    const filteredChars = characters.filter(character =>
        character.name.toLowerCase().includes(search.toLowerCase())
    )

    function deleteChar(idToDelete) {
        const currentchars = characters.filter(chars => chars.id !== idToDelete)
        setCharacters(currentchars)
    }


    if (error) return <div className='p-4 text-red-600'>Error: {error}</div>
    return (
        <div className='p-4'>
            <h2 className='font-bold text-3xl mb-4 text-center'>Rick and Morty characters ({characters.length})</h2>

            <input className='block mx-auto mb-6 p-2 border border-gray-300 rounded w-full max-w-md'
                type="text"
                name='search'
                placeholder='Search...'
                value={search}
                onChange={handleSearch}
            />


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {filteredChars.map((char) => (
                    <div
                        key={char.id}
                        className='border rounded-lg shadow-md overflow-hidden text-center p-4 bg-white'
                    >
                        <Link to={`/character/${char.id}`} className='cursor-pointer'>
                            <img
                                src={char.image}
                                className='w-full h-auto object-cover mb-2 rounded'
                            />
                            <h3 className='text-lg font-medium text-gray-800'>{char.name}</h3>

                        </Link>
                        <button onClick={() => deleteChar(char.id)} className='mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm'>DELETE ME</button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Rick