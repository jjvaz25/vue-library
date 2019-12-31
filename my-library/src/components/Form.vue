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
                  <v-text-field 
                    v-model="title" 
                    label="title*" 
                    :rules="inputRules"
                    prepend-icon="folder"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field 
                    v-model="creator" 
                    label="creator*" 
                    :rules="inputRules"
                    prepend-icon="person"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                  v-model="category"
                  :items="['Book', 'Video Game', 'Other']"
                  label="category*"
                  :rules="inputRules"
                  prepend-icon="label"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="rating"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    label="rating"
                    prepend-icon="star"
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
          <v-btn @click="submit" class="success" text :loading="loading">Submit</v-btn>
        </v-card-actions>

      </v-card>


    </v-dialog>

  </div>
</template>

<script>
import db from '../fb'

export default {
  name: 'Form',
  data() {
    return {
      dialogOpen: false,
      inputRules: [
        v=> (v && v.length >= 1) || 'Field is required' 
      ],
      title: '',
      creator: '',
      category: '',
      completed: false,
      rating: null,
      loading: false,
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const item = {
          title: this.title,
          creator: this.creator,
          category: this.category,
          completed: this.completed,
          rating: this.rating,
          time: new Date()
        }
        db.collection('library').add(item).then(() => {
          this.loading = false
          this.dialogOpen = false
          this.$emit('itemAdded')
          this.$refs.form.reset()
        })
      }
    },
  }
}
</script>