<template>
  <div class="camera">
    <section class="hero">
      <video ref="video" class="camera-stream"/>
    </section>
    <section class="section level is-mobile">
      <div class="level-item">
        <div class="box" v-if="blobs.length == 0">
          <div class="image is-48x48" style="transform:scale(1.5);">
            <b-icon
              icon="image"
              size="is-medium">
            </b-icon>
          </div>
        </div>
        <div class="box" v-else>
          <div class="image is-48x48" style="transform:scale(1.5);">
            <img style="height:48px" :src="blob_to_url" alt="blob">
          </div>
        </div>
      </div>
      <div class="level-item">
        <a @click="onCaptureBlob">
          <b-icon
            class="button"
            style="color: #DF7560; transform: scale(2);"
            icon="camera-iris"
            size="is-large">
          </b-icon>
        </a>
      </div>
      <div class="level-item">
        <ul>
          <li>
            <div class="content is-flex is-hcenter">
              <h5>{{get_blobs_length}} Images Saved</h5>
            </div>
          </li>
          <li>
            <a class="button is-info" @click="onCapture()">
              Process IMG
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section class="section">
      <div class="box" v-if="blobs.length == 0">
        <div class="image is-48x48" style="transform:scale(1.5);">
          <b-icon
            icon="clipboard-text"
            size="is-medium">
          </b-icon>
        </div>
      </div>
      <div class="box" v-else>
        <p>
        </p>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    data: () => ({
      mediaStream: null,
    }),
    mounted () {
      let tfjsScript = document.createElement('script');
      let mobilenetScript = document.createElement('script');
      let knn_classifierScript = document.createElement('script');
      tfjsScript.setAttribute('src', 'https://unpkg.com/@tensorflow/tfjs');
      mobilenetScript.setAttribute('src', 'https://unpkg.com/@tensorflow/tfjs');
      knn_classifierScript.setAttribute('src', 'https://unpkg.com/@tensorflow/tfjs');
      document.head.appendChild(tfjsScript);
      document.head.appendChild(mobilenetScript);
      document.head.appendChild(knn_classifierScript);

      navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
          this.mediaStream = mediaStream
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
        })
        .catch(error => console.error('getUserMedia() error:', error));
    },
    computed: {
      ...mapState('capture', ['blobs','text','label']),
      ...mapGetters('capture', ['get_blobs_length', 'blob_to_url']),
    },
    methods: {
      ...mapActions('capture', ['keepBlob', 'captureBlob']),
      async onCaptureBlob () {
        const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        const newBlob = await imageCapture.takePhoto();
        await this.keepBlob(newBlob);
      },
      async onCapture() {
        await this.captureBlob();
      },
    },
  };
</script>
