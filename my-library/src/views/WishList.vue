<template>
  <div class="my-library">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Item was successfully added to your wish list!</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <div>
      <h1 class="my-5 mx-4 title grey--text text--darken-1">My Wish List</h1>
      <wishlist-form @wishItemAdded="snackbar = true"/>
    </div>

    <v-container class="my-5">
      <v-row>    
        <v-col 
          v-for="item in wishlist" :key="item.title "
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
                <v-list-item-title class="headline mb-1 text-wrap">{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.creator }}</v-list-item-subtitle>
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
              <v-btn :class="item.purchased ? 'success' : 'grey lighten-1 white--text'">
                <v-icon>check</v-icon>
              </v-btn>
              
              <v-spacer></v-spacer>
              <v-btn class="primary">
                <v-icon>edit</v-icon>
              </v-btn>
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
import db from '../fb'
import WishlistForm from '../components/WishlistForm'


export default {
  name: 'WishList',
  components: {
    'wishlist-form': WishlistForm
  },
  data() {
    return {
      wishlist: [
        // { title: "The Legend of Zelda: Link's Awakening", creator: 'Nintedo', category: 'Video Game', purchased: true },
        // { title: 'Surfing with Sartre: An Aquatic Inquiry Into a Life of Meaning', creator: 'Aaron James', category: 'Book', purchased: false },
        // { title: 'Final Fantasy VII Remake', creator: 'Square Enix', category: 'Video Game', purchased: false },
        // { title: 'The Mythical Man-Month', creator: 'Fred Brooks', category: 'Book', purchased: false },
        // { title: 'Untitled Album', creator: 'Kendrick Lamar', category: 'Other', purchased: false }
      ],
      snackbar: false,
    }
  },
  methods: {
    deleteItem(id) {
      db.collection('wishlist').doc(id).delete()
      const index = this.wishlist.findIndex(item => item.id === id )
      this.wishlist.splice(index, 1)
    },
  },

  created() {
    db.collection('wishlist').orderBy('createdAt').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          this.wishlist.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        } else if (change.type === 'modified') {
          console.log('something has changed.')
        }
      })
    })
  },

  //   submitSearch() {
  //     db.collection('library').where('title', '==', this.search).get().then((snapshot) => {
  //       snapshot.docs.forEach(doc => {
  //         console.log(doc.data())
  //       })
  //     })
  //   },
    // toggleCompletion(item, id) {
    // toggleCompletion(item) {
    //   item.purchased = !item.purchased
      // db.collection('library').doc(id).update({
      //   completed: item.completed
      // })
    // },
  //   updateDisplay(doc) {
  //     const index = this.library.findIndex(item => item.id === doc.id )
  //     this.library[index].title = doc.data().title
  //     this.library[index].creator = doc.data().creator
  //     this.library[index].category = doc.data().category
  //     this.library[index].rating = doc.data().rating
  //   }
  // },
  // created() {
  //   db.collection('library').orderBy('time').onSnapshot(res => {
  //     const changes = res.docChanges();
  //     changes.forEach(change => {
  //       if (change.type === 'added') {
  //         this.library.push({
  //           ...change.doc.data(),
  //           id: change.doc.id
  //         })
  //       } else if (change.type === 'modified') {
  //         this.updateDisplay(change.doc)
  //       }
  //     })
  //   })
}
</script>
