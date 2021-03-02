<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col style="max-width: 400px">
        <p class="text-center mb-8">
          <span class="text-h4 font-weight-black">{{ brandName }}</span>
          <span class="text-h4" v-html="projectName" />
        </p>
        <v-form ref="form" v-model="valid" @submit.prevent method="post">
          <v-card tile width="100%" class="overflow-hidden">
            <v-card-title class="font-weight-black"> Log ind </v-card-title>
            <v-card-text>
              <yok-general-alert
                v-show="alertCfg.show"
                :type="alertCfg.type"
                :message="alertCfg.message"
                :actionFunction="alertCfg.actionFunction"
                :actionText="alertCfg.actionText"
              />
              <v-text-field
                v-model="username"
                :rules="[(v) => !!v || $t('Required')]"
                @update:error="(e) => (valid = !e)"
                @change="() => $refs.form.validate()"
                label="Email"
                name="username"
                outlined
                dense
                required
              />
              <v-text-field
                v-model="password"
                :rules="[(v) => !!v || $t('Required')]"
                @update:error="(e) => (valid = !e)"
                @change="() => $refs.form.validate()"
                label="Kodeord"
                name="password"
                type="password"
                outlined
                dense
                required
              />
            </v-card-text>
            <v-card-actions>
              <v-btn @click="sendResetPwd" text> Glemt kodeord? </v-btn>
              <v-spacer />
              <v-btn
                :disabled="isSubmitDisabled || !valid"
                :loading="isSubmitDisabled"
                @click="onLogin({ username, password })"
                color="primary"
                type="submit"
                depressed
                tile
              >
                Log ind
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import GeneralAlert from './yok-general-alert'

export default {
  name: "yok-login",
  components: {
    // GeneralAlert
  },
  props: {
    onLogin: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      username: null,
      password: null,
      error: null,
      valid: true,
      message: null,
      alertCfg: {
        show: false,
        type: "info",
        message: "",
        actionFunction: () => {},
        actionText: "",
      },
      submitDisabled: false,
      brandName: "",
      projectName: "",
    };
  },
  computed: {
    isSubmitDisabled() {
      return this.submitDisabled;
    },
  },
  mounted() {
    this.brandName = process.env.BRAND_NAME;
    this.projectName = process.env.PROJECT_NAME;
  },
  methods: {
    sendResetPwd() {
      console.log("RESET");
    },
  },
};
</script>
