'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Make sure you're importing this from next/navigation
import { fetchTypeData } from '@/components/Types'; // The function that fetches all types

export default function PokemonTypesPage() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadTypes = async () => {
      setLoading(true);
      const fetchedTypes = await fetchTypeData(); // Fetch all types
      setTypes(fetchedTypes);
      setLoading(false);
    };

    loadTypes();
  }, []);

  if (loading) return <p>Loading Types...</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Pokémon Types</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {types.map((type) => (
          <div
            key={type.name}
            className="bg-gray-300 rounded-lg p-4 text-center cursor-pointer"
            onClick={() => router.push(`/types/${type.id}`)} // Navigate to the detailed type page using name or id
          >
            <div className="flex justify-center mb-2">
              <img src={type.imageUrl} alt={`${type.name}`} />
            </div>
            <p className="text-lg mt-2">Click to see Pokémon of this type</p>
          </div>
        ))}
      </div>
    </div>
  );
}