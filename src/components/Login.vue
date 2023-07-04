<template>
  <v-container>
    <v-main>
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
        <v-text-field v-model="user.email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="primary" @click="loginUser(this.user)" :disabled="!valid">Login</v-btn>
      </v-form>
    </v-main>

  </v-container>
</template>
  
<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''

      },
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => /^[a-zA-Z]+$/.test(v) || 'Name must not contain numbers or special characters',
        v => (v && v.length >= 2) || 'Name must be at least 2 characters long',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        v => (v && v !== 'user@example.com') || 'E-mail must not be already in use',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be at least 8 characters long',
        v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
        v => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
        v => /[0-9]/.test(v) || 'Password must contain at least one number',
        v => (v && !v.includes(this.name) && !v.includes(this.email)) || 'Password must not contain name or email',
      ]
    }
  },
  methods: {
    loginUser() {
      console.log( this.user.email + this.user.password);
      axios.get("http://localhost:8085/users/{id}",

        {
          "name": user.name,
          "email": user.email,
          "password": user.password
        }

      ).then(response => {
        console.log(response);
      });

    },
  },
}
</script>
 
<style>
/* Add any custom styles here */
</style>
 
  