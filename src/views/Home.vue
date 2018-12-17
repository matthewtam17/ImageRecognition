<template>
  <div class="homepage">
    <section class="section">
      <div class="box" v-for="quest in quests">
        <div class="columns">
          <div class="column has-text-centered">
            <div>
              <p class="heading">Quest Title</p>
              <p class="title">{{ quest.name }}</p>
            </div>
          </div>
          <div class="column has-text-centered">
            <div>
              <p class="heading">Images Slain</p>
              <p class="title">
                {{ quest.slain }}&nbsp;
                <b-icon
                    icon="sword-cross"
                    size="is-small">
                </b-icon>
              </p>
            </div>
          </div>
          <div class="column has-text-centered">
            <div>
              <p class="heading">Accuracy</p>
              <p class="title">{{ quest.accuracy }}</p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-flex is-vcenter is-hcenter">
            <div class="image is-128x128">
              <img :src="quest.image_url">
            </div>
          </div>
          <div class="column is-flex is-vcenter is-hcenter">
            <router-link
              :to="{ name: 'camera', params: {quest_id: quest.id} }"
              class="button is-info is-large">
              Join This Quest!
            </router-link>
          </div>
          <div class="column is-flex is-vcenter is-hcenter">
            <div class="content has-text-centered">
              <p class="heading">Aim</p>
              <p class="title is-5">{{ quest.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
import { mapState, mapActions } from 'vuex';

export default {
  mounted() {
    this.init();
  },
  computed: mapState('quests', ['quests']),
  methods: mapActions('quests', ['init']),
};
</script>
