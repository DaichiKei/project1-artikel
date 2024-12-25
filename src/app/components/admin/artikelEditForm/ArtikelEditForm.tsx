"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Componen {
  id: string;
}

const ArtikelEditForm = ({ id }: Componen) => {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [isi, setIsi] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    getArtikelById();
  }, []);

  const getArtikelById = async () => {
    try {
      const response = await axios.get(`/api/artikel/${id}`);
      const data = response.data.data[0];
      setJudul(data.judul);
      setPenulis(data.penulis);
      setIsi(data.isi);
    } catch (error) {
      console.error("Error fetching artikel:", error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setIsSending(true);
      await axios.patch(`/api/artikel/${id}`, {
        judul,
        penulis,
        isi,
      });
      setIsSending(false);
      router.push("/admin/artikel/list"); // Redirect after successful patch
    } catch (error) {
      setIsSending(false);
      console.error("Error editing artikel:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Artikel</h1>
      <form onSubmit={handleEdit} className="space-y-6">
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
            {isSending ? "Editing..." : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtikelEditForm;
