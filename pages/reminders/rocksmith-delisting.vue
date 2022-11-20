<template>
  <div class="song-data">
    <h3>
      Song to be delisted in the next
      <input v-model="limit" type="number" />
      days
    </h3>
    <p>{{ soonDelisting.length }} songs found</p>
    <section v-for="song in soonDelisting" :key="song.title + song.performer">
      <p>
        <strong>{{ song.title }}</strong> {{ song.performer }}
      </p>
      <span
        >Delisting
        {{
          expiryDate(song).toLocaleDateString('en-uk', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        }}</span
      >
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
    return { songs, today: new Date(), limit: '30' }
  },
  computed: {
    soonDelisting(): Song[] {
      const endDate = new Date(this.today)
      endDate.setDate(endDate.getDate() + Number.parseInt(this.limit))
      const yesterday = new Date(this.today)
      yesterday.setDate(yesterday.getDate() - 1)
      return this.songs.filter((s) => {
        const expiryDate = this.expiryDate(s)
        return yesterday < expiryDate && expiryDate < endDate
      })
    },
  },
  methods: {
    expiryDate(song: Song): Date {
      const date = new Date(Date.parse(song.releaseDate))
      date.setFullYear(date.getFullYear() + 10)
      while (date.getDay() !== 1) {
        date.setDate(date.getDate() + 1)
      }
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
    addDays(date: Date, days: number): Date {
      const d = new Date(date)
      d.setDate(d.getDate() + days)
      return d
    },
  },
})
</script>

<style scoped>
.song-data {
  display: flex;
  flex-flow: column;
  font-family: Arial, serif;
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

input[type='number'] {
  width: 3.4ch;
  font-size: 16pt;
  border: 0;
  background: #b3ccfa;
  border-radius: 0.4rem;
}
</style>
