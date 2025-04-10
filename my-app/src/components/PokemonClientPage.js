'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchPokemonByGeneration } from '@/components/Pokemon';

const generationRanges = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 898],
  9: [899, 1010],
  10: [1026, 1302],
};

export default function PokemonClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const genParam = searchParams.get('gen');
  const selectedGeneration = parseInt(genParam) || 1;

  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemonByGeneration(selectedGeneration).then((data) => {
      setPokemonList(data);
      setLoading(false);
    });
  }, [selectedGeneration]);

  const goToGeneration = (gen) => {
    router.push(`/pokemon?gen=${gen}`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {Object.keys(generationRanges).map((gen) => (
          <button
            key={gen}
            onClick={() => goToGeneration(gen)}
            className={`px-3 py-1 rounded ${
              parseInt(gen) === selectedGeneration
                ? 'bg-red-500 text-white'
                : 'bg-blue-300 hover:bg-blue-400'
            }`}
          >
            Gen {gen}
          </button>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-4 text-white text-center">
        Generation {selectedGeneration} Pokémon
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => router.push(`/pokemon/${pokemon.id}`)}
            className="cursor-pointer bg-gray-300 shadow rounded p-3 text-center hover:bg-gray-100"
          >
            <img src={pokemon.sprite} alt={pokemon.name} className="mx-auto w-24 h-24" />
            <p className="capitalize font-bold">{pokemon.name}</p>
            <p className="text-sm">Height: {pokemon.height} ft</p>
            <p className="text-sm">Weight: {pokemon.weight} lbs</p>
          </div>
        ))}
      </div>
    </div>
  );
}