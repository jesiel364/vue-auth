<template>
<h1 class="pt-3 text-center">
      Criar conta
</h1>
<div class="mx-3">
  <form @submit.prevent="submit">
  

    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="E-mail"
    ></v-text-field>
    
       <v-text-field
      v-model="pwd.value.value"
      :error-messages="pwd.errorMessage.value"
      label="Senha"
    ></v-text-field>


 

    <v-btn
      class="me-4"
      type="submit"
    >
      Criar conta
    </v-btn>

    <v-btn @click="handleReset">
      Limpar
    </v-btn>
  </form>
  
  </div>
</template>
  
<script>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
  import { app } from "../firebase";

  export default {
    setup () {
      const { handleSubmit, handleReset } = useForm({
        validationSchema: {
         
          email (value) {
            if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Insira um e-mail válido.'
          },
          pwd (value) {
          	if (value?.length > 8 && /[0-9-]+/.test(value)) return true
          	return "Insira uma senha"
          }
        },
      })
      
      const email = useField('email')
      const pwd = useField('pwd')
      const auth = getAuth(app)

      const submit = handleSubmit(values => {
      	
        alert(JSON.stringify(values, null, 2))
        createUserWithEmailAndPassword(auth,  values.email, values.pwd)
        .then((data) => {
        	alert("Usuário registrado com sucessi")
        	console.log("success")
        	
        })
        .catch((error) => {
        	
        	alert(error.message)
        	console.log("erro")
        })
      })

      return { email, pwd, submit, handleReset }
    },
  }
</script>

<style>
</style>