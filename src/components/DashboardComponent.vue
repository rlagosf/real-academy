<template>
    <div class="dashboard-container">
        <!-- Modificación en la condición de la sidebar -->
        <div v-if="showSidebar && userRol !== 1" class="sidebar" :class="{ 'sidebar-visible': isSidebarVisible }">
            <button class="close-sidebar" @click="toggleSidebar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" fill="none" stroke="#ff007f"
                    stroke-width="2">
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
                <button class="sidebar-toggle"
                    v-if="!isAddStudentModalVisible && !isAddUserModalVisible && !isAddStaffModalVisible && userRol !== 1"
                    @click="toggleSidebar">
                    ☰
                </button>
                <img src="/assets/logos/logo-sin-fondo.png" alt="Logo" class="login-logo" />
                <h1 class="dashboard-title">Panel de control y gestión Real Academy FC</h1>
            </nav>

            <div class="cards-container">
                <div class="card" v-for="(card, index) in cards" :key="index"
                    :class="{ 'card-disabled': isAddStudentModalVisible || isAddUserModalVisible || isAddStaffModalVisible }"
                    @click="goToComponent(card.title)">
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
                    <input id="student-rut" v-model="newStudent.rut" placeholder="RUT" type="text" maxlength="9"
                        @input="validateRutInput('student')" />
                </div>

                <div class="input-group">
                    <label for="student-address">Dirección:</label>
                    <input id="student-address" v-model="newStudent.address" placeholder="Dirección" />
                </div>

                <div class="input-group">
                    <label for="student-weight">Peso (kg):</label>
                    <input id="student-weight" v-model="newStudent.weight" placeholder="Peso (kg)" type="number"
                        maxlength="3" @input="validateWeightAndHeight('weight')" class="no-spin" />
                </div>

                <div class="input-group">
                    <label for="student-height">Estatura (cm):</label>
                    <input id="student-height" v-model="newStudent.height" placeholder="Estatura (cm)" type="number"
                        maxlength="3" @input="validateWeightAndHeight('height')" class="no-spin" />
                </div>

                <div class="input-group">
                    <label for="student-age">Edad:</label>
                    <input id="student-age" v-model="newStudent.age" placeholder="Edad" type="number" maxlength="2"
                        @input="validateAge()" class="no-spin" />
                </div>

                <div class="input-group">
                    <label for="student-position">Posición de Fútbol:</label>
                    <select id="student-position" v-model="newStudent.football_position" class="full-width">
                        <option disabled value="">Selecciona una posición</option>
                        <option v-for="position in footballPositions" :key="position.id" :value="position.id">
                            {{ position.position }}
                        </option>
                    </select>
                </div>

                <div class="input-group">
                    <label for="student-category">Categoría:</label>
                    <select id="student-category" v-model="newStudent.category_id" class="full-width">
                        <option disabled value="">Selecciona una categoría</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.category_name }}
                        </option>
                    </select>
                </div>

                <button @click="addNewStudent" class="add-button">Agregar</button>
            </div>

            <!-- Modal para agregar usuario -->
            <div v-if="isAddUserModalVisible" class="modal modal-visible modal-active modal-extra">
                <button class="close-modal" @click="closeAddUserModal">✖</button>
                <h3>Agregar Usuario</h3>

                <div class="input-group">
                    <label for="user-name">Nombre:</label>
                    <input id="user-name" v-model="newUser.name" placeholder="Nombre" maxlength="50" />
                </div>

                <div class="input-group">
                    <label for="user-username">Nombre de usuario:</label>
                    <input id="user-username" v-model="newUser.username" placeholder="Nombre de usuario"
                        maxlength="12" />
                </div>

                <div class="input-group">
                    <label for="user-email">Correo electrónico:</label>
                    <input id="user-email" v-model="newUser.email" placeholder="Correo electrónico" type="email"
                        required />
                </div>

                <div class="input-group">
                    <label for="user-role">Rol de usuario:</label>
                    <select id="user-role" v-model="newUser.rol_id" class="full-width">
                        <option disabled value="">Selecciona un rol</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.name }}
                        </option>
                    </select>
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
                    <input id="staff-rut" v-model="newStaff.rut" placeholder="RUT" type="text" maxlength="9"
                        @input="validateRutInput('staff')" />
                </div>

                <div class="input-group">
                    <label for="staff-address">Dirección:</label>
                    <input id="staff-address" v-model="newStaff.address" placeholder="Dirección" />
                </div>

                <div class="input-group">
                    <label for="staff-phone">Teléfono:</label>
                    <input id="staff-phone" v-model="newStaff.phone" placeholder="Teléfono" type="tel" required
                        pattern="[0-9]*" maxlength="9" @input="validatePhone" ref="formInputs" />
                </div>

                <div class="input-group">
                    <label for="staff-email">Email:</label>
                    <input id="staff-email" v-model="newStaff.email" placeholder="Email" />
                </div>

                <div class="input-group">
                    <label for="staff-occupation">Ocupación:</label>
                    <select id="staff-occupation" v-model="newStaff.occupation">
                        <option disabled value="">Seleccione una ocupación</option>
                        <option v-for="profession in professions" :key="profession.id" :value="profession.id">
                            {{ profession.name }}
                        </option>
                    </select>
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
import bcrypt from 'bcryptjs';
import { validateRut } from '@fdograph/rut-utilities';


export default {
    name: 'DashboardComponent',
    data() {
        return {
            userRol: null,
            inactivityTimeout: null,
            inactivityTimeLimit: 5 * 60 * 1000, // 5 minutos en milisegundos
            isSidebarVisible: false,
            isAddStudentModalVisible: false,
            isAddUserModalVisible: false,
            isAddStaffModalVisible: false,
            isSuccessVisible: false,      // Control de visibilidad del SuccessModal
            successMessage: '',           // Mensaje de éxito dinámico
            newStudent: {
                name: '',
                rut: '',
                address: '',
                weight: '',
                height: '',
                age: '',
                football_position: '',
                category_id: ''
            },
            newUser: {
                name: '',
                username: '',
                password: '',
                rol_id: ''
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
            ],
            footballPositions: [], // Para almacenar las posiciones de fútbol
            categories: [], // Para almacenar las categorías
            roles: [], // Para almacenar los roles extraídos del backend
            professions: [], // Aquí se almacenarán las ocupaciones desde el servidor
            errors: {} // Para almacenar errores de validación
        };
    },
    computed: {
        isAnyModalVisible() {
            return this.isAddStudentModalVisible || this.isAddUserModalVisible || this.isAddStaffModalVisible;
        },
        showSidebar() {
            return this.userRol !== 1;
        }
    },
    created() {
        // Obtener el rol del usuario desde localStorage
        this.userRol = parseInt(localStorage.getItem('user_rol'));
    },
    mounted() {
        this.resetInactivityTimeout();
        this.fetchFootballPositions();
        this.fetchCategories();
        this.fetchRoles(); // Cargar roles cuando se monta el componente
        this.fetchProfessions();
    },

    beforeUnmount() {
        window.removeEventListener('mousemove', this.resetInactivityTimeout);
        window.removeEventListener('keydown', this.resetInactivityTimeout);
        window.removeEventListener('click', this.resetInactivityTimeout);
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        openAddStudentModal() {
            this.isAddStudentModalVisible = true;
            this.isSidebarVisible = false; // Ocultar la barra lateral al abrir el modal
            this.resetStudentForm(); // Reiniciar el formulario al abrir el modal
        },
        closeAddStudentModal() {
            this.isAddStudentModalVisible = false;
            this.isSidebarVisible = true;  // Restaurar la barra lateral si es necesario
        },
        resetStudentForm() {
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
            this.errors = {};
        },
        resetInactivityTimeout() {
            // Limpiar cualquier timeout previo
            clearTimeout(this.inactivityTimeout);

            // Configurar un nuevo timeout
            this.inactivityTimeout = setTimeout(() => {
                this.logout(); // Llamar al método de logout si no hay actividad
            }, this.inactivityTimeLimit);
        },
        async fetchFootballPositions() {
            try {
                const response = await axios.get('http://localhost:3000/api/data/football-positions');
                this.footballPositions = response.data;
                //console.log('Posiciones de fútbol:', this.footballPositions);
            } catch (error) {
                console.error('Error al obtener las posiciones de fútbol:', error);
            }
        },
        async fetchCategories() {
            try {
                const response = await axios.get('http://localhost:3000/api/data/categories');
                this.categories = response.data;
                //console.log('Categorías:', this.categories);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        },
        async fetchRoles() {
            try {
                const response = await axios.get('http://localhost:3000/api/data/roles');
                this.roles = response.data;
                //console.log('Roles de usuarios:', this.roles);
            } catch (error) {
                console.error('Error al obtener los roles:', error);
            }
        },
        async fetchProfessions() {
            try {
                const response = await axios.get('http://localhost:3000/api/data/professions');
                this.professions = response.data; // Almacena las ocupaciones
            } catch (error) {
                console.error('Error al obtener las ocupaciones:', error);
                alert('No se pudo cargar la lista de ocupaciones.');
            }
        },
        validateRutInput(type) {
            // Según el tipo, actualizamos el campo de RUT correspondiente
            const rut = type === 'staff' ? this.newStaff.rut : this.newStudent.rut;

            // Eliminar caracteres no numéricos ni la letra K, solo aceptar dígitos y la letra K
            const cleanedRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();

            // Actualizamos el campo con el RUT limpio
            if (type === 'staff') {
                this.newStaff.rut = cleanedRut;
            } else {
                this.newStudent.rut = cleanedRut;
            }

            // Verifica si el RUT es válido y tiene una longitud correcta (9 caracteres, incluyendo el dígito verificador)
            if (cleanedRut.length === 9) {
                const isValid = validateRut(cleanedRut); // Usamos la librería para validar el RUT
                if (!isValid) {
                    console.error('RUT inválido');
                    // Aquí podrías mostrar un mensaje al usuario si el RUT no es válido
                    alert('El RUT ingresado no es válido.');
                }
            }
        }
        ,
        validateWeightAndHeight(field) {
            // Asegurarse de que el valor sea una cadena antes de aplicar .replace
            let value = String(this.newStudent[field]);

            // Limita la longitud del número a 3 dígitos (peso y altura)
            if (value.length > 3) {
                value = value.slice(0, 3);
            }

            // Asegúrate de que solo contenga números (sin caracteres no numéricos)
            value = value.replace(/[^0-9]/g, '');

            // Asigna el valor corregido al campo
            this.newStudent[field] = value;
        },
        validateAge(field) {
            // Asegúrate de que el valor sea una cadena antes de aplicar .replace
            let value = String(this.newStudent[field]);

            // Limita la longitud del número a 2 dígitos (edad)
            if (value.length > 2) {
                value = value.slice(0, 2);
            }

            // Asegúrate de que solo contenga números (sin caracteres no numéricos)
            value = value.replace(/[^0-9]/g, '');

            // Asigna el valor corregido al campo
            this.newStudent[field] = value;
        },
        validatePhone() {
            // Asegúrate de que solo se ingresen números y que no exceda 9 dígitos
            this.newStaff.phone = this.newStaff.phone.replace(/[^0-9]/g, '').slice(0, 9);
        },
        generatePassword() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let password = '';
            for (let i = 0; i < 8; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        },
        redirectToDashboard() {
            this.$router.push({ name: 'Dashboard' }); // Asumiendo que tu ruta para el dashboard se llama 'dashboard'
            this.isSuccessVisible = false; // Ocultamos el modal después de hacer clic
        },
        addNewStaff() {
            // Verifica si todos los campos son válidos
            if (!this.newStaff.name || !this.newStaff.rut || !this.newStaff.address ||
                !this.newStaff.phone || !this.newStaff.email || !this.newStaff.occupation) {
                alert('Todos los campos son obligatorios.');
                return;
            }

            // Verificar si el RUT es válido
            if (!this.newStaff.rut || !validateRut(this.newStaff.rut)) {
                alert('El RUT ingresado no es válido.');
                return;
            }

            // Crear el objeto que se enviará al backend
            const staffData = {
                name: this.newStaff.name,
                rut: this.newStaff.rut,
                address: this.newStaff.address,
                phone: this.newStaff.phone,
                email: this.newStaff.email,
                occupation: this.newStaff.occupation
            };

            // Aquí harías la llamada a la API para agregar el personal
            axios.post('http://localhost:3000/api/staff', staffData)
                .then(response => {
                    // Asumiendo que la respuesta es exitosa
                    console.log('Personal agregado correctamente:', response.data);
                    console.log(staffData);
                    this.closeAddStaffModal(); // Cierra el modal al agregar el personal
                })
                .catch(error => {
                    // Si ocurre un error con la solicitud
                    console.error('Error al agregar personal:', error);

                    // Puedes agregar un mensaje de error para mostrar al usuario
                    alert('Hubo un problema al agregar el personal. Intenta de nuevo.');
                });
        }


        ,
        addNewStudent() {
            // Verifica si todos los campos son válidos
            if (!this.newStudent.name || !this.newStudent.rut || !this.newStudent.address ||
                !this.newStudent.weight || !this.newStudent.height ||
                !this.newStudent.age || !this.newStudent.football_position ||
                !this.newStudent.category_id) {
                alert('Todos los campos son obligatorios.');
                return;
            }

            // Verificar si el RUT es válido
            if (!this.newStudent.rut || !validateRut(this.newStudent.rut)) {
                alert('El RUT ingresado no es válido.');
                return;
            }

            // Crear el objeto que se enviará al backend
            const studentData = {
                name: this.newStudent.name,
                rut: this.newStudent.rut,
                address: this.newStudent.address,
                weight: this.newStudent.weight,
                height: this.newStudent.height,
                age: this.newStudent.age,
                football_position: this.newStudent.football_position,
                category_id: this.newStudent.category_id
            };

            // Aquí harías la llamada a la API para agregar el estudiante
            axios.post('http://localhost:3000/api/student', studentData)
                .then(response => {
                    // Asumiendo que la respuesta es exitosa
                    console.log('Estudiante agregado correctamente:', response.data);
                    //console.log(studentData);
                    this.closeAddStudentModal(); // Cierra el modal al agregar el estudiante
                })
                .catch(error => {
                    // Si ocurre un error con la solicitud
                    console.error('Error al agregar estudiante:', error);

                    // Puedes agregar un mensaje de error para mostrar al usuario
                    alert('Hubo un problema al agregar el estudiante. Intenta de nuevo.');
                });
        },
        openAddUserModal() {
            this.isAddUserModalVisible = true;
            this.isSidebarVisible = false; // Ocultar la barra lateral al abrir el modal
            this.resetUserForm();
        },
        closeAddUserModal() {
            this.isAddUserModalVisible = false;
            this.isSuccessVisible = false;

        },
        resetUserForm() {
            this.newUser = {
                name: '',
                username: '',
                password: '',
                rol_id: ''
            };
        },
        addNewUser() {
            // Validar si los campos están completos
            if (!this.newUser.name || !this.newUser.username || !this.newUser.email || !this.newUser.rol_id) {
                alert('Todos los campos son obligatorios.');
                return;
            }

            // Generar la contraseña automáticamente
            const generatedPassword = this.generatePassword();

            // Encriptar la contraseña generada
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            // Crear el objeto para enviar
            const userData = {
                name: this.newUser.name,
                username: this.newUser.username,
                email: this.newUser.email,
                password: hashedPassword,  // Contraseña encriptada
                rol_id: this.newUser.rol_id
            };

            // Llamar a la API para agregar el usuario
            axios.post('http://localhost:3000/api/user', userData)
                .then(response => {
                    console.log('Usuario agregado:', response.data);

                    // Asignar el mensaje de éxito con el correo
                    this.successMessage = `CORREO ENVIADO SATISFACTORIAMENTE A ${this.newUser.email} FAVOR REVISE SU BANDEJA DE ENTRADA`;

                    // Mostrar el modal de éxito
                    this.isSuccessVisible = true;

                    // Cerrar el modal de agregar usuario y resetear los datos
                    this.isAddUserModalVisible = false;
                })
                .catch(error => {
                    console.error('Error al agregar usuario:', error);
                    alert('Hubo un error al agregar el usuario. Inténtalo de nuevo.');
                });
        }
        ,
        showSuccessMessage(email) {
            // Lógica para mostrar la ventana de éxito con el mensaje personalizado
            this.isSuccessVisible = true;
            this.successMessage = `USUARIO CREADO SATISFACTORIAMENTE, LA CONTRASEÑA HA SIDO ENVIADA AL CORREO ${email}. FAVOR REVISAR SU BANDEJA DE ENTRADA.`;
        },
        openAddStaffModal() {
            this.isAddStaffModalVisible = true;
            this.isSidebarVisible = false; // Ocultar la barra lateral al abrir el modal
            this.resetStaffForm();
        },
        closeAddStaffModal() {
            this.isAddStaffModalVisible = false;
        },
        resetStaffForm() {
            this.newStaff = {
                name: '',
                rut: '',
                address: '',
                phone: '',
                email: '',
                occupation: ''
            };
            this.errors = {};
        },

        logout() {
            // Eliminar el rol y el usuario del localStorage
            localStorage.removeItem('user_rol');
            localStorage.removeItem('username');

            // Redirigir al HomeComponent
            this.$router.push({ name: 'Home' });
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
                    console.error('Título de tarjeta desconocido:', cardTitle);
            }

            if (routeName) {
                this.$router.push({ name: routeName });
            }
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
    opacity: 0;
    animation: none; /* No animation by default */
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Agregamos el efecto de entrada con "latigazo" */
.modal.modal-visible {
    display: block;
    opacity: 1;
    animation: elastic 0.5s ease-out forwards;
    z-index: 200;
}

@keyframes elastic {
    0% {
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
        opacity: 0;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
        opacity: 0.8;
    }
    100% {
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
        opacity: 1;
    }
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

.success-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.modal-content {
    background-color: #FF007F;
    /* Color de fondo del modal */
    border-radius: 10px;
    padding: 20px;
    width: 350px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    /* Fuente para el contenido del modal */
}

.success-logo {
    width: 80px;
    /* Tamaño del logo */
    margin-bottom: 20px;
    /* Separación del logo respecto al mensaje */
}

.success-message {
    font-size: 18px;
    /* Tamaño del mensaje de éxito */
    margin-bottom: 20px;
    /* Espaciado entre el mensaje y el botón */
}

.btn-accept {
    padding: 10px 20px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Bebas Neue', sans-serif;
    transition: background-color 0.3s;
}

.btn-accept:hover {
    background-color: #333;
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

.generate-password {
    background-color: #ff007f;
    color: white;
    padding: 8px 12px;
    font-family: 'Bebas Neue', sans-serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
}

.generate-password:hover {
    background-color: #e6006f;
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

@media (max-width: 375px) and (max-height: 667px),
(max-width: 360px) and (max-height: 740px),
(max-width: 540px) and (max-height: 720px),
(max-width: 1024px) and (max-height: 600px) {
    .modal {
        height: 550px;
        overflow: hidden;
        padding: 5px;
    }

    .modal-extra {
        height: 420px;
        overflow-y: auto;
    }

    .modal h3 {
        font-size: 1.1em;
        margin-bottom: 8px;
    }

    .modal input,
    .modal select,
    .add-button {
        font-size: 0.8em;
        padding: 6px;
    }

    .input-group {
        margin-bottom: 4px;
    }

    .input-group label {
        font-size: 0.8em;
        margin-bottom: 3px;
    }

    .add-button {
        font-size: 0.8em;
        padding: 6px;
        margin-top: 15px;
    }

    .login-logo,
    .dashboard-title {
        display: none;
    }
}

@media (max-width: 1024px) and (max-height: 1024px) {
    .login-logo,
    .dashboard-title {
        display: none;
    }
}

input[type="number"].no-spin::-webkit-outer-spin-button,
input[type="number"].no-spin::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"].no-spin {
    -moz-appearance: textfield;
    appearance: textfield;
}

input[type="number"] {
    width: 100%;
    box-sizing: border-box;
}
</style>

