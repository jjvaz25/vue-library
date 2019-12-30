<template>
  <div class="popup">
    <v-dialog
      v-model="dialogOpen"
      max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" depressed v-on="on">
          Add to library
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Add to your library</h2>
        </v-card-title>
        <v-card-text>
          <v-form px-3 ref="form"> 
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="title" label="title*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="creator" label="creator*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                  :items="['Book', 'Video Game', 'Other']"
                  label="category*"
                  required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="rating"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    label="rating"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-checkbox
                    v-model="completed"
                    label="Completed?"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" text @click="dialogOpen = false">Cancel</v-btn>
          <v-btn class="success" text>Submit</v-btn>
        </v-card-actions>

      </v-card>


    </v-dialog>

  </div>
</template>

<script>

export default {
  name: 'Form',
  data() {
    return {
      dialogOpen: true,
      title: '',
      creator: '',
      category: '',
      completed: '',
      rating: ''
    }
  }
}
</script>