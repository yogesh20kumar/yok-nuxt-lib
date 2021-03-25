<template>
  <v-app-bar
    app
    clipped-left
    fixed
    short
    color="white"
    elevation="1"
    height="70"
  >
    <v-avatar tile size="70">
      <img width="70" contain src="~/static/logo.svg" :alt="projectName" />
    </v-avatar>
    <v-toolbar-title
      v-if="projectName"
      class="hidden-xs-only font-weight-medium app-bar ml-8"
      >{{ projectName }}</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-if="!isLogin"
        :ripple="false"
        icon
        width="auto"
        height="auto"
        class="pa-1 btn-effect font-weight-medium"
        text
      >
        <v-icon size="18" class="mdi mdi-lock"></v-icon>
        Login
      </v-btn>
      <v-menu v-if="isLogin" bottom left tile offset-y>
        <template #activator="{ on }">
          <v-btn :ripple="false" min-width="0" text icon v-on="on">
            <v-badge
              bordered
              avatar
              overlap
              dot
              color="#CA0000"
              offset-x="12"
              offset-y="10"
            >
              <v-avatar color="rgb(230, 230, 230)" border size="40">
                <span class="black--text pa-1 font-weight-blod fs-13">
                  {{ getShortName }}
                </span>
              </v-avatar>
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="menuList.heading">
            <v-list-item-title>
              <span class="font-weight-bold"> {{ menuList.heading }} </span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item-group>
            <v-list-item v-for="(list, i) in menuList.data" :key="i">
              <v-list-item-title @click.stop="$emit('menu-item-action', list)">
                <v-icon>{{ list.icon }}</v-icon>
                {{ list.title }}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-title @click.stop="$emit('logout')">
                <v-icon>mdi-logout</v-icon> Logout
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
export default {
  name: 'yok-app-bar',
  props: {
    logo: {
      type: String,
      default: () => '',
    },
    isLogin: {
      type: Boolean,
      default: () => false,
    },
    projectName: {
      type: String,
      default: () => '',
    },
    menuList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    getShortName() {
      const matches =
        this.menuList.heading !== undefined && this.menuList.heading !== ''
          ? this.menuList.heading.match(/\b(\w)/g)
          : ['NIA']
      return matches.join('')
    },
  },
}
</script>
