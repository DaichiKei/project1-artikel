"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Artikel {
    judul: string;
    penulis: string;
    tanggal: string;
    isi: string;
    gambar: string;
    last_update: string | null;
    id: number;
}

export default function ArtikelListAdmin() {
    const [artikel, setArtikel] = useState<Artikel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/artikel');
                const data = response.data.data;

                if (Array.isArray(data)) {
                    setArtikel(data as Artikel[]);
                } else {
                    setError("Data yang diterima bukan array.");
                }
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError("Terjadi kesalahan saat memuat data.");
                }
            }
        };

        fetchArticles();
    }, []);

    const handleEdit = (id: number) => {
        router.push(`/admin/artikel/edit/${id}`);
    };

    const handleCreate = () => {
        router.push(`/admin/artikel/create`);
    };

    const handleLihat = (id: number) => {
        router.push(`/artikel/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
            try {
                await axios.delete(`/api/artikel/${id}`);
                setArtikel((prev) => prev.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Error deleting artikel:", error);
                alert("Gagal menghapus artikel. Silakan coba lagi.");
            }
        }
    };

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-100">
                <p className="text-red-600 text-xl font-semibold">Terjadi kesalahan: {error}</p>
            </div>
        );
    }

    if (artikel.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600 text-xl font-semibold">Memuat data...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Daftar Artikel</h1>
                <button
                    className="px-4 py-1 mb-1 border border-green-600 text-green-600 bg-green-100 hover:bg-green-600 hover:text-white font-semibold rounded-md transition ease-in-out duration-300"
                    onClick={handleCreate}
                >
                    Buat
                </button>
            </div>

            <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Id</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Judul</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Penulis</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Dibuat Tanggal</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Terakhir Diedit</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {artikel.map((item, index) => (
                        <tr
                            key={item.id}
                            className="border-t hover:bg-gray-100"
                        >
                            <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{item.id}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{item.judul}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{item.penulis}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                                {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                                {item.last_update
                                    ? new Date(item.last_update).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                    : "Belum diedit"}
                            </td>
                            <td className="px-4 py-2 text-sm">
                                <button
                                    className="text-blue-600 hover:text-blue-800 font-semibold mr-4"
                                    onClick={() => handleLihat(item.id)}
                                >
                                    Lihat
                                </button>
                                <button
                                    className="text-yellow-600 hover:text-yellow-800 font-semibold mr-4"
                                    onClick={() => handleEdit(item.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800 font-semibold"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
