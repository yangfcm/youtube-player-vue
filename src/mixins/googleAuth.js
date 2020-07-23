import { mapActions } from "vuex";
const googleAuth = {
  created() {
    if (!window.gapi) return;
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.VUE_APP_CLIENT_ID,
          scope:
            "email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  },

  methods: {
    ...mapActions({
      signIn: "signIn",
      signOut: "signOut",
    }),
    onAuthChange(isSignedIn) {
      if (isSignedIn) {
        this.signIn(this.auth.currentUser.get()); // signIn action
      } else {
        this.signOut(); // signOut action
      }
    },
    handleGoogleSignout() {
      this.auth.signOut(); // signOut provided by Google Auth API
    },
    handleGoogleSignin() {
      this.auth.signIn(); // signIn provided by Google Auth API
    },
  },
};

export default googleAuth;
