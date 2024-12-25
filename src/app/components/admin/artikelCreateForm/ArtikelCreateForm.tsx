"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ArtikelCreateForm = () => {
    const router = useRouter();
    const [judul, setJudul] = useState('');
    const [penulis, setPenulis] = useState('');
    const [isi, setIsi] = useState('');
    const [isSending, setIsSending] = useState(false);

    const createArtikel = async (e:any) => {
        e.preventDefault(); 
        setIsSending(true);
        try {
            await axios.post('/api/artikel', {
                judul,
                penulis,
                isi,
            });
        } catch (error) {
            console.error("Error creating artikel:", error);
        } finally {
            setIsSending(false);
            router.push("/admin/artikel/list");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Buat Artikel Baru</h1>
            <form onSubmit={createArtikel} className="space-y-6">
                <div>
                    <label htmlFor="judul" className="block text-sm font-medium text-gray-700">
                        Judul
                    </label>
                    <input
                        type="text"
                        name="judul"
                        id="judul"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        placeholder="Isi dengan judul"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="penulis" className="block text-sm font-medium text-gray-700">
                        Penulis
                    </label>
                    <input
                        type="text"
                        name="penulis"
                        id="penulis"
                        value={penulis}
                        onChange={(e) => setPenulis(e.target.value)}
                        placeholder="Isi dengan namamu"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="isi" className="block text-sm font-medium text-gray-700">
                        Isi
                    </label>
                    <textarea
                        name="isi"
                        id="isi"
                        value={isi}
                        onChange={(e) => setIsi(e.target.value)}
                        placeholder="Isi dengan artikel kamu"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSending}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
                            isSending ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {isSending ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArtikelCreateForm;
