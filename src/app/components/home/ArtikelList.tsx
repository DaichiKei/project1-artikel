"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image"; // Import Image untuk optimasi gambar

// Definisikan tipe data artikel
interface Article {
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
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/artikel');
                const data = response.data.data;

                // Validasi bahwa data adalah array
                if (Array.isArray(data)) {
                    setArticles(data as Article[]); // Cast data ke tipe Article[]
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

    if (articles.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600 text-xl font-semibold">Memuat data...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Daftar Artikel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 card hover:bg-slate-200 hover:cursor-pointer ease-in-out duration-300"
                        onClick={() => router.push(`/artikel/${article.id}`)}
                    >
                        <div className="relative w-full h-48">
                            <Image
                                src={article.gambar || "https://via.placeholder.com/400"}
                                alt={article.judul || "Gambar tidak tersedia"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {article.judul || "Judul tidak tersedia"}
                            </h2>
                            <p className="text-sm text-gray-600">
                                <strong>Penulis:</strong> {article.penulis || "Tidak diketahui"}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Tanggal:</strong> <br />
                                {new Date(article.tanggal).toLocaleString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: false,
                                }) || "Tidak tersedia"}
                            </p>
                            {article.last_update && (
                                <p className="text-sm text-gray-500 mt-2">
                                    <strong>Terakhir Diedit:</strong> <br />
                                    {new Date(article.last_update).toLocaleString("id-ID", {
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
                                {article.isi ? `${article.isi.slice(0, 100)}...` : "Konten tidak tersedia"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
