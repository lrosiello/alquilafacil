"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRef, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [deleteUrl, setDeleteUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fotoId, setFotoId] = useState<number | null>(null);

   // Subir imagen
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Selecciona una imagen");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/fotos/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImgUrl(data.url);
        setDeleteUrl(data.delete_url);
        setFotoId(data.fotoId);
      } else {
        setError(data.error || "Error al subir imagen");
      }
    } catch (err) {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar imagen
  const handleDelete = async () => {
  if (!fotoId) return;
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(`/api/fotos/${fotoId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setImgUrl(null);
      setDeleteUrl(null);
      setFotoId(null);
    } else {
      setError("No se pudo eliminar la imagen");
    }
  } catch {
    setError("Error de red al eliminar");
  } finally {
    setLoading(false);
  }
};

 
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session ? (
          <>
            <p>Bienvenido, {session.user?.name}</p>
            <button onClick={() => signOut()}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <p>No estás logueado.</p>
            <button onClick={() => signIn("google")}>
              Iniciar sesión con Google
            </button>
          </>
        )}

        {/* Subidor de imagen */}
        <form onSubmit={handleUpload} className="flex flex-col gap-2 mt-8">
          <input
            type="file"
            name="image" 
            accept="image/*"
            ref={fileInputRef}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Subiendo..." : "Subir imagen"}
          </button>
        </form>

        {/* Visor de imagen y botón de eliminar */}
        {imgUrl && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <img src={imgUrl} alt="Imagen subida" className="max-w-xs rounded" />
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar imagen"}
            </button>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
