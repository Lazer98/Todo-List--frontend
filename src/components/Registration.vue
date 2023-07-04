<template>
  <v-main>
    <v-form class="mt-8" cols="7" ref="form" v-model="valid">
      <v-text-field :rules="nameRules" v-model="user.name" label="Name" required></v-text-field>
      <v-text-field :rules="emailRules" v-model="user.email" label="Email" type="email" required></v-text-field>
      <v-text-field :rules="passwordRules" v-model="user.password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary" @click="postUser(this.user)" :disabled="!valid">Submit</v-btn>
    </v-form>
  </v-main>
</template>
 
<script>
import axios from "axios";
//import jwt from 'jsonwebtoken';
//import { enc } from 'crypto-js';
//import crypto from 'crypto-browserify';
import { mapMutations } from "vuex";


export default {
  name: 'RegistrationWord',
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
    ...mapMutations(["setUser", "setToken"]),
    postUser() {
      console.log(this.user.name + this.user.email + this.user.password);
      axios.post("http://localhost:8085/users",

        {
          "name": this.user.name,
          "email": this.user.email,
          "password": this.user.password
        }

      ).then(response => {
        console.log(response);
        this.$router.push('');

      });

       
    },
    // generateToken() {
    //   // Perform authentication and get the user's credentials
    //   const { email, password } = this;

    //   // Send the credentials to the server for authentication
    //   // On successful authentication, the server can generate a token

    //   // Assuming the server returns a token
    //   const secretKey = 'your-secret-key'; // Replace with your actual secret key
    //   const payload = { email,password }; // Include any additional data in the payload

    //   // Generate the token
    //   const token = jwt.sign(payload, secretKey);

    //   const tokenString = enc.Base64.stringify(enc.Utf8.parse(token));


    //   // Do something with the token, such as storing it in local storage or passing it to another component
    //   console.log(tokenString);
    //   this.setUser(this.name);
    //   this.setToken(token);
    // },
  },
}
</script>
 
<style>
/* Add any custom styles here */
</style>
 