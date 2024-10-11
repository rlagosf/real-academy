<template>
    <div class="staff-academy-container">
        <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
        <h1>Personal de la Academia</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>RUT</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Occupation</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="staff in staffMembers" :key="staff.rut">
                    <td>{{ staff.name }}</td>
                    <td>{{ staff.rut }}</td>
                    <td>{{ staff.address }}</td>
                    <td>{{ staff.phone }}</td>
                    <td>{{ staff.email }}</td>
                    <td>{{ staff.occupation }}</td>
                    <td>
                        <button @click="editStaff(staff)">
                            <i class="fas fa-pencil-alt"></i> <!-- Ícono de lápiz -->
                        </button>
                        <button @click="deleteStaff(staff.rut)">
                            <i class="fas fa-trash"></i> <!-- Ícono de basurero -->
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'StaffAcademy',
    data() {
        return {
            staffMembers: []
        };
    },
    created() {
        this.fetchStaffMembers();
    },
    methods: {
        async fetchStaffMembers() {
            try {
                const response = await axios.get('http://localhost:3000/api/staff');
                this.staffMembers = response.data.staffMembers;
            } catch (error) {
                console.error('Error al obtener los miembros del staff:', error);
            }
        },
        editStaff(staff) {
            alert(`Editando a: ${staff.name}`);
        },
        deleteStaff(rut) {
            const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar a ${rut}?`);
            if (confirmDelete) {
                this.staffMembers = this.staffMembers.filter(s => s.rut !== rut);
            }
        }
    }
};
</script>

<style scoped>
.staff-academy-container {
    background-color: white;
    padding: 20px;
    font-family: 'Bebas Neue', sans-serif;
}

.login-logo {
    width: 150px;
    margin-bottom: 20px;
}

h1 {
    color: #2c3e50;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 3px solid #ff007f; /* Borde grueso color #ff007f */
    border-radius: 30px; /* Esquinas redondeadas */
}

th,
td {
    border: 2px solid #ff007f; /* Línea divisoria gruesa */
    padding: 10px;
    text-align: left;
}

th {
    background-color: black;
    color: white;
}

button {
    background: none;
    border: none;
    cursor: pointer;
    color: #2c3e50;
}

button i {
    font-size: 20px;
}

button:hover {
    opacity: 0.7;
}
</style>
