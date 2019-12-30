<template>
  <nav>
    <v-app-bar
      app
      flat
      color="primary"
      dark
    >
      <v-toolbar
        flat
        color="primary" 
      >
        <v-toolbar-title>          
            <span>Spartan</span>
            <span class="font-weight-medium">Library</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="text-center">
          <v-menu 
            offset-y
            origin="top center"
            transition="scale-transition"
          >
            <template 
              v-slot:activator="{ on }"
            >
              <v-btn 
                v-on="on"
                text
              >
                <v-icon left >expand_more</v-icon>
                <span>get started</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="link in links" :key="link.text"
                router :to="link.route"
              >
                <v-icon left small>{{ link.icon }}</v-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        
        <div class="text-center">
          <v-menu
            offset-y
            origin="top center"
            transition="scale-transition"
          >
            <template 
              v-slot:activator="{ on }"
            >
              <v-btn 
                v-on="on"
                text
                
              >
                <v-icon>person</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-icon small left>person</v-icon>
                <v-list-item-title>My Account</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-icon small left>exit_to_app</v-icon>
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

      </v-toolbar>
    </v-app-bar>

  </nav>
</template>

<script>

export default {
  name: 'TopNav',
  data() {
    return {
      links: [
        { icon: 'folder', text: 'My Library', route: '/' },
        { icon: 'folder_special', text: 'Wish List', route: '/wish-list' },
        { icon: 'email', text: 'Contact', route: '/contact' },
      ]
    }
  }
}
</script>

<style>

</style>