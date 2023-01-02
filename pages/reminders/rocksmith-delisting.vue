<template>
  <div class="song-data">
    <h3>
      Song to be delisted in the next
      <input v-model="limit" type="number" />
      days
    </h3>
    <div class="result-row">
      <span>{{ soonDelisting.length }} songs found</span>
      <input v-model="search" placeholder="Search" />
    </div>
    <section v-for="song in soonDelisting" :key="song.title + song.performer">
      <p :class="song.available ? '' : 'strike'">
        <strong>{{ song.title }}</strong> {{ song.performer }}
      </p>
      <span
        >{{ song.available ? 'Delisting' : 'Delisted' }}
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
        <a v-if="song.available" :href="searchSteam(song)" target="_blank"
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
    return { songs, today: new Date(), limit: '30', search: '' }
  },
  computed: {
    soonDelisting(): Song[] {
      if (this.search) {
        return this.songs.filter((s) => {
          const text = (s.title + ' ' + s.performer).toLowerCase()
          const searchParams = this.search.toLowerCase().split(' ')
          for (const word of searchParams) {
            if (!text.includes(word)) {
              return false
            }
          }
          return true
        })
      }
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

<style scoped lang="scss">
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

.result-row {
  margin: 0 2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.strike {
  text-decoration: line-through;
}
</style>
