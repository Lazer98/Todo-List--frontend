<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>To-Do List</v-toolbar-title>
      <v-spacer></v-spacer>
      <p class="mr-3" v-if="hasToken" >Hello {{ userResponse.name }}!</p>
      <v-btn class="mr-3" to="/">Home</v-btn>
      <v-btn v-if="hasToken"  class="mr-3" to="/mytasks">My tasks</v-btn>
      <v-btn v-if="hasToken"  class="mr-3" to="/addtask">Add a task</v-btn>
      <v-btn v-if="!hasToken" class="mr-3" to="/registration">Registration</v-btn>
      <svg-icon v-if="!hasToken" @click="this.showPopup = !this.showPopup" class="mr-7" type="mdi"
        :path="pathLogin">Login</svg-icon>

      <v-dialog v-model="showPopup" max-width="500">
        <v-card>
          <v-card-title>
            Login
          </v-card-title>
          <v-card-text>
            Not registrated yet?
            <v-btn @click="showPopup = false" class="mr-3" to="/registration">Registration</v-btn>

            <v-form ref="form" v-model="valid">
              <v-text-field v-model="user.email" label="Email" type="email" required></v-text-field>
              <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
              <v-btn color="primary" @click="login()" :disabled="!valid">Login</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="showPopup = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <svg-icon v-if=getLoginToken @click="logout" to="/registration"  class="mr-7" type="mdi" :path="pathLogout">Logout</svg-icon>

    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mdiLogin } from '@mdi/js';
import { mdiLogout  } from '@mdi/js';
import axios from "axios";

export default {
  name: 'App',
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    userResponse: {
      email: '',
      password: '',
      name: '',
      id:''
    },
    valid: true,
    pathLogin: mdiLogin,
    pathLogout:mdiLogout ,
    showPopup: false

  }),
  components: {
    SvgIcon
  },
  methods: {
    ...mapActions(['updateLoginToken']),
    checkHasToken(){
      if(this.getLoginToken){
        this.hideHasToken;
      }else{
        this.showHasToken;
      }
    },
    showHasToken(){},
    hideHasToken(){},
    async login() {
      try {
        const response = await fetch('http://localhost:8085/users/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.user.email,
            password: this.user.password
          })
        });

        if (response.ok) {
          const result = await response.json();
          const userId = result;
          // Process the user ID or perform additional actions
          console.log('Login successful! User ID:', userId);
          this.updateLoginToken(userId);

          axios.get("http://localhost:8085/users/" + userId).then(result => {
            console.log(result.data);
            this.userResponse = result.data;
            console.log(this.userResponse);
            this.showPopup=false;
          },
           error => {
            console.error(error);
          });

        } else {
          console.error('Login failed:', response.status);
          // Handle the failed login scenario
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
        // Handle any network or other errors
      }
    },

    logout() {
      console.log("now logging out...");
      this.updateLoginToken(null);
    },
  },
  computed: {
    ...mapGetters(["getLoginToken"]),
      // getLoginToken(){
      //   return !!this.getLoginToken;
      // }
      hasToken(){
        return this.getLoginToken;
      }
  },
  watch: {
    "getLoginToken"() {
      this.checkHasToken();
    },
    userResponse(newValue, oldValue) {
      console.log(`'name' changed from '${oldValue}' to '${newValue}'`);

    },
    


  }

};
</script>
