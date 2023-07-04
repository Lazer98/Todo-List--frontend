<template>
  <v-container>
    <v-form class="mt-8">
      <v-text-field label="Name" v-model="task.taskName" required></v-text-field>
      <v-text-field label="Deadline" v-model="task.taskDateUntil" required></v-text-field>
      <svg-icon type="mdi" :path="pathExclamationThick" @click="taskImportantToggle(this.task)"></svg-icon>
      <v-btn color="primary"  @click="postTask(this.task)">Submit</v-btn>
      <!-- :disabled="!valid" -->
    </v-form>

  </v-container>
</template>
  
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiExclamationThick } from '@mdi/js';
import { mdiExclamation } from '@mdi/js';
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      pathExclamationThick: mdiExclamationThick,
      pathExclamationThin: mdiExclamation,
      editId: "",
      task: {
        taskImportant: false,
        taskDateUntil: "",
        taskName: ""
      },
     
    };
  },
  components: {
    SvgIcon
  },
  mounted() {
   
  },
  methods: {
    taskImportantToggle(task){
      task.taskImportant = !task.taskImportant;
      console.log(task.taskImportant);
    },
    postTask(task) {
      axios.post("http://localhost:8085/tasks/"+this.getLoginToken,

      {
          "taskImportant": task.taskImportant,
          "taskDateUntil": task.taskDateUntil,
          "taskName": task.taskName
        }

      ).then(response => {
        console.log(response);
      });

      this.task.taskDateUntil = "";
      this.task.taskImportant = "";
      this.task.taskName = "";
    },
  },
  computed: {
    ...mapGetters(["getLoginToken"]),
  },

}
</script>
  
<style>
/* Add any custom styles here */
</style>
  