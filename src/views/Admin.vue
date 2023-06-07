<script>
import { ref } from "vue";
import AdicionarServico from '@/components/AdicionarServico.vue'
import AutoComplete from '@/components/AutoComplete.vue'
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { useFirestore, useCollection  } from 'vuefire'

const db = getFirestore(app);
const list = useCollection(collection(db, 'servicos'))

// const res = []

// async function queryCollection(){

//   const collectionRef = collection(db, 'servicos')

//   const q = await query(collectionRef,
//     where('titulo', '==', 'SOCIAL')
//     // orderBy('valor', 'asc')
//     )

//   const servicos = await getDocs(q)
//   servicos.forEach(srv => {
//     console.log(srv.data())
//     res.push(srv.data())
//   })
// }

// queryCollection()


export default {
  components: {
    AdicionarServico,
    AutoComplete
  }

  ,
  data() {
    return {
      servicos: [],
      list: list,
      ordem: 'asc',
      res: [],
      pesquisa: ''
    };
  },

  created() {
    // this.getServicos()
    // this.consulta('MILITAR')
    this.orderList()
  },

  methods: {

  async consulta(){
    const collectionRef = collection(db, 'servicos')

  const q = await query(collectionRef,
    where('titulo', '==', this.pesquisa)
    // orderBy('valor', 'asc')
    )

  const servicos = await getDocs(q)
  servicos.forEach(srv => {
    console.log(srv.data())
    this.res = srv.data()
  })
},

  async orderList(){
    const collectionRef = collection(db, 'servicos')

  const q = await query(collectionRef,
    // where('titulo', '==', this.pesquisa)
    orderBy('valor', this.ordem)
    )

  const servicos = await getDocs(q)
  servicos.forEach(srv => {
    console.log(srv.data())
    this.res.push(srv.data())
  })
},

  async excluir(id){
  try {
   deleteDoc(doc(db, "servicos", id));
   // alert('excluido')
  } catch (error){
    alert(error)
  }
},



  },

};


</script>

<template>

  <div>
  <h1>Página de admin.</h1>
  <h2>Serviços</h2>
<v-select
  :v-model='ordem'
  label="Ordem"
  :items="['asc', 'desc']"
></v-select>


<div class="d-flex">
<!-- <v-text-field v-model='pesquisa' label='Pesquisar'></v-text-field> -->
<AutoComplete :titles='res' />
<v-btn @click='consulta()'><v-icon icon='mdi-magnify'></v-icon></v-btn>
<!-- <small>{{pesquisa}}</small> -->
</div>

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
      <tr v-if="res.length > 1" v-for="item in res
      " :key="item.id" >
        <td>{{ item.id }}</td>
        <td>{{ item.titulo }}</td>
        <td>R${{ item.valor }}</td>
        <td>{{ item.time }}</td>
        <td class="d-flex align-center">
          <v-btn
            class="mr-2"
            density="comfortable"
            icon="mdi-pencil"
            color="warning"
          ></v-btn>
          <v-btn @click="excluir(item.id)" density="comfortable" icon="mdi-delete" color="red"></v-btn>
        </td>
      </tr>
                  <tr v-else>
        <td>{{ res.id }}</td>
        <td>{{ res.titulo }}</td>
        <td>R${{ res.valor }}</td>
        <td>{{ res.time }}</td>
        <td class="d-flex align-center">
          <v-btn
            class="mr-2"
            density="comfortable"
            icon="mdi-pencil"
            color="warning"
          ></v-btn>
          <v-btn @click="excluir(item.id)" density="comfortable" icon="mdi-delete" color="red"></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>



  <AdicionarServico />


<!--   <ul>
    <li v-for="item in list" >
     <span>{{ item.id }} - {{item.titulo}} - {{item.valor}} - {{item.time}}</span>
    </li>
  </ul> -->
<small>{{res}}</small>
</div>
</template>
