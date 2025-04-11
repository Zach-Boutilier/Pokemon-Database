'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchTypeDetails } from '@/components/TypesData'; // Function to fetch type details by ID or name
import React from 'react'; // Make sure to import React

export default function PokemonTypeDetailPage({ params }) {
  const [typeDetails, setTypeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { id } = React.use(params); // Use React.use() to unwrap the Promise and get params

  useEffect(() => {
    const loadTypeDetails = async () => {
      setLoading(true); // Indicate loading
      console.log('Fetching type details for ID:', id); // Log for debugging
      const fetchedDetails = await fetchTypeDetails(id); // Fetch details for this type
      console.log(fetchedDetails); // Log the fetched data to check it
      setTypeDetails(fetchedDetails); // Set the fetched data
      setLoading(false); // Update loading state
    };
  
    if (id) {
      loadTypeDetails(); // Call the fetch function only when there's a valid ID
    }
  }, [id]); // Dependency array ensures effect runs whenever id changes

  if (loading) return <p>Loading Type Details...</p>;

  if (!typeDetails) return <p>No data found for this type.</p>;

  // Assuming 'typeDetails' is the object you're working with
if (typeDetails.name === "stellar") {
    // Modify the Super_effective array before destructuring
    typeDetails.Super_effective = ["Any Pokemon in a Terastallized state"];
  }

  const {
    name,
    imageUrl,
    Super_effective = [],
    Weak_to = [],
    Not_very_effective = [],
    Resists = [],
    No_effect = [],
    Immune_to = [],
  } = typeDetails;

  let updatedSuperEffective = Super_effective;

if (name === "stellar") {
  updatedSuperEffective = ["Any Pokemon in a Terastallized state"];
}

  return (
    <div className="bg-gray-300">
        <div className='bg-gray-200 p-2'>
            <h1 className="text-4xl font-bold text-center mb-6 capitalize">{name}</h1>

            <div className="flex justify-center mb-2">
                <img src={imageUrl} alt={`${typeDetails.name} type`} />
            </div>

            <div className='flex justify-center items-center'>
                <button onClick={() => router.back()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-400 hover:text-black">
                  Back
                </button>
            </div>
            
        </div>
      
        <div className="flex space-x-6 justify-center items-start p-6">

          {/* Offences Table (Left side) */}

            <div className="w-2/5 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-4 text-center">Offences</h2>
                <div className="flex-1 overflow-auto">
                    <table className="w-full table-auto border-collapse border-2 border-black">

                        <thead>
                            <tr>
                                <th className="border-2 border-black px-4 py-2 font-semibold w-1/2">Type of Damage</th>
                                <th className="border-2 border-black px-4 py-2 font-semibold w-1/2">Types</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td className="border-2 border-black px-4 py-2 font-semibold">Super Effective</td>
                                <td className="border-2 border-black px-4 py-2 capitalize">
                                    {Super_effective.length ? Super_effective.join(', ') : "None"}
                                </td>
                            </tr>

                            <tr>
                                <td className="border-2 border-black px-4 py-2 font-semibold">Not Very Effective</td>
                                <td className="border-2 border-black px-4 py-2 capitalize">
                                    {Not_very_effective.length ? Not_very_effective.join(', ') : "None"}
                                </td>
                            </tr>

                            <tr>
                                <td className="border-2 border-black px-4 py-2 font-semibold">No Effect</td>
                                <td className="border-2 border-black px-4 py-2 capitalize">
                                    {No_effect.length ? No_effect.join(', ') : "None"}
                                </td>
                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>

          {/* Defences Table (Right side) */}

            <div className="w-2/5 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-4 text-center">Defences</h2>
                <div className="flex-1 overflow-auto">
                    <table className="w-full table-auto border-collapse border-2 border-black">

                    <thead>
                        <tr>
                            <th className="border-2 border-black px-4 py-2 font-semibold w-1/2">Type of Damage</th>
                            <th className="border-2 border-black px-4 py-2 font-semibold w-1/2">Types</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="border-2 border-black px-4 py-2 font-semibold">Weak To</td>
                            <td className="border-2 border-black px-4 py-2 capitalize">
                            {Weak_to.length ? Weak_to.join(', ') : "None"}
                            </td>
                        </tr>

                        <tr>
                            <td className="border-2 border-black px-4 py-2 font-semibold">Resists</td>
                            <td className="border-2 border-black px-4 py-2 capitalize">
                            {Resists.length ? Resists.join(', ') : "None"}
                            </td>
                        </tr>

                        <tr>
                            <td className="border-2 border-black px-4 py-2 font-semibold">Immune To</td>
                            <td className="border-2 border-black px-4 py-2 capitalize">
                            {Immune_to.length ? Immune_to.join(', ') : "None"}
                            </td>
                        </tr>
                    </tbody>

                    </table>
                </div>
            </div>

        </div>
    </div>
  );
}