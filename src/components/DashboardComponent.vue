<template>
    <div class="dashboard-container">
        <div class="sidebar" :class="{ 'sidebar-visible': isSidebarVisible }">
            <button class="close-sidebar" @click="toggleSidebar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" fill="none" stroke="#ff007f" stroke-width="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
            <h2 class="sidebar-title">Opciones</h2>
            <ul>
                <li @click="openAddStudentModal">
                    <span class="icon">📚</span><span class="option-text">Agregar Alumno</span>
                </li>
                <li @click="openAddUserModal">
                    <span class="icon">👤</span><span class="option-text">Agregar Usuario</span>
                </li>
                <li @click="openAddStaffModal">
                    <span class="icon">👥</span><span class="option-text">Agregar Personal para Staff</span>
                </li>
                <li @click="logout">
                    <span class="icon">🚪</span><span class="option-text">Cerrar Sesión</span>
                </li>
            </ul>
        </div>
        <div class="dashboard" :class="{ 'dashboard-disabled': isSidebarVisible || isAnyModalVisible }">
            <nav class="navbar">
                <button class="sidebar-toggle" @click="toggleSidebar">
                    ☰
                </button>
                <img src="/assets/logos/logo-sin-fondo.png" alt="Logo" class="login-logo" />
                <h1 class="dashboard-title">Panel de control y gestión Real Academy FC</h1>
            </nav>

            <div class="cards-container">
                <div class="card" v-for="(card, index) in cards" :key="index">
                    <img :src="card.src" alt="Imagen" class="card-img" />
                    <div class="card-content">
                        <h2>{{ card.title }}</h2>
                    </div>
                </div>
            </div>

            <!-- Modal para agregar alumno -->
            <div v-if="isAddStudentModalVisible" class="modal" :class="{ 'modal-visible': isSidebarVisible }">
                <button class="close-modal" @click="closeAddStudentModal">✖</button>
                <h3>Agregar Alumno</h3>
                <div class="input-group">
                    <label for="student-name">Nombre:</label>
                    <input id="student-name" v-model="newStudent.name" placeholder="Nombre" />
                </div>
                <div class="input-group">
                    <label for="student-rut">RUT:</label>
                    <input id="student-rut" v-model="newStudent.rut" placeholder="RUT" />
                </div>
                <div class="input-group">
                    <label for="student-address">Dirección:</label>
                    <input id="student-address" v-model="newStudent.address" placeholder="Dirección" />
                </div>
                <div class="input-group">
                    <label for="student-weight">Peso (kg):</label>
                    <input id="student-weight" v-model="newStudent.weight" placeholder="Peso (kg)" />
                </div>
                <div class="input-group">
                    <label for="student-height">Estatura (cm):</label>
                    <input id="student-height" v-model="newStudent.height" placeholder="Estatura (cm)" />
                </div>
                <div class="input-group">
                    <label for="student-age">Edad:</label>
                    <input id="student-age" v-model="newStudent.age" placeholder="Edad" />
                </div>
                <div class="input-group">
                    <label for="student-position">Posición de Fútbol:</label>
                    <select id="student-position" v-model="newStudent.position">
                        <option disabled value="">Selecciona una posición</option>
                        <option value="delantero">Delantero</option>
                        <option value="mediocampista">Mediocampista</option>
                        <option value="defensor">Defensor</option>
                        <option value="portero">Portero</option>
                        <!-- Agregar más opciones aquí -->
                    </select>
                </div>
                <div class="input-group">
                    <label for="student-category">Categoría:</label>
                    <select id="student-category" v-model="newStudent.category">
                        <option disabled value="">Selecciona una categoría</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                        <!-- Agregar más opciones aquí -->
                    </select>
                </div>
                <button @click="addNewStudent" class="add-button">Agregar</button>
            </div>

            <!-- Modal para agregar usuario -->
            <div v-if="isAddUserModalVisible" class="modal">
                <h3>Agregar Usuario</h3>
                <input v-model="newUser.name" placeholder="Nombre" />
                <input v-model="newUser.username" placeholder="Usuario" />
                <input v-model="newUser.password" placeholder="Contraseña" type="password" />
                <input v-model="newUser.occupation" placeholder="Ocupación" />
                <input v-model="newUser.userType" placeholder="Tipo de Usuario" />
                <button @click="addNewUser">Agregar</button>
                <button @click="closeAddUserModal">Cerrar</button>
            </div>

            <!-- Modal para agregar staff -->
            <div v-if="isAddStaffModalVisible" class="modal">
                <h3>Agregar Personal para Staff</h3>
                <input v-model="newStaff.name" placeholder="Nombre" />
                <input v-model="newStaff.rut" placeholder="RUT" />
                <input v-model="newStaff.address" placeholder="Dirección" />
                <input v-model="newStaff.phone" placeholder="Teléfono" />
                <input v-model="newStaff.email" placeholder="Email" />
                <input v-model="newStaff.occupation" placeholder="Ocupación" />
                <button @click="addNewStaff">Agregar</button>
                <button @click="closeAddStaffModal">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardComponent',
    data() {
        return {
            isSidebarVisible: false,
            isAddStudentModalVisible: false,
            isAddUserModalVisible: false,
            isAddStaffModalVisible: false,
            newStudent: {
                name: '',
                rut: '',
                address: '',
                weight: '',
                height: '',
                age: '',
                position: '',
                category: ''
            },
            newUser: {
                name: '',
                username: '',
                password: '123456', // Contraseña inicial
                occupation: '',
                userType: ''
            },
            newStaff: {
                name: '',
                rut: '',
                address: '',
                phone: '',
                email: '',
                occupation: ''
            },
            cards: [
                {
                    src: "/assets/logos/logo-sin-fondo.png",
                    title: "Alumnos inscritos",
                },
                {
                    src: "/assets/logos/logo-sin-fondo.png",
                    title: "Solicitudes pendientes",
                },
                {
                    src: "/assets/logos/logo-sin-fondo.png",
                    title: "Staff Academia",
                }
            ]
        };
    },
    computed: {
        isAnyModalVisible() {
            return this.isAddStudentModalVisible || this.isAddUserModalVisible || this.isAddStaffModalVisible;
        }
    },
    methods: {
        closeAddStudentModal() {
            this.isAddStudentModalVisible = false;
            this.newStudent = { name: '', rut: '', address: '', weight: '', height: '', age: '', position: '', category: '' }; // Resetear
        },
        addNewStudent() {
        if (!this.newStudent.name || !this.newStudent.rut || !this.newStudent.address || !this.newStudent.weight || !this.newStudent.height || !this.newStudent.age || !this.newStudent.position || !this.newStudent.category) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        alert('Alumno ingresado');
        this.cards.push({ title: this.newStudent.name });
        this.closeAddStudentModal();
        },

        closeAddUserModal() {
            this.isAddUserModalVisible = false;
            this.newUser = { name: '', username: '', password: '123456', occupation: '', userType: '' }; // Resetear
        },
        addNewUser() {
            this.cards.push({ title: this.newUser.username }); // Aquí puedes agregar la lógica que necesites
            this.closeAddUserModal();
        },
        closeAddStaffModal() {
            this.isAddStaffModalVisible = false;
            this.newStaff = { name: '', rut: '', address: '', phone: '', email: '', occupation: '' }; // Resetear
        },
        addNewStaff() {
            this.cards.push({ title: this.newStaff.name }); // Aquí puedes agregar la lógica que necesites
            this.closeAddStaffModal();
        },
        openAddStudentModal() {
            this.isAddStudentModalVisible = true;
        },
        openAddUserModal() {
            this.isAddUserModalVisible = true;
        },
        openAddStaffModal() {
            this.isAddStaffModalVisible = true;
        },
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        logout() {
            alert('Cerrando sesión...');
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.dashboard-container {
    height: 100vh;
    background-color: black; 
    display: flex; 
    position: relative; 
    overflow: hidden; 
}

.modal {
    background-color: rgba(28, 28, 28, 0.9); 
    padding: 20px; 
    border-radius: 10px; 
    width: 300px; 
    color: #fff; 
    position: fixed; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    z-index: 140; 
    font-family: 'Bebas Neue', sans-serif; /* Fuente personalizada */
}

.close-modal {
    background: none;
    border: none;
    color: #ff007f; 
    font-size: 1.5em; 
    cursor: pointer; 
    position: absolute; 
    top: 10px; 
    right: 10px; 
}

.add-button {
    background-color: #ff007f; /* Color rosado */
    color: white; /* Texto blanco */
    border: none; 
    padding: 10px 20px; 
    border-radius: 5px; 
    cursor: pointer; 
    font-family: 'Bebas Neue', sans-serif; /* Fuente para el botón */
    width: 100%; /* Para que ocupe todo el ancho del modal */
}

.add-button:hover {
    opacity: 0.8; /* Efecto hover */
}

.input-group {
    margin-bottom: 10px; /* Espacio entre los campos */
}

.input-group label {
    margin-bottom: 5px; /* Espacio entre la etiqueta y el campo */
    display: block; /* Para que la etiqueta esté en línea con el input */
    color: #ff007f; /* Color de las etiquetas */
    font-family: 'Bebas Neue', sans-serif; /* Fuente para las etiquetas */
}

.modal input,
.modal select {
    width: calc(100% - 10px); /* Ancho con padding */
    padding: 5px; /* Espaciado interno */
    border-radius: 5px; /* Bordes redondeados para inputs */
    border: 1px solid #ff007f; /* Borde con color rosado */
    background-color: rgba(255, 255, 255, 0.1); /* Fondo claro */
    color: #fff; /* Color del texto */
    font-family: 'Bebas Neue', sans-serif; /* Fuente para los inputs */
}

/* Para asegurarse de que la fuente se aplique a todo el modal */
.modal h3 {
    font-family: 'Bebas Neue', sans-serif; /* Fuente para el título del modal */
}

.sidebar {
    width: 250px; 
    background-color: #333; 
    color: #fff; 
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: calc(100% - 50px); /* Restar padding superior e inferior */
    position: absolute; 
    top: 5px; /* Margen superior */
    bottom: 1px; /* Margen inferior */
    transform: translateX(-100%); 
    transition: transform 0.3s ease; 
    z-index: 120; 
    border-radius: 50px; /* Bordes redondeados en cada punta */
}

.sidebar-visible {
    transform: translateX(0); 
}

.dashboard-disabled {
    pointer-events: none; 
    opacity: 0.5; 
}

.sidebar-title {
    margin-bottom: 10px; 
    font-size: 1.5em; 
    color: #ff007f; 
}

.sidebar ul {
    list-style-type: none; 
    padding: 0; 
    margin: 0; 
}

.sidebar li {
    margin: 15px 0; 
    cursor: pointer; 
    display: flex; 
    align-items: center; 
    justify-content: flex-start; 
}

.sidebar li:hover {
    text-decoration: underline; 
}

.icon {
    width: 30px; 
    text-align: center; 
}

.option-text {
    flex-grow: 1;
    text-align: left; 
}

.close-sidebar {
    background: none;
    border: none;
    color: #ff007f; 
    font-size: 1.2em; 
    width: 40px; 
    height: 40px; 
    cursor: pointer; 
    margin-bottom: 20px; 
}

.dashboard {
    flex: 1; 
    padding: 120px 30px 30px; /* Desplazamiento hacia abajo para las tarjetas */
    text-align: center; 
    overflow-y: auto; 
}

.navbar {
    display: flex; 
    align-items: center; 
    justify-content: center; 
    padding: 20px; 
    position: fixed; /* Fijo para que esté en la parte superior */
    top: 0; /* Sin distancia */
    left: 0; /* Sin distancia */
    right: 0; /* Sin distancia */
    background-color: transparent; /* Fondo transparente */
    z-index: 130; /* Asegurarse de que esté por encima de la barra lateral */
}

.sidebar-toggle {
    background: none;
    border: none;
    color: #ff007f; 
    font-size: 2em; 
    cursor: pointer; 
    position: absolute; 
    left: 20px; 
}

.login-logo {
    width: 60px; 
    margin-right: 20px; 
}

.dashboard-title {
    color: #ff007f; 
    font-size: 2em; 
}

.cards-container {
    display: grid; 
    grid-template-columns: repeat(1, 1fr); 
    gap: 30px; 
    justify-items: center; 
    width: 100%; 
    margin: 20px 0; 
}

.card {
    max-width: 320px; 
    height: 450px; 
    border-radius: 15px; 
    overflow: hidden; 
    background-color: #55555565; 
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); 
    transition: transform 0.5s ease; 
    cursor: pointer; 
    position: relative; 
}

.card-img {
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    transition: transform 0.5s ease; 
}

.card:hover {
    transform: scale(1.05); 
}

.card-content {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    text-align: center; 
    color: #fff; 
    padding: 20px; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    width: 100%; 
    height: 100%; 
}

.card-content h2 {
    margin-bottom: 10px; 
    font-size: 1.5em; 
    color: #fff; 
}

@media (max-width: 768px) {
    .dashboard-title, .login-logo {
        display: none; /* Ocultar logo y título en dispositivos pequeños */
    }

    .dashboard {
        padding-top: 120px; /* Aumentar el desplazamiento para las tarjetas */
    }

    .sidebar {
        width: 80%; /* Ancho para dispositivos pequeños */
        height: 80%; /* Altura para dispositivos pequeños */
        right: 10%;
        left: 0%;
        top: 10%; /* Desplazamiento superior */
        border-radius: 15px; /* Bordes redondeados */
    }

    .sidebar-toggle {
        left: 10px; 
    }

    .dashboard {
        overflow-y: auto; 
        padding-top: 120px; /* Aumentar el desplazamiento para el navbar */
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    .cards-container {
        grid-template-columns: repeat(2, 1fr); 
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .cards-container {
        grid-template-columns: repeat(3, 1fr); 
    }
}

@media (min-width: 1025px) {
    .cards-container {
        grid-template-columns: repeat(3, 1fr); 
    }
}
</style>

