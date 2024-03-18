const noteDict = new Map([
  [0, "C"],
  [1, ""],
  [2, "D"],
  [3, ""],
  [4, "E"],
  [5, "F"],
  [6, ""],
  [7, "G"],
  [8, ""],
  [9, "A"],
  [10, ""],
  [11, "B"],
])

export const scaleComposer = (base: (root: number) => number[], ...modifiers: ((source: number[]) => number[])[]) => {
  return (root: number) => {
    let result = base(root);
    modifiers.forEach(modifier => {
      result = modifier(result)
    })
    return result
  }
}

export const onDegree = (degree: number) => (source: number[]) => {
  if (degree == 1) return source
  return [...source.slice(degree - 1), ...source.slice(0, degree - 1).map(a => a + 12)]
}

// fixme if source is larger than the octave requested, slice source
export const octaves = (amount: number) => (source: number[]) => {
  // fixme non octave scales will break
  const noteNumber = 7;
  while (source.length < amount * noteNumber) {
    const pattern = source.slice(0, noteNumber)
    source.push(...pattern.map(a => a + 12))
  }
  return source
}

export const closed = (source: number[]) => {
  const root = source[0];
  let octave = 1
  while (source.includes(root + 12 * octave)) {
    octave++
  }
  source.push(root + 12 * octave)
  return source
}

export const major = (root: number) => [root, root + 2, root + 4, root + 5, root + 7, root + 9, root + 11]

export const withFlat = (n: number) => {
  return (source: number[]) => {
    source[n - 1] -= 1
    return source
  }
}
export const withSharp = (n: number) => {
  return (source: number[]) => {
    source[n - 1] += 1
    return source
  }
}

export const melodicMinor = (root: number) => {
  return scaleComposer(major, withFlat(3))(root)
}
export const harmonicMinor = (root: number) => {
  return scaleComposer(melodicMinor, withFlat(6))(root)
}
export const harmonicMajor = (root: number) => {
  return scaleComposer(harmonicMinor, withSharp(3))(root)
}

export function noteName(n: number): string[] {
  const s = noteDict.get(n % 12)
  if(s) return [s]

  return [noteDict.get((n-1) % 12) + '#', noteDict.get((n+1) % 12)+'b' ]

}

const standardE = [
  {string: 1, note: 64},
  {string: 2, note: 59},
  {string: 3, note: 55},
  {string: 4, note: 50},
  {string: 5, note: 45},
  {string: 6, note: 40},
]

export const generateFingering = (notes: number[], tuning: { string: number, note: number }[] = standardE) => {
  const fretCoverage = 4
  const baseFret = notes[0] - Math.min(...tuning.map(a => a.note))
  const result: { string: number, fret: number }[] = []
  let currentTuningIndex = tuning.length - 1
  notes.forEach(note => {
    let tuningElement = tuning[currentTuningIndex];
    let fret = note - tuningElement.note;
    if (fret >= baseFret + fretCoverage) {
      currentTuningIndex--
      tuningElement = tuning[currentTuningIndex];
      fret = note - tuningElement.note;
      result.push(
        {string: tuningElement.string, fret: fret}
      )
    } else {
      result.push(
        {string: tuningElement.string, fret: fret}
      )
    }
  })

  return result;
}

export const parseChord = (notes: number[]): string[] => {

  const root = notes[0]
  const rootName = noteName(root)

  const third = notes[1] - root
  const fifth = notes[2] - root

  let flavor = ''
  if (third == 4) {
    if(fifth == 7)
      flavor = 'major'
    if(fifth == 8)
      flavor = 'aug'
  } else if (third == 3){
    if(fifth == 7)
      flavor = 'minor'
    if(fifth == 6)
      flavor = 'dim'
  }
  return rootName.map(n => n + ' ' + flavor)
}
