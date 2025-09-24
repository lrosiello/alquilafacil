"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRef, useState } from "react";

type FotoEstado = {
  file: File;
  estado: "pendiente" | "subiendo" | "ok" | "error";
  id?: number;
  url?: string;
  errorMsg?: string;
};

export default function Home() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fotos, setFotos] = useState<FotoEstado[]>([]);
  const [subidas, setSubidas] = useState<FotoEstado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar selección de archivos (hasta 6)
  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (!files) return;
    if (fotos.length + files.length > 6) {
      setError("Solo puedes seleccionar hasta 6 imágenes");
      return;
    }
    setError(null);
    setFotos((prev) => [
      ...prev,
      ...Array.from(files).map((file) => ({
        file,
        estado: "pendiente" as const,
      })),
    ]);
  };

  // Subir todas las imágenes seleccionadas
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const nuevasFotos: FotoEstado[] = fotos.map((f) => ({
      ...f,
      estado: "subiendo",
    }));
    setFotos(nuevasFotos);

    const resultados: FotoEstado[] = [];

    for (let i = 0; i < nuevasFotos.length; i++) {
      try {
        const formData = new FormData();
        formData.append("image", nuevasFotos[i].file);
        const res = await fetch("/api/fotos/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al subir imagen");
        resultados.push({
          ...nuevasFotos[i],
          estado: "ok",
          id: data.fotoId,
          url: data.url,
        });
      } catch (err) {
        resultados.push({
          ...nuevasFotos[i],
          estado: "error",
          errorMsg: err instanceof Error ? err.message : "Error de red",
        });
      }
      setFotos((prev) =>
        prev.map((foto, idx) => (idx === i ? resultados[i] : foto))
      );
    }

    // Mostrar solo las últimas 6 subidas exitosas
    setSubidas((prev) => {
      const exitosas = resultados.filter((f) => f.estado === "ok");
      return [...prev, ...exitosas].slice(-6);
    });

    setLoading(false);
  };

  // Eliminar imagen subida por id
  const handleDelete = async (fotoId?: number) => {
    if (!fotoId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/fotos/${fotoId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSubidas((prev) => prev.filter((f) => f.id !== fotoId));
      } else {
        setError("No se pudo eliminar la imagen");
      }
    } catch {
      setError("Error de red al eliminar");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFoto = (idx: number) => {
    setFotos((prev) => prev.filter((_, i) => i !== idx));
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
        <form onSubmit={handleUpload}>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            multiple
            disabled={loading}
            onChange={handleFileChange}
          />
          <button type="submit" disabled={loading || fotos.length === 0}>
            {loading ? "Subiendo..." : "Enviar"}
          </button>
        </form>

        {/* Previews antes de subir */}
        {fotos.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {fotos.map((foto, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Botón X para eliminar */}
                <button
                  type="button"
                  onClick={() => handleRemoveFoto(idx)}
                  className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
                  title="Eliminar"
                >
                  ×
                </button>
                <img
                  src={URL.createObjectURL(foto.file)}
                  alt="Preview"
                  className="max-w-xs rounded"
                  style={{ opacity: foto.estado === "ok" ? 1 : 0.5 }}
                />
                <span className="text-xs text-gray-500">{foto.file.name}</span>
                {foto.estado === "subiendo" && (
                  <span className="text-blue-500">Subiendo...</span>
                )}
                {foto.estado === "error" && (
                  <span className="text-red-500">{foto.errorMsg}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mostrar últimas 6 imágenes subidas */}
        {subidas.length > 0 && (
          <>
            <h2 className="mt-8 text-lg font-bold">Últimas 6 fotos subidas</h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {subidas.map((foto, idx) => (
                <div
                  key={foto.id ?? idx}
                  className="flex flex-col items-center"
                >
                  <img
                    src={foto.url}
                    alt="Imagen subida"
                    className="max-w-xs rounded"
                  />
                  <button
                    onClick={() => handleDelete(foto.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                    disabled={loading}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </>
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
