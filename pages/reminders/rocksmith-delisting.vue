<template>
  <client-only>
    <div class="song-data">
      <h3 v-if="search">Songs matching '{{ search }}'</h3>
      <h3 v-else>
        Song to be delisted in the next
        <input v-model="limit" type="number" />
        days
      </h3>
      <div class="result-row">
        <span>{{ soonDelisting.length }} songs found</span>
        <input v-model="search" placeholder="Search" />
      </div>
      <section v-for="song in soonDelisting" :key="song.title + song.performer">
        <p :class="available(song.expiration) ? '' : 'strike'">
          <code v-if="hiddenSongs.includes(song.id)">Hidden</code>
          <strong>{{ song.title }}</strong> <cite>{{ song.performer }}</cite>
        </p>
        <span
        >{{ available(song.expiration) ? 'Delisting' : 'Delisted' }}
        {{
            expiryDate(song).toLocaleDateString('en-uk', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          }}</span
        >
        <span>
        <a :href="searchSpotify(song)" target="_blank"
        ><img class="inline-logo"
          src="https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png"
          alt="Spotify search"
        /></a>
        <a :href="searchYouTube(song)" target="_blank"
        ><img class="inline-logo"
          src="https://www.youtube.com/s/desktop/8093e6f6/img/favicon.ico"

          alt="YouTube search"
        /></a>
        <a v-if="available(song.expiration)" :href="searchSteam(song)" target="_blank"
        ><img class="inline-logo"
          src="https://store.steampowered.com/favicon.ico"
          alt="Steam search"
        /></a>
      </span>
        <span class="hide-widget">
        <label>
          <code>
            {{ hiddenSongs.includes(song.id)?'Show':'Hide' }}
          </code>
          <input type="checkbox" style="display: none"
                 :checked="hiddenSongs.includes(song.id)"
                 @change="hide(song.id,($event?.target as HTMLInputElement).checked)">
        </label>
          </span>
      </section>
      <footer>Dates are best effort approximates. Feel free to send your comments to
        <a href="mailto:kevin@turuntururun.com">kevin@turuntururun.com</a></footer>
    </div>
  </client-only>
</template>

<script lang="ts">
import { type Song, songs } from 'assets/data/rocksmith'

export default defineNuxtComponent({
  name: 'RocksmithDelisting',
  head: () => ({ title: 'Rocksmith Delisting' }),
  data() {
    const today = new Date()
    return { today, limit: 30, search: '', hiddenSongs: [0] }
  },
  computed: {
    soonDelisting(): Song[] {
      if (this.search) {
        return songs.filter((s) => {
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
      endDate.setDate(endDate.getDate() + this.limit)
      const yesterday = new Date(this.today)
      yesterday.setDate(yesterday.getDate() - 1)
      return songs.filter((s) => {
        if(this.hiddenSongs.includes(s.id)) return false
        const expiryDate = this.expiryDate(s)
        return yesterday < expiryDate && expiryDate < endDate
      })
    }
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
    searchYouTube(song: Song): string {
      return (
        `https://www.youtube.com/results?search_query=Rocksmith+${song.title}+${song.performer}`
          .replaceAll(' ', '+')
      )
    },
    available(date: number): boolean {
      return date > this.today.getTime()
    },
    hide(songId: number, toHide: boolean){
      if (toHide) {
        this.hiddenSongs.push(songId)
      } else {
        const index = this.hiddenSongs.indexOf(songId);
        if (index > -1) {
          this.hiddenSongs.splice(index, 1);
        }
      }
      localStorage.setItem('hidden-songs', JSON.stringify(this.hiddenSongs))
    },
  },
  mounted(){
    try {
      const hiddenSongs = localStorage.getItem('hidden-songs') || '[]'
      this.hiddenSongs = JSON.parse(hiddenSongs)
      this.limit = Number.parseInt(localStorage.getItem('limit-days') || '30')
    } catch (e) {

    }
  },
  watch: {
    limit(val) {
      localStorage.setItem('limit-days', val)
    }
  }
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

strong {
  font-size: larger;
}

h3 {
  font-size: 18pt;
  margin: 0 auto;
}

section {
  font-size: 13pt;
  margin: 0.5rem 0.5rem;
  padding: 0.5rem;
  flex: 5;
  border-bottom: 1px solid cornflowerblue;

  * {
    margin-right: 0.25rem;
  }
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

.hide-widget {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
}

</style>
