<script>
import { ref } from "vue";
import { getFirestore } from "firebase/firestore";
import app from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const db = getFirestore(app);
let servicos = [];

function excluir(){
	await deleteDoc(doc(db, "cities", "DC"));

}

export default {
  data() {
    return {
      servicos: servicos,
    };
  },

  mounted() {},

  methods: {},
};

const querySnapshot = await getDocs(collection(db, "servicos"));
querySnapshot.forEach((doc) => {
  servicos.push([doc.id, doc.data()]);
});
</script>

<template>
  <h1>Página de admin.</h1>
  <h2>Serviços</h2>

  <v-table>
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Titulo</th>
        <th class="text-left">Valor</th>
        <th class="text-left">Tempo</th>
        <th class="text-left">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in servicos" :key="id">
        <td>{{ item[0] }}</td>
        <td>{{ item[1].titulo }}</td>
        <td>R${{ item[1].valor }}</td>
        <td>{{ item[1].time }}min</td>
        <td class="d-flex align-center">
          <v-btn
            class="mr-2"
            density="comfortable"
            icon="mdi-pencil"
            color="warning"
          ></v-btn>
          <v-btn @click="excluir()" density="comfortable" icon="mdi-delete" color="red"></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
