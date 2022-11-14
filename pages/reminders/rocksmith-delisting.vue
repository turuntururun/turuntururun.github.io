<template>
  <div class="song-data">
    <h3>Soon to be delisted</h3>
    <section v-for="song in soonDelisting" :key="song.title">
      <p><strong>{{ song.title }}</strong> {{ song.performer }}</p>
      <span>Delisting ~{{ expiryDate(song).toLocaleDateString() }}</span>
      <span>
        <a :href="searchSpotify(song)" target="_blank"
          ><img
            src="https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png"
            alt="Spotify search"
        /></a>
        <a :href="searchSteam(song)" target="_blank"
          ><img
            src="https://store.steampowered.com/favicon.ico"
            alt="Steam search"
        /></a>
      </span>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Song, songs } from 'assets/data/rocksmith'

export default Vue.extend({
  name: 'RocksmithDelisting',
  data() {
    return { songs, today: new Date() }
  },
  computed: {
    soonDelisting(): Song[] {
      const nextMonth = new Date(this.today)
      nextMonth.setDate(nextMonth.getDate() + 30)
      const yesterday = new Date(this.today)
      yesterday.setDate(yesterday.getDate() - 1)
      return this.songs.filter(
        (s) => this.expiryDate(s) > yesterday && this.expiryDate(s) < nextMonth
      )
    },
  },
  methods: {
    expiryDate(song: Song): Date {
      const date = new Date(Date.parse(song.releaseDate))
      date.setFullYear(date.getFullYear() + 10)
      return date
    },
    searchSpotify(song: Song): string {
      return (
        'https://open.spotify.com/search/' +
        encodeURIComponent(song.title + ' ' + song.performer)
      )
    },
    searchSteam(song: Song): string {
      return (
        'https://store.steampowered.com/search/?term=' +
        encodeURIComponent(song.title + ' ' + song.performer)
      )
    },
  },
})
</script>

<style scoped>
.song-data{
  display: flex;
  flex-flow: column;
  font-family:  Arial, serif;
}
img {
  height: 15px;
}

h3 {
  font-size: 18pt;
  margin: 0 auto;
}
section {
  font-size: 13pt;
  margin: 0.5rem 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid cornflowerblue;
}
</style>
