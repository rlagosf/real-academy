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
        <div class="dashboard" :class="{ 'dashboard-disabled': isSidebarVisible }">
            <nav class="navbar">
                <button 
                    class="sidebar-toggle" 
                    v-if="!isAddStudentModalVisible && !isAddUserModalVisible && !isAddStaffModalVisible" 
                    @click="toggleSidebar">
                    ☰
                </button>
                <img src="/assets/logos/logo-sin-fondo.png" alt="Logo" class="login-logo" />
                <h1 class="dashboard-title">Panel de control y gestión Real Academy FC</h1>
            </nav>

            <div class="cards-container">
            <div 
                class="card" 
                v-for="(card, index) in cards" 
                :key="index" 
                :class="{ 'card-disabled': isAddStudentModalVisible || isAddUserModalVisible || isAddStaffModalVisible }"
                @click="goToComponent(card.title)" 
            >
                <img :src="card.src" alt="Imagen" class="card-img" />
                <div class="card-content">
                    <h2>{{ card.title }}</h2>
                </div>
            </div>
        </div>

            <!-- Modal para agregar alumno -->
            <div v-if="isAddStudentModalVisible" class="modal modal-visible modal-active">
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
                    <select id="student-position" v-model="newStudent.position" class="full-width">
                        <option disabled value="">Selecciona una posición</option>
                        <option value="delantero">Delantero</option>
                        <option value="mediocampista">Mediocampista</option>
                        <option value="defensor">Defensor</option>
                        <option value="portero">Portero</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="student-category">Categoría:</label>
                    <select id="student-category" v-model="newStudent.category" class="full-width">
                        <option disabled value="">Selecciona una categoría</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
                <button @click="addNewStudent" class="add-button">Agregar</button>
            </div>

            <!-- Modal para agregar usuario -->

            <!-- Modal para agregar usuario -->
<div v-if="isAddUserModalVisible" class="modal modal-visible modal-active modal-extra">
    <button class="close-modal" @click="closeAddUserModal">✖</button>
    <h3>Agregar Usuario</h3>
    <div class="input-group">
        <label for="user-name">Nombre:</label>
        <input id="user-name" v-model="newUser.name" placeholder="Nombre" />
    </div>
    <div class="input-group">
        <label for="user-username">Usuario:</label>
        <input id="user-username" v-model="newUser.username" placeholder="Usuario" />
    </div>
    <div class="input-group">
        <label for="user-password">Contraseña:</label>
        <input id="user-password" v-model="newUser.password" placeholder="Contraseña" type="password" />
    </div>
    <div class="input-group">
        <label for="user-occupation">Ocupación:</label>
        <input id="user-occupation" v-model="newUser.occupation" placeholder="Ocupación" />
    </div>
    <div class="input-group">
        <label for="user-type">Tipo de Usuario:</label>
        <input id="user-type" v-model="newUser.userType" placeholder="Tipo de Usuario" />
    </div>
    <button @click="addNewUser" class="add-button">Agregar</button>
</div>

<!-- Modal para agregar staff -->
<div v-if="isAddStaffModalVisible" class="modal modal-visible modal-active modal-extra">
    <button class="close-modal" @click="closeAddStaffModal">✖</button>
    <h3>Agregar Personal para Staff</h3>
    <div class="input-group">
        <label for="staff-name">Nombre:</label>
        <input id="staff-name" v-model="newStaff.name" placeholder="Nombre" />
    </div>
    <div class="input-group">
        <label for="staff-rut">RUT:</label>
        <input id="staff-rut" v-model="newStaff.rut" placeholder="RUT" />
    </div>
    <div class="input-group">
        <label for="staff-address">Dirección:</label>
        <input id="staff-address" v-model="newStaff.address" placeholder="Dirección" />
    </div>
    <div class="input-group">
        <label for="staff-phone">Teléfono:</label>
        <input id="staff-phone" v-model="newStaff.phone" placeholder="Teléfono" />
    </div>
    <div class="input-group">
        <label for="staff-email">Email:</label>
        <input id="staff-email" v-model="newStaff.email" placeholder="Email" />
    </div>
    <div class="input-group">
        <label for="staff-occupation">Ocupación:</label>
        <input id="staff-occupation" v-model="newStaff.occupation" placeholder="Ocupación" />
    </div>
    <button @click="addNewStaff" class="add-button">Agregar</button>
</div>


        </div>
    </div>
</template>

<script>
import ContactPetitions from './ContactPetitions.vue';
import StaffAcademy from './StaffAcademy.vue';
import SubscribedKids from './SubscribedKids.vue';
import axios from 'axios';

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
                    component: SubscribedKids
                },
                {
                    src: "/assets/logos/logo-sin-fondo.png",
                    title: "Solicitudes pendientes",
                    component: ContactPetitions
                },
                {
                    src: "/assets/logos/logo-sin-fondo.png",
                    title: "Staff Academia",
                    component: StaffAcademy
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
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },

        openAddStudentModal() {
            this.isAddStudentModalVisible = true;
            this.isSidebarVisible = false; // Ocultar la barra lateral al abrir el modal
        },

        closeAddStudentModal() {
            this.isAddStudentModalVisible = false;
            this.newStudent = { name: '', rut: '', address: '', weight: '', height: '', age: '', position: '', category: '' }; // Resetear campos
            this.isSidebarVisible = true;  // Restaurar la barra lateral si es necesario
        },

        addNewStudent() {
    // Validar campos
                if (!this.newStudent.name || !this.newStudent.rut || !this.newStudent.address || !this.newStudent.weight || !this.newStudent.height || !this.newStudent.age || !this.newStudent.position || !this.newStudent.category) {
                    alert('Por favor, completa todos los campos.');
                    return;
                }

                // Intentar agregar el nuevo estudiante al backend
                axios.post('http://localhost:3000/api/students', this.newStudent)
                    .then(response => {
                        alert('Alumno ingresado exitosamente');
                        console.log(response.data); // Usar la respuesta
                        this.cards.push({ title: this.newStudent.name });
                        this.newStudent = {
                            name: '',
                            rut: '',
                            address: '',
                            weight: '',
                            height: '',
                            age: '',
                            football_position: '',
                            category_id: ''
                        };
                        this.closeAddStudentModal();
            })
            .catch(error => {
                console.error('Error al agregar el estudiante:', error);
                alert('Hubo un error al agregar el estudiante. Inténtalo más tarde.');
            });
                    }
                    ,

        openAddUserModal() {
            this.isAddUserModalVisible = true;
            this.isSidebarVisible = false; // Ocultar la barra lateral al abrir el modal
        },

        closeAddUserModal() {
            this.isAddUserModalVisible = false;
        },

        openAddStaffModal() {
            this.isAddStaffModalVisible = true;
            this.isSidebarVisible = false; // Ocultar la barra lateral al abrir el modal
        },

        closeAddStaffModal() {
            this.isAddStaffModalVisible = false;
        },

        logout() {
            alert('Sesión cerrada'); // Implementar el cierre de sesión aquí
        },

        addNewUser() {
            alert('Usuario agregado');
            this.closeAddUserModal();
        },

        addNewStaff() {
            alert('Personal agregado');
            this.closeAddStaffModal();
        },

        goToComponent(cardTitle) {
            let routeName = '';

            switch (cardTitle) {
                case 'Alumnos inscritos':
                    routeName = 'SubscribedKids'; // Nombre de la ruta
                    break;
                case 'Solicitudes pendientes':
                    routeName = 'ContactPetitions'; // Nombre de la ruta
                    break;
                case 'Staff Academia':
                    routeName = 'StaffAcademy'; // Nombre de la ruta
                    break;
                default:
                    console.error('Ruta no definida');
                    return;
            }

            this.$router.push({ name: routeName }); // Redirige usando el nombre de la ruta
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
    background-color: white;
    display: none;
    padding: 10px;
    border-radius: 10px;
    width: 80%;
    max-width: 450px;
    color: #333;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 140;
    font-family: 'Bebas Neue', sans-serif;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.modal.modal-visible {
    display: block;
    z-index: 200;
}

.modal-active {
    pointer-events: auto;
    opacity: 1;
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
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Bebas Neue', sans-serif;
    width: 100%;
}

.add-button:hover {
    opacity: 0.8;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    margin-bottom: 5px;
    display: block;
    color: #ff007f;
    font-family: 'Bebas Neue', sans-serif;
}

.modal input,
.modal select {
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ff007f;
    background-color: black;
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    text-align: center;
}

.modal h3 {
    font-family: 'Bebas Neue', sans-serif;
}

.sidebar {
    width: 250px;
    background-color: #333;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: calc(100% - 50px);
    position: absolute;
    top: 5px;
    bottom: 1px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 120;
    border-radius: 50px;
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
    padding: 120px 30px 30px;
    text-align: center;
    overflow-y: auto;
}

.card-disabled {
    pointer-events: none;
    opacity: 0.5;
}

.navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    z-index: 130;
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

/* Configuración para dispositivos pequeños */
@media (max-width: 375px) and (max-height: 667px),
(max-width: 360px) and (max-height: 740px),
(max-width: 540px) and (max-height: 720px),
(max-width: 1024px) and (max-height: 600px) {
    .modal {
        height: 550px;
        overflow: hidden;
        padding: 5px; /* Reducir el padding general del modal */
    }

    .modal-extra {
        height: 420px; /* Height máximo para el modal extra */
        overflow-y: auto; /* Permitir scroll si es necesario */
    }

    .modal h3 {
        font-size: 1.1em; /* Reducir el tamaño del título */
        margin-bottom: 8px; /* Reducir el espacio inferior del título */
    }

    .modal input,
    .modal select,
    .add-button {
        font-size: 0.8em; /* Tamaño de fuente más pequeño para los inputs y botón */
        padding: 6px; /* Reducir el padding de los inputs y botones */
    }

    .input-group {
        margin-bottom: 4px; /* Reducir el margen entre grupos de inputs */
    }

    .input-group label {
        font-size: 0.8em; /* Reducir el tamaño de la fuente de las etiquetas */
        margin-bottom: 3px; /* Reducir el margen entre la etiqueta y el input */
    }

    .add-button {
        font-size: 0.8em; /* Reducir el tamaño del texto del botón */
        padding: 6px; /* Reducir el padding del botón */
        margin-top: 15px; /* Separar el botón del combobox */
    }

    /* Ocultar logo y título en dispositivos pequeños */
    .login-logo,
    .dashboard-title {
        display: none;
    }
}

/* Ocultar logo y título cuando el ancho y la altura son inferiores a 1024 */
@media (max-width: 1024px) and (max-height: 1024px) {
    .login-logo,
    .dashboard-title {
        display: none;
    }
}
</style>





