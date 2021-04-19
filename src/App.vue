<template>
  <div class="App">
    <v-app>
      <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click.stop="slide = !slide"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer"
            >MeetUps</router-link
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          class="hidden-sm-and-down white--text"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text class="hidden-sm-and-down white--text" v-if="userAuthenticated" 
        @click="onLogout">
           <v-icon left>mdi-cancel</v-icon>
           Logout
        </v-btn>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-navigation-drawer v-model="slide" temporary absolute>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/78.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list>
          <v-list dense>
            <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              link
              router
              :to="item.link"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="userAuthenticated" @click="onLogout">
              <v-list-item-icon>
                <v-icon>mdi-cancel</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list>

        <v-divider></v-divider>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
    slide: false,
  }),
  computed: {
    menuItems() {
      let menus = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" },
      ];
      if (this.userAuthenticated) {
        menus = [
          {icon: "supervisor_account",title: "View Meetups",link: "/meetups"},
          {icon: "room", title: "Organize Meetup", link: "/meetup/new" },
          {icon: "person", title: "Profile", link: "/profile" },
        ];
      }
      return menus;
    },
    userAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods:{
    onLogout(){
      this.$store.dispatch('logout')
      this.$router.push('/signin')
    }
  }
};
</script>
