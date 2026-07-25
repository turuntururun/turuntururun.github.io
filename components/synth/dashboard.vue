<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    innerKnob?: string
    outerKnob?: string
    variation: number
    type: number
  }>(),
  { innerKnob: '', outerKnob: '', variation: 0, type: 0 },
)

function rotatedByPosition(position: number): string {
  const angle = (420 - position * 30) % 360
  return `rotate(${angle})`
}

function numberCounterRotation(number: number): string {
  const angle = (number * 30 - 60) % 360
  return `rotate(${angle}, 0,-60)`
}
</script>

<template>
  <svg style="margin: 2rem 1rem" viewBox="0 0 600 250">
    <!-- Background -->
    <rect fill="black" height="250" width="600" />

    <!-- Mix dials -->
    <g transform="translate(50, 50)">
      <circle r="24" fill="white" />
      <circle r="18" />
      <circle r="12" fill="white" />

      <rect y="-7" height="14" x="15" width="12" />
      <rect y="-3" height="6" x="0" width="30" fill="white" rx="2" />
      <text x="36" y="0" text-anchor="start" dominant-baseline="middle">
        EFFECT
      </text>

      <rect y="21" height="18" x="-3" width="6" fill="white" rx="2" />
      <rect y="33" height="6" x="0" width="30" fill="white" rx="2" />
      <text x="36" y="36" text-anchor="start" dominant-baseline="middle">
        DIRECT
      </text>
    </g>

    <!-- Param dials -->
    <g transform="translate(190, 50)">
      <circle r="24" fill="white" />
      <circle r="18" />
      <circle r="12" fill="white" />

      <rect y="-7" height="14" x="15" width="12" />
      <rect y="-3" height="6" x="0" width="30" fill="white" rx="2" />
      <text x="36" y="0" text-anchor="start" dominant-baseline="middle">
        {{ props.innerKnob }}
      </text>

      <rect y="21" height="18" x="-3" width="6" fill="white" rx="2" />
      <rect y="33" height="6" x="0" width="30" fill="white" rx="2" />
      <text x="36" y="36" text-anchor="start" dominant-baseline="middle">
        {{ props.outerKnob }}
      </text>
    </g>

    <!-- Variation knob -->
    <g transform="translate(370, 145)">
      <text x="0" y="-100" text-anchor="middle" dominant-baseline="hanging">
        VARIATION
      </text>

      <g
        v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :transform="rotatedByPosition(i)"
      >
        <g :transform="numberCounterRotation(i)">
          <text x="0" y="-60" text-anchor="middle" dominant-baseline="middle">
            {{ i + 1 }}
          </text>
        </g>
        <path
          :d="'M -5,-45 A 45,45 0,0,1 5,-45'"
          stroke="#fff"
          stroke-width="6"
        />
      </g>

      <circle cx="0" cy="0" r="42" fill="#000" stroke="#999" />
      <g :transform="rotatedByPosition(props.variation)">
        <rect x="-5" width="10" y="-39" height="18" fill="#fff" rx="5" />
      </g>
    </g>

    <!-- Type knob -->
    <g transform="translate(510, 155)">
      <text x="0" y="-110" text-anchor="middle" dominant-baseline="hanging">
        TYPE
      </text>

      <text x="12" y="-50" text-anchor="start">LEAD</text>
      <line class="type-connector" x1="24" y1="-39" x2="24" y2="-48" />

      <text :x="8" y="-75" text-anchor="start" dominant-baseline="middle">
        PAD
      </text>
      <path :d="'M 0,-48 L 0,-75 L 6,-75'" stroke="#fff" stroke-width="3" />

      <text :x="-57" :y="-75" text-anchor="start" dominant-baseline="middle">
        BASS
      </text>
      <line class="type-connector" :x1="-24" :y1="-40" :x2="-24" :y2="-66" />

      <text :x="-72" :y="-54" text-anchor="start" dominant-baseline="middle">
        STR
      </text>
      <path :d="'M -48,-45 V -27 L -40,-23'" stroke="#fff" stroke-width="3" />

      <text :x="-54" :y="57" text-anchor="start" dominant-baseline="middle">
        BELL
      </text>
      <g transform="rotate(60)">
        <line class="type-connector" x1="0" y1="48" x2="0" :y2="56" />
      </g>
      <line class="type-connector" :x1="-48" :y1="27" :x2="-48" :y2="45" />

      <text :x="-72" :y="75" text-anchor="start" dominant-baseline="middle">
        ORGAN
      </text>
      <line class="type-connector" :x1="-66" :y1="0" :x2="-48" :y2="0" />
      <line class="type-connector" :x1="-65" :y1="0" :x2="-65" :y2="62" />

      <text :x="9" :y="57" text-anchor="start" dominant-baseline="middle">
        SEQ
      </text>
      <line class="type-connector" x1="24" :y1="40" x2="24" :y2="47" />

      <text :x="6" :y="75" text-anchor="start" dominant-baseline="middle">
        SFX
      </text>
      <line class="type-connector" x1="0" :y1="48" x2="0" :y2="76" />
      <line class="type-connector" :x1="0" :y1="75" :x2="4" :y2="75" />

      <g
        v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :transform="rotatedByPosition(i)"
      >
        <path
          :d="'M -4,-45 A 45,45 0,0,1 4,-45'"
          stroke="#fff"
          stroke-width="6"
        />
      </g>
      <g v-for="i in [45, 135, 195]" :transform="'rotate(' + i + ')'">
        <path d="M -7,-45 A 45,45 0,0,1 7,-45" stroke="#fff" stroke-width="6" />
      </g>

      <!-- Base circle -->
      <circle cx="0" cy="0" r="42" fill="#000" stroke="#999" />

      <!-- Rotation indicator - rotates around (0,0) since we're in translated space -->
      <g :transform="rotatedByPosition(props.type)">
        <rect x="-5" width="10" y="-39" height="18" fill="#fff" rx="5" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
text {
  fill: white;
  font:
    bold 18px Verdana,
    Helvetica,
    Arial,
    sans-serif;
}

line.type-connector {
  stroke: white;
  stroke-width: 3px;
}

svg {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
