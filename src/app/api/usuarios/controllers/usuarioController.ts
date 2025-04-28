import * as usuarioService from "../services/usuarioService";
import validating from "./usuarioValidations";

export async function handleGetUsuarios() {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    return new Response(JSON.stringify(usuarios), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Error al obtener los usuarios" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function handleCreateUsuario(req: Request) {
  const { email, password, nombre, rol, localidad, esInmobiliaria } =
    await req.json();

  // Realiza la validación de los datos
  const validation = validating(email, rol, esInmobiliaria);
  if (!validation.valid) {
    // Si no es válido, devuelve el mensaje de error
    return new Response(
      JSON.stringify({ error: validation.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Verifica si el correo electrónico ya está registrado
  const existingUser = await usuarioService.getUsuarioByEmail(email);
  if (existingUser) {
    return new Response(
      JSON.stringify({ error: "Ya existe un usuario con ese correo electrónico." }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Si la validación pasó, realiza la creación del usuario
  if (!email || !password || !nombre || !rol || !localidad || esInmobiliaria === undefined) {
    return new Response(
      JSON.stringify({ error: "Todos los campos son obligatorios" }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const usuario = await usuarioService.createUsuario({
      email,
      password,
      nombre,
      rol,
      localidad,
      esInmobiliaria,
    });
    return new Response(JSON.stringify(usuario), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Error al crear el usuario" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
