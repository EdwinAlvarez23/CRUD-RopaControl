// Inicializar usuarios si no existen
if (!localStorage.getItem("users")) {
  const initialUsers = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "empleado", password: "empleado123", role: "employee" }
  ];
  localStorage.setItem("users", JSON.stringify(initialUsers));
}

let deleteAdminAuthenticated = false; // Para controlar el flujo de eliminación

function showMessage(text, isError = false) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.style.backgroundColor = isError ? "#dc3545" : "#28a745";
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

function hideAll() {
  document.getElementById("loginCard").classList.add("hidden");
  document.getElementById("admin-auth").classList.add("hidden");
  document.getElementById("create-user").classList.add("hidden");
  document.getElementById("delete-user").classList.add("hidden");
  document.getElementById("delete-user-auth").classList.add("hidden");
  document.getElementById("recover-password").classList.add("hidden");
}

function login(role) {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.username === username && u.password === password);

  if (user && user.role === role) {
    showMessage(`Bienvenido, ${user.username}`);
    localStorage.setItem("usuarioActual", JSON.stringify(user));

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    showMessage("Credenciales incorrectas o rol no válido", true);
  }
}

function requestAdminAuth() {
  hideAll();
  document.getElementById("admin-auth").classList.remove("hidden");
}

function verifyAdmin() {
  const adminUser = document.getElementById("adminAuthUsername").value.trim();
  const adminPass = document.getElementById("adminAuthPassword").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const admin = users.find(u => u.username === adminUser && u.password === adminPass && u.role === "admin");

  if (admin) {
    hideAll();
    document.getElementById("create-user").classList.remove("hidden");
  } else {
    showMessage("Autenticación de administrador fallida", true);
  }

  document.getElementById("adminAuthUsername").value = "";
  document.getElementById("adminAuthPassword").value = "";
}

function createUser() {
  const newUser = document.getElementById("newUsername").value.trim();
  const newPass = document.getElementById("newPassword").value.trim();
  const newRole = document.getElementById("newRole").value;

  if (!newUser || !newPass) {
    showMessage("Completa todos los campos", true);
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.some(u => u.username === newUser);

  if (exists) {
    showMessage("Ese usuario ya existe", true);
    return;
  }

  users.push({ username: newUser, password: newPass, role: newRole });
  localStorage.setItem("users", JSON.stringify(users));

  showMessage("Usuario creado exitosamente");
  backToLogin();
}

function showDeleteUserForm() {
  hideAll();
  deleteAdminAuthenticated = false;
  document.getElementById("delete-user-auth").classList.remove("hidden");
}

function verifyDeleteAdmin() {
  const adminUser = document.getElementById("deleteAuthUsername").value.trim();
  const adminPass = document.getElementById("deleteAuthPassword").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const admin = users.find(u => u.username === adminUser && u.password === adminPass && u.role === "admin");

  if (admin) {
    deleteAdminAuthenticated = true;
    hideAll();
    document.getElementById("delete-user").classList.remove("hidden");
  } else {
    showMessage("Autenticación de administrador fallida", true);
  }

  document.getElementById("deleteAuthUsername").value = "";
  document.getElementById("deleteAuthPassword").value = "";
}

function deleteUser() {
  const usernameToDelete = document.getElementById("deleteUsername").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!usernameToDelete) {
    showMessage("Escribe un nombre de usuario", true);
    return;
  }

  const filteredUsers = users.filter(u => u.username !== usernameToDelete);

  if (users.length === filteredUsers.length) {
    showMessage("Usuario no encontrado", true);
  } else {
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    showMessage("Usuario eliminado exitosamente");
    backToLogin();
  }

  document.getElementById("deleteUsername").value = "";
}

function recoverPassword() {
  const username = document.getElementById("recoverUsername").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username);

  if (user) {
    showMessage(`Contraseña: ${user.password}`);
  } else {
    showMessage("Usuario no encontrado", true);
  }

  document.getElementById("recoverUsername").value = "";
}

function showRecoverPasswordForm() {
  hideAll();
  document.getElementById("recover-password").classList.remove("hidden");
}

function backToLogin() {
  hideAll();
  document.getElementById("loginCard").classList.remove("hidden");

  // Limpiar todos los campos
  document.getElementById("adminAuthUsername").value = "";
  document.getElementById("adminAuthPassword").value = "";
  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("newRole").value = "employee";
  document.getElementById("deleteUsername").value = "";
  document.getElementById("recoverUsername").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("deleteAuthUsername").value = "";
  document.getElementById("deleteAuthPassword").value = "";
}

function backToDeleteUserStep() {
  hideAll();
  if (!deleteAdminAuthenticated) {
    document.getElementById("delete-user-auth").classList.remove("hidden");
  } else {
    document.getElementById("delete-user").classList.remove("hidden");
  }
}
