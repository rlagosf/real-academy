<template>
    <div class="subscribed-kids-container">
        <img src="/assets/logos/logo-en-negativo.png" alt="Logo" class="login-logo" />
        <h1>Alumnos Inscritos</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>RUT</th>
                    <th>Address</th>
                    <th>Weight</th>
                    <th>Height</th>
                    <th>Age</th>
                    <th>Football Position</th>
                    <th>Category ID</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="kid in kids" :key="kid.rut">
                    <td>{{ kid.name }}</td>
                    <td>{{ kid.rut }}</td>
                    <td>{{ kid.address }}</td>
                    <td>{{ kid.weight }}</td>
                    <td>{{ kid.height }}</td>
                    <td>{{ kid.age }}</td>
                    <td>{{ kid.football_position }}</td>
                    <td>{{ kid.category_id }}</td>
                    <td>
                        <button @click="editKid(kid)">
                            <i class="fas fa-pencil-alt"></i> <!-- Ícono de lápiz -->
                        </button>
                        <button @click="deleteKid(kid.rut)">
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
    name: 'SubscribedKids',
    data() {
        return {
            kids: []
        };
    },
    mounted() {
        this.fetchSubscribedKids();
    },
    methods: {
        async fetchSubscribedKids() {
            try {
                const response = await axios.get('http://localhost:3000/api/student');
                this.kids = response.data;
            } catch (error) {
                console.error('Error al obtener los alumnos inscritos:', error);
            }
        },
        deleteKid(rut) {
            const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar a ${rut}?`);
            if (confirmDelete) {
                axios.delete(`http://localhost:3000/api/student/${rut}`)
                    .then(() => {
                        this.kids = this.kids.filter(k => k.rut !== rut);
                    })
                    .catch(error => {
                        console.error('Error al eliminar el alumno:', error);
                    });
            }
        },
        editKid(kid) {
            alert(`Editando a: ${kid.name}`);
        },
    }
};
</script>

<style scoped>
.subscribed-kids-container {
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
