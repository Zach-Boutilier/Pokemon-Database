'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PokemonDetailPage({ params }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { id } = React.use(params);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        if (id) {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();

          const requiredObjects = ['id', 'abilities', 'stats', 'types', 'sprites', 'name'];
          const extractedData = {};
          

          requiredObjects.forEach((obj) => {
            if (obj === 'sprites') {
              extractedData['official-artwork.front_default'] = data.sprites.other['official-artwork'].front_default;
            } else {
              extractedData[obj] = data[obj];
            }
          });

          setPokemonData(extractedData);
        } else {
          console.error('No ID found in params');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      

    };

    fetchPokemonData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!pokemonData) return <p className="text-center mt-10">No data found.</p>;

  return (
    <div className="p-6 bg-gray-500 shadow-lg max-w-4xl mx-auto flex items-center">
      {/* Image Section */}
      <div className="mr-8">
        <img src={pokemonData['official-artwork.front_default']} alt={pokemonData.name} className="w-100 h-100 rounded-lg border-black border-2"/>

        <button onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white justify-center rounded-lg hover:bg-green-400 hover:text-black">
          Back
        </button>
      </div>
    
      {/* Table Section */}
      <div className="w-1/2">
        <h1 className="text-4xl font-bold capitalize text-center mb-6">{pokemonData.name}</h1>
    
        <table className="w-full text-left border-2 border-black">

          <thead>
            <tr className="border-b border-black">
              <th className="text-xl font-semibold text-gray-800 p-3">Types:</th>
              <th className="p-3 border-l border-black capitalize">{pokemonData.types.map((t) => t.type.name).join(', ')}</th>
            </tr>

            <tr className="border-b-2 border-black">
              <th className="text-xl font-semibold text-gray-800 p-3">Dex Number:</th>
              <th className="p-3 border-l border-black">{pokemonData.id}</th>
            </tr>
          </thead>

          <tbody>
            {/* Stats */}

            {pokemonData.stats.map((s) => (
              <tr key={s.stat.name} className="border-b border-black">
                <td className="font-semibold text-lg p-3 text-gray-700 capitalize">{s.stat.name}</td>
                <td className="text-lg p-3 text-gray-700 border-l border-black">{s.base_stat}</td>
              </tr>
            ))}

            <tr className="border-b-2 border-t-2 border-black">
              <td className="font-semibold text-lg p-3 text-gray-700 capitalize">Base Stat Total</td>
              <td className="text-lg p-3 text-gray-700 border-l border-black">{pokemonData.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}</td>
            </tr>


            {/* Abilities */}

            <tr className="border-b border-black">
              <td className="font-semibold text-lg p-3 text-gray-700">Abilities</td>
              <td className="text-lg p-3 text-gray-700 border-l capitalize">
                {pokemonData.abilities.map((a) => a.ability.name).join(", ")}
              </td>
            </tr>
          </tbody>

        </table>

      </div>
    </div>
  );
}
