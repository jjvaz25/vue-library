<template>
  <div class="my-library">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Item successfully added to library!</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="deleteSnackbar" :timeout="4000" top color="success">
      <span>Item successfully deleted from library.</span>
      <v-btn text color="white" @click="deleteSnackbar = false">Close</v-btn>
    </v-snackbar>
    <div>
      <h1 class="my-5 mx-4 title grey--text text--darken-1">My Library</h1>
      <library-form @itemAdded="snackbar = true"/>
    </div>

    <v-container class="my-5">

      <v-row>
        <v-col class="text-center text-md-left">
          <v-btn text small color="primary" @click="sortBy('title')">
            <v-icon left >folder</v-icon>
            <span class="caption text-lowercase">By title</span>
          </v-btn>
          <v-btn text small color="primary" @click="sortBy('completed')">
            <v-icon left >done</v-icon>
            <span class="caption text-lowercase">By completion status </span>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>   
        <v-col 
          v-for="item in library" :key="item.id "
          cols="12" s="12" md="4"
          align="start"
        >
          <v-card 
            class="mx-auto"
            max-width="330"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div>
                  <div v-if="item.completed" class="overline mb-4">Completed</div>
                  <div v-else class="overline mb-4">Incomplete</div>
                </div>
                <v-list-item-title class="headline mb-1 text-wrap">{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.creator }}</v-list-item-subtitle>
                <v-list-item-subtitle v-show="item.rating">{{ item.rating }}/10</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey lighten-1"
              >
                <img v-if="item.category === 'Video Game'"
                  src='../assets/videogame.png'
                >
                <img v-else-if="item.category === 'Book'"
                  src='../assets/book.png'
                >
                <img v-else
                  src='../assets/icon.png'
                >
              </v-list-item-avatar>

            </v-list-item>

            <v-card-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on" 
                    @click="toggleCompletion(item, item.id)"
                    :class="item.completed ? 'success' : 'grey lighten-1 white--text'"
                  >
                    <v-icon>check</v-icon>
                  </v-btn>
                </template>
                <span v-show="item.completed">Mark item as incomplete</span>
                <span v-show="!item.completed">Mark item as completed</span>
              </v-tooltip>
              
              <v-spacer></v-spacer>
                <edit-form 
                  :itemInfo="{ title: item.title, creator: item.creator, category: item.category, rating: item.rating, id: item.id  }"
                />
              <v-btn 
                @click="deleteItem(item.id)"
                class="mx-2 error"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
// @ is an alias to /src
import Form from '../components/Form'
import EditForm from '../components/EditForm'
import db from '../fb'

export default {
  name: 'MyLibrary',
  components: {
    'library-form': Form,
    'edit-form': EditForm
  },
  data() {
    return {
      library: [],
      snackbar: false,
      deleteSnackbar: false
    }
  },
  methods: {
    sortBy(prop) {
      this.library.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    deleteItem(id) {
      db.collection('library').doc(id).delete()
      const index = this.library.findIndex(item => item.id === id )
      this.library.splice(index, 1)
      this.deleteSnackbar = true
    },
    toggleCompletion(item, id) {
      item.completed = !item.completed
      db.collection('library').doc(id).update({
        completed: item.completed
      })
    },
    updateDisplay(doc) {
      const index = this.library.findIndex(item => item.id === doc.id )
      this.library[index].title = doc.data().title
      this.library[index].creator = doc.data().creator
      this.library[index].category = doc.data().category
      this.library[index].rating = doc.data().rating
    },
  },
  created() {
    db.collection('library').orderBy('time').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          this.library.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        } else if (change.type === 'modified') {
          this.updateDisplay(change.doc)
        }
      })
    })
  }
}
</script>
