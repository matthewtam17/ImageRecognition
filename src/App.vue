<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar has-shadow is-transparent" role="main navigation" aria-label="dropdown navigation">
        <div class="navbar-brand" style="align-self: center">
          <a class="navbar-item is-large" href="/">
            Picturize
          </a>
        </div>
        <div class="navbar-menu is-shadowless is-active">
          <div class="navbar-end">
            <div class="navbar-item" v-if="isLoggedIn">
              <a class="level-item" href="/camera">
                <b-icon
                    icon="camera"
                    size="is-medium">
                </b-icon>
              </a>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                <b-icon
                    icon="account"
                    size="is-medium">
                </b-icon>
              </a>
              <div class="navbar-dropdown is-boxed is-right">
                <div class="navbar-item buttons" v-if="!isLoggedIn">
                  <a class="button is-info is-medium" @click="login()">
                    Login with Google
                  </a>
                  <a class="button is-info is-medium is-outlined">
                    Try without Login
                  </a>
                </div>
                <div class="navbar-item buttons" v-if="isLoggedIn">
                  <div class="navbar-item navbar-avatar">
                    <figure class="image is-96x96">
                      <img class="is-rounded" style="max-height: none" v-bind:src="user.image">
                    </figure>
                    <figcaption class="subtitle is-5">{{user.name}}</figcaption>
                  </div>
                  <a class="button is-info is-medium">
                    Account
                  </a>
                  <a class="button is-info is-medium is-outlined">
                    My images
                  </a>
                  <a class="button is-info is-medium is-outlined" @click="logout()">
                    Log Out
                  </a>
                </div>
                <hr class="navbar-divider">
                <div class="navbar-item">
                  Made with &#9829;
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view class="main container"/>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapState } from 'vuex';

export default {
  name: 'app',
  computed: mapState('auth', ['user', 'isLoggedIn']),
  methods: mapActions('auth', ['login', 'logout']),
};
</script>

<style lang="scss">
@charset "utf-8";
.navbar-avatar {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.navbar-avatar figcaption {
  margin-top: 1rem;
}

// Import Bulma's core
@import "~bulma/sass/utilities/_all";
// Import a Google Font
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700');
// Import Material Design Icons
@import url('https://cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css');
.is-hcenter {
  justify-content: center;
}
.is-vcenter {
  align-items: center;
}
.card {
  border-radius: 4px;
}
.column {
  margin: 1.5rem 1rem;
}
.navbar {
  padding-right: 5px;
}
.grid-rows {
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 1.5rem;
}
.row-to-col {
  grid-col: 1;
}
@media only screen and (max-width: 924px) {
  .to-cols {
    display: grid;
    grid-template-rows: 1fr;
  }
  .row-to-col {
    grid-row: auto;
  }
}

// Set your brand colors
$green: rgba(29,213,119,0.68);
$green-invert: findColorInvert($green);
$green-dark: rgba(66,185,131,0.82);
$green-dark-invert: findColorInvert($green-dark);
$grey-light: #F2F2F2;
$grey-lighter: #F6F6F6;
$brown: #757763;
$beige-light: #D0D1CD;
$beige-light-invert: findColorInvert($beige-light);
$beige-lighter: #EFF0EB;
$beige-lighter-invert: findColorInvert($beige-lighter);

// Setup $colors to use as bulma classes (e.g. 'is-primary')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($beige-lighter, $beige-lighter-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($green-dark, $green-dark-invert),
    "info": ($green, $green-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
);

// Update Bulma's global variables
$family-primary: "Nunito", sans-serif;
$link: $green-dark;

// Update Bulma's component variables
$navbar-breakpoint: 12px;
$navbar-height: 3rem;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
