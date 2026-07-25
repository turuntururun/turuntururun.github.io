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

<script setup lang="ts">
import { type Song, songs } from 'assets/data/rocksmith'

useHead({ title: 'Rocksmith Delisting' })

const today = new Date()
const limit = ref(30)
const search = ref('')
const hiddenSongs = ref<number[]>([])

function expiryDate(song: Song): Date {
  const date = new Date(Date.parse(song.releaseDate))
  date.setFullYear(date.getFullYear() + 10)
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1)
  }
  return date
}

const soonDelisting = computed(() => {
  if (search.value) {
    return songs.filter((s) => {
      const text = (s.title + ' ' + s.performer).toLowerCase()
      const searchParams = search.value.toLowerCase().split(' ')
      for (const word of searchParams) {
        if (!text.includes(word)) {
          return false
        }
      }
      return true
    })
  }
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + limit.value)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  return songs.filter((s) => {
    if (hiddenSongs.value.includes(s.id)) return false
    const ed = expiryDate(s)
    return yesterday < ed && ed < endDate
  })
})

function searchSpotify(song: Song): string {
  return (
    'https://open.spotify.com/search/' +
    encodeURIComponent(song.title + ' ' + song.performer)
  )
}

function searchSteam(song: Song): string {
  return (
    'https://store.steampowered.com/search/?term=' +
    encodeURIComponent(song.title + ' ' + song.performer)
  )
}

function searchYouTube(song: Song): string {
  return (
    `https://www.youtube.com/results?search_query=Rocksmith+${song.title}+${song.performer}`
      .replaceAll(' ', '+')
  )
}

function available(date: number): boolean {
  return date > today.getTime()
}

function hide(songId: number, toHide: boolean) {
  if (toHide) {
    hiddenSongs.value.push(songId)
  } else {
    const index = hiddenSongs.value.indexOf(songId)
    if (index > -1) {
      hiddenSongs.value.splice(index, 1)
    }
  }
  localStorage.setItem('hidden-songs', JSON.stringify(hiddenSongs.value))
}

onMounted(() => {
  try {
    const hiddenSongsCache = localStorage.getItem('hidden-songs') || '[]'
    hiddenSongs.value = JSON.parse(hiddenSongsCache)
    limit.value = Number.parseInt(localStorage.getItem('limit-days') || '30')
  } catch (e) {
    console.error(e)
  }
})

watch(limit, val => localStorage.setItem('limit-days', val.toString()))

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
