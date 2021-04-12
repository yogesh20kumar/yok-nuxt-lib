<template>
  <v-app-bar
    app
    clipped-left
    fixed
    short
    color="white"
    elevation="1"
    height="70"
    class="yok-app-bar"
  >
    <v-avatar tile size="70">
      <img
        width="70"
        contain
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light-text.svg"
        :alt="projectName"
      />
    </v-avatar>
    <!-- eslint-disable -->
    <v-toolbar-title
      v-if="projectName"
      class="hidden-xs-only font-weight-medium app-bar ml-8"
      v-html="projectName"
    ></v-toolbar-title
    ><!-- eslint-enable -->
    <yok-search-address
      append-icon="mdi-apps"
      prepend-inner-icon="mdi-magnify mdi-rotate-90"
      :make-clear="true"
      @append-icon-event="searchAppendIconEvent"
      @address-details="selectedAddress"
    />
    <yok-tool-btn
      v-if="haveToolIcons"
      :items="toolIconsList"
      @tool-action="toolAction"
    ></yok-tool-btn>
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
          <v-list-item v-if="avatarMenuList.heading">
            <v-list-item-title>
              <span class="font-weight-bold">
                {{ avatarMenuList.heading }}
              </span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item-group>
            <v-list-item v-for="(list, i) in avatarMenuList.data" :key="i">
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
  // name: 'yok-app-bar',
  props: {
    projectName: {
      type: String,
      default: () => '',
    },
    isLogin: {
      type: Boolean,
      default: () => false,
    },
    avatarMenuList: {
      type: Object,
      default: () => {},
    },
    haveToolIcons: {
      type: Boolean,
      default: () => false,
    },
    toolIconsList: {
      type: Array,
      default: () => [],
    },
    haveSearchAddressField: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {}
  },
  computed: {
    getShortName() {
      const matches =
        this.avatarMenuList.heading !== undefined &&
        this.avatarMenuList.heading !== ''
          ? this.avatarMenuList.heading.match(/\b(\w)/g)
          : ['NIA']
      return matches.join('')
    },
  },
  methods: {
    toolAction(obj) {
      this.$emit('tool-item-action', obj)
    },
    searchAppendIconEvent() {
      this.$emit('search-append-icon-action')
    },
    selectedAddress(obj) {
      this.$emit('selected-address', obj)
    },
  },
}
</script>
