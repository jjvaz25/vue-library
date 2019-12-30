<template>
  <div class="my-library">
    <h1 class="title grey--text text--darken-1">My Library</h1>

    <v-container fluid class="my-5">
      <v-row>    
        <v-col 
          v-for="item in library" :key="item.title"
          cols="12" lg="4" md="6" s="12"
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
                <v-list-item-title class="headline mb-1">{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.creator }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ item.rating }}/10</v-list-item-subtitle>
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
              <v-btn>Completd</v-btn>
              
              <v-spacer></v-spacer>
              <v-btn >Edit</v-btn>
              <v-btn >Delete</v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MyLibrary',
  components: {
  },
  data() {
    return {
      library: [
        { title: 'The Last of Us', creator: 'Naughty Dog', category: 'Video Game', completed: true, rating: 8 },
        { title: 'Metal Gear Solid V', creator: 'Konami', category: 'Video Game', completed: true, rating: 9 },
        { title: 'My Brilliant Friend', creator: 'Elena Ferrante', category: 'Book', completed: true, rating: 8 },
        { title: 'Zen and the Art of Motorcycle Maintenance', creator: 'Robert M. Pirsig', category: 'Book', completed: false, rating: 3 },
        { title: 'The Odin Project', creator: 'Open Source', category: 'Other', completed: false, rating: 10 },
      ]
    }
  }
}
</script>
