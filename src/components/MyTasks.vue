<template class="custom-container">
  <v-container >
    <!-- <div>
      <v-row class="mt-4 mx-4"> 
      <v-text-field cols="2" class="mx-4 my-4" type="text" v-model="task.taskName" label="Name" />
      <v-text-field cols="2" class="mx-4 my-4" type="text" v-model="task.taskDateUntil" label="Deadline" />
      <svg-icon class="my-5" type="mdi" :path="pathExclamationThick" @click="taskImportantToggle(this.task)"></svg-icon>
      <button class="add-btn my-5" @click="postTask(this.task)">ADD</button>
    </v-row>
    </div> -->

    <v-container fluid>
      <v-row class="mt-4">
        <v-col cols="12" md="8" offset-md="2">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-for="task in tasks" :key="task.id" class="my-card mt-4 " :elevation="isHovering ? 24 : 6"
              v-bind="props" outlined>
              <v-card-text>
                <v-row>
                  <svg-icon type="mdi" :path="task.taskDone ? pathCheck : pathUncheck" @click="undoTask(task)">
                  </svg-icon> 
                  
                  <v-text-field label="name" v-if="task.id === this.editId" v-model="task.taskName"></v-text-field>
                  <p class="mr-4 ml-4 font-weight-medium" v-if="(task.id !== this.editId)">{{ task.taskName }}</p>

                  <p class="mr-4 font-weight-medium">{{ task.taskDateCreated }}</p>

                  <v-text-field label="deadline" v-if="task.id === this.editId" v-model="task.taskDateUntil">
                  </v-text-field>
                  <p class="mr-16 font-weight-medium" v-if="task.id !== this.editId">{{ task.taskDateUntil }}</p>
                  <v-spacer></v-spacer>
                  <div class="mr-4 " v-if="task.id !== this.editId">
                    <svg-icon type="mdi" :path="task.taskImportant ? pathExclamationThick : pathExclamationThin">
                    </svg-icon>
                  </div>

                  <div class="mr-4" v-if="task.id === this.editId"><svg-icon type="mdi"
                      :path="task.taskImportant ? pathExclamationThick : pathExclamationThin"
                      @click="taskImportantToggle(task)">
                    </svg-icon> </div>

                  <svg-icon class="mr-4" type="mdi" :path="pathDelete" @click="deleteTask(task.id)">
                  </svg-icon>

                  <button class="edit-btn ml-4 " @click="editTask(task)">Edit</button>

                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>



  </v-container>
</template>


  






<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiExclamationThick } from '@mdi/js';
import { mdiExclamation } from '@mdi/js';
import { mdiShieldCheck } from '@mdi/js';
import { mdiShieldCheckOutline } from '@mdi/js';
import { mdiDelete } from '@mdi/js';
import { mapGetters } from "vuex";
import axios from "axios";


export default {
  data() {
    return {
      pathExclamationThick: mdiExclamationThick,
      pathExclamationThin: mdiExclamation,
      pathCheck: mdiShieldCheck ,
      pathUncheck: mdiShieldCheckOutline ,
      editId: "",
      pathDelete: mdiDelete,
      task: {
        taskImportant: false,
        taskDateUntil: "",
        taskName: "",
        id: ""
      },
      tasks: [],

    };
  },
  components: {
    SvgIcon
  },
  computed: {
    currentPathImportant() {
      return this.isThick ? mdiExclamationThick : mdiExclamation;
    },
    currentPathCheck() {
      return this.pathCheckOutline ? mdiExclamationThick : mdiExclamation;
    },
    ...mapGetters(["getLoginToken"])
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    taskImportantToggle(task) {
      task.taskImportant = !task.taskImportant;
      console.log(task.taskImportant);
    },
    postTask(task) {
      axios.post("http://localhost:8085/tasks",

        {
          "taskImportant": task.taskImportant,
          "taskDateUntil": task.taskDateUntil,
          "taskName": task.taskName
        }
      )
      // ).then(response => {
      //   console.log(response);
      // });

      this.task.taskDateUntil = "";
      this.task.taskImportant = "";
      this.task.taskName = "";
      this.getTasks();
    },
    updateTask(task) {
      axios.put("http://localhost:8085/tasks/" + task.id+"/"+this.getLoginToken,
        {
          "taskImportant": task.taskImportant,
          "taskDateUntil": task.taskDateUntil,
          "taskName": task.taskName
        }
      )
    },
    undoTask(task) {
      task.taskDone = !task.taskDone;
      axios.put("http://localhost:8085/tasks/" + task.id+"/"+this.getLoginToken,
        {
          "taskImportant": task.taskImportant,
          "taskDateUntil": task.taskDateUntil,
          "taskName": task.taskName,
          "taskDone": task.taskDone
        }
      )
    },
    getTasks() {
      axios.get("http://localhost:8085/tasks/"+this.getLoginToken).then(result => {
        console.log(result.data);
        this.tasks = result.data;
      }, error => {
        console.error(error);
      });
    },
    // delete task
    deleteTask(index) {
      // this.tasks.splice(index, 1)
      axios.delete("http://localhost:8085/tasks/" + index +"/"+this.getLoginToken)
    },
    // edit task
    editTask(task) {
      if (!this.editId) {
        this.editId = task.id;
      }
      else {
        console.log(this.editId);
        this.updateTask(task);
        this.editId = "";
      }
    },
  },
  watch: {
    tasks() {

    },
  }


}



</script>
<style scoped>
body{
  background-color: lightgrey;
}


.my-card {
  width: 80%;
  margin-bottom: 20px;
}

.add-btn {
  border: none;
  width: 100px;
  height: 30px;
  padding: 2px;
  background-color: teal;
  color: white;
}



.edit-btn {
  border: none;
  background-color: #77b631;
  color: white;
}
</style>
   

   