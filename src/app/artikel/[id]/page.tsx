"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image"; // Gunakan komponen Image untuk optimasi gambar

interface Artikel {
    judul: string;
    penulis: string;
    tanggal: string;
    isi: string;
    gambar: string | null;
    last_update: string | null;
    id: number;
}

interface Params {
    id: number;
}

export default function Artikel({ params }: { params: Promise<Params> }) {
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        fetchParams();
    }, [params]);

    const [artikel, setArtikel] = useState<Artikel | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id === null) return;

        const fetchArticles = async () => {
            try {
                const response = await axios.get(`/api/artikel/${id}`);
                const data = response.data.data;

                if (data) {
                    setArtikel(data[0]);
                } else {
                    setError("Artikel tidak ditemukan.");
                }
            } catch (err) {
                setError(
                    axios.isAxiosError(err)
                        ? err.message
                        : "Terjadi kesalahan saat memuat data."
                );
            }
        };

        fetchArticles();
    }, [id]);

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-100">
                <p className="text-red-600 text-xl font-semibold">Terjadi kesalahan: {error}</p>
            </div>
        );
    }

    if (!artikel) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-gray-600 text-xl font-semibold">Memuat data...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{artikel.judul}</h1>

            <div key={artikel.id} className="mb-6">
                <div className="text-gray-600 mb-4">
                    <p className="font-medium">Penulis: {artikel.penulis}</p>
                    <p className="text-sm">
                        Tanggal: {new Date(artikel.tanggal).toLocaleString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                        })}
                    </p>
                    {artikel.last_update && (
                        <p className="text-sm text-gray-500 mb-4">
                            Terakhir Diedit: {new Date(artikel.last_update).toLocaleString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                            })}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <p
                        className="text-base text-gray-700 leading-relaxed text-justify"
                        dangerouslySetInnerHTML={{
                            __html: artikel.isi.replace(/\n/g, "<br /><br />"),
                        }}
                    ></p>
                </div>


                <div className="w-full bg-gray-100 mb-6">
                    <Image
                        src={artikel.gambar || "https://via.placeholder.com/400"}
                        alt={artikel.judul}
                        width={800}
                        height={600}
                        className="w-full max-h-80 object-contain rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}
