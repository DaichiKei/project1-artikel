"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image"; // Import Image untuk optimasi gambar

// Definisikan tipe data artikel
interface Artikel {
    judul: string;
    penulis: string;
    tanggal: string;
    isi: string;
    gambar: string;
    last_update: string | null; // last_update bisa null
    id: number;
}

export default function ArtikelList() {
    // State dengan tipe eksplisit
    const [artikel, setArtikel] = useState<Artikel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/artikel');
                const data = response.data.data;

                // Validasi bahwa data adalah array
                if (Array.isArray(data)) {
                    setArtikel(data as Artikel[]); 
                } else {
                    setError("Data yang diterima bukan array.");
                }
            } catch (err: unknown) {
                // Periksa apakah error berasal dari Axios
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError("Terjadi kesalahan saat memuat data.");
                }
            }
        };

        fetchArticles();
    }, []);

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
    const handleAdminList = () => {
        router.push(`/admin/artikel/list`);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Daftar Artikel</h1>
                <button
                    className="px-4 py-1 mb-1 text-red-600 hover:text-red-800 font-semibold rounded-md transition ease-in-out duration-300"
                    onClick={handleAdminList}
                >
                    Admin
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artikel.map((artikel, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 card hover:bg-slate-200 hover:cursor-pointer ease-in-out duration-300"
                        onClick={() => router.push(`/artikel/${artikel.id}`)}
                    >
                        <div className="relative w-full h-48">
                            <Image
                                src={artikel.gambar || "https://mgmall.s3.amazonaws.com/img/062023/390bed03e54f6440416f0568f61a82b563176996.jpg"}
                                alt={artikel.judul || "Gambar tidak tersedia"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {artikel.judul || "Judul tidak tersedia"}
                            </h2>
                            <p className="text-sm text-gray-600">
                                <strong>Penulis:</strong> {artikel.penulis || "Tidak diketahui"}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Tanggal:</strong> <br />
                                {new Date(artikel.tanggal).toLocaleString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: false,
                                }) || "Tidak tersedia"}
                            </p>
                            {artikel.last_update && (
                                <p className="text-sm text-gray-500 mt-2">
                                    <strong>Terakhir Diedit:</strong> <br />
                                    {new Date(artikel.last_update).toLocaleString("id-ID", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: false,
                                    })}
                                </p>
                            )}
                            <p className="text-gray-700 mt-4">
                                {artikel.isi ? `${artikel.isi.slice(0, 100)}...` : "Konten tidak tersedia"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
