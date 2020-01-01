<template>
  <div class="my-wishlist">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Item was successfully added to your wish list!</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="deleteSnackbar" :timeout="4000" top color="success">
      <span>Item successfully deleted from wishlist.</span>
      <v-btn text color="white" @click="deleteSnackbar = false">Close</v-btn>
    </v-snackbar>
    <div>
      <h1 class="my-5 mx-4 title grey--text text--darken-1">My Wish List</h1>
      <wishlist-form @wishItemAdded="snackbar = true"/>
    </div>

    <v-container class="my-5">

      <v-row>
        <v-col class="text-center text-md-left">
        <v-btn text small color="primary" @click="sortBy('title')">
          <v-icon left >folder</v-icon>
          <span class="caption text-lowercase">By title</span>
        </v-btn>
        <v-btn cols="12" s="3" text small color="primary" @click="sortBy('purchased')">
          <v-icon left >library_add</v-icon>
          <span class="caption text-lowercase">By purchase status </span>
        </v-btn>
        </v-col>
      </v-row>

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
              <v-btn 
                @click="togglePurchased(item, item.id)"
                :class="item.purchased ? 'success' : 'grey lighten-1 white--text'">
                <v-icon>library_add</v-icon>
              </v-btn>
              
              <v-spacer></v-spacer>
              <edit-wishlist-form 
                :wishlistItemInfo="{ title: item.title, creator: item.creator, category: item.category, id: item.id }"
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
import db from '../fb'
import WishlistForm from '../components/WishlistForm'
import EditWishlistForm from '../components/EditWishlistForm'


export default {
  name: 'WishList',
  components: {
    'wishlist-form': WishlistForm,
    'edit-wishlist-form': EditWishlistForm
  },
  data() {
    return {
      wishlist: [],
      snackbar: false,
      deleteSnackbar: false
    }
  },
  methods: {
    sortBy(prop) {
      console.log('hey')
      this.wishlist.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    deleteItem(id) {
      db.collection('wishlist').doc(id).delete()
      const index = this.wishlist.findIndex(item => item.id === id )
      this.wishlist.splice(index, 1)
      this.deleteSnackbar = true
    },
    updateDisplay(doc) {
      const index = this.wishlist.findIndex(item => item.id === doc.id )
      this.wishlist[index].title = doc.data().title
      this.wishlist[index].creator = doc.data().creator
      this.wishlist[index].category = doc.data().category
    },
    togglePurchased(item, id) {
      item.purchased = !item.purchased
      db.collection('wishlist').doc(id).update({
        purchased: item.purchased
      })
    }
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
          this.updateDisplay(change.doc)
        }
      })
    })
  },
}
</script>
