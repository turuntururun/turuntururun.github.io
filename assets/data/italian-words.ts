type person = 'io' | 'tu' | 'lui/lei/Lei' | 'noi' | 'voi' | 'loro'

export const persons: person[] = [
  'io',
  'tu',
  'lui/lei/Lei',
  'noi',
  'voi',
  'loro',
]

type conjugation = Record<person, string>

type FullConjugation = {
  indicativo: {
    presente: conjugation
    imperfetto: conjugation
    'passato remoto': conjugation
    'futuro semplice': conjugation
    'passato prossimo': conjugation
    'trapassato prossimo': conjugation
    'trapassato remoto': conjugation
    'futuro anteriore': conjugation
  }
  congiuntivo: {
    presente: conjugation
    passato: conjugation
    imperfetto: conjugation
    trapassato: conjugation
  }
  condizionale: {
    presente: conjugation
    passato: conjugation
  }
  imperativo: {
    presente: conjugation
    futuro: conjugation
  }
  infinito: { presente: string; passato: string }
  participio: { presente: string; passato: string }
  gerundio: { presente: string; passato: string }
}

function conj(forms: string[]): conjugation {
  return {
    io: forms[0] || '',
    tu: forms[1] || '',
    'lui/lei/Lei': forms[2] || '',
    noi: forms[3] || '',
    voi: forms[4] || '',
    loro: forms[5] || '',
  }
}

export const modes: Record<string, string[]> = {
  indicativo: [
    'presente',
    'imperfetto',
    'passato remoto',
    'futuro semplice',
    'passato prossimo',
    'trapassato prossimo',
    'trapassato remoto',
    'futuro anteriore',
  ],
  congiuntivo: ['presente', 'passato', 'imperfetto', 'trapassato'],
  condizionale: ['presente', 'passato'],
  imperativo: ['presente', 'futuro'],
  infinito: ['presente', 'passato'],
  participio: ['presente', 'passato'],
  gerundio: ['presente', 'passato'],
}

export const weirdPresents: Record<string, conjugation> = {
  andare: conj(['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno']),
  bere: conj(['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono']),
  dare: conj(['do', 'dai', 'dà', 'diamo', 'date', 'danno']),
  dire: conj(['dico', 'dici', 'dice', 'diciamo', 'dite', 'dicono']),
  fare: conj(['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno']),
  fuggire: conj(['fuggo', 'fuggi', 'fugge', 'fuggiamo', 'fuggiete', 'fuggono']),
  morire: conj(['muoio', 'mouri', 'muore', 'moriamo', 'morite', 'muoiono']),
  parere: conj(['paio', 'pari', 'pare', 'paiamo', 'parete', 'paiono']),
  piacere: conj([
    'piaccio',
    'piaci',
    'piace',
    'piacciamo',
    'piacete',
    'piacciono',
  ]),
  porre: conj(['pongo', 'poni', 'pone', 'poniamo', 'ponete', 'pongono']),
  rimanere: conj([
    'rimango',
    'rimani',
    'rimane',
    'rimaniamo',
    'rimanete',
    'rimangono',
  ]),
  riuscire: conj([
    'riesco',
    'riesci',
    'riescie',
    'riusciamo',
    'riuscite',
    'riescono',
  ]),
  salire: conj(['salgo', 'sali', 'sale', 'saliamo', 'salite', 'salgono']),
  scegliere: conj([
    'scelgo',
    'scegli',
    'sceglie',
    'scegliamo',
    'scegliete',
    'scelgono',
  ]),
  sciogliere: conj([
    'sciolgo',
    'sciogli',
    'scioglie',
    'sciogliamo',
    'sciogliete',
    'sciolgono',
  ]),
  sedere: conj(['siedo', 'siedi', 'siede', 'sediamo', 'sedete', 'siedono']),
  spegnere: conj([
    'spengo',
    'spegni',
    'spegne',
    'spegniamo',
    'spegnete',
    'spengono',
  ]),
  stare: conj(['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno']),
  tenere: conj(['tengo', 'tieni', 'tiene', 'teniamo', 'tenete', 'tengono']),
  tradurre: conj([
    'traduco',
    'traduci',
    'traduce',
    'traduciamo',
    'traducete',
    'traducono',
  ]),
  trarre: conj(['traggo', 'trai', 'trae', 'traiamo', 'traete', 'traggono']),
  uscire: conj(['esco', 'esci', 'esce', 'usciamo', 'uscite', 'escono']),
  valere: conj(['valgo', 'vali', 'vale', 'valiamo', 'valete', 'valgono']),
  venire: conj(['vengo', 'vieni', 'viene', 'veniamo', 'venite', 'vengono']),
}

export const weirdFutures = [
  ['andare', 'io andró'],
  ['avere', 'io avrò'],
  ['bere', 'io berrò'],
  ['cadere', 'io cadrò'],
  ['dare', 'io darò'],
  ['dire', 'io dirò'],
  ['dovere', 'io dovrò'],
  ['fare', 'io farò'],
  ['porre', 'io porrò'],
  ['potere', 'io potrò'],
  ['ridere', 'io ridurrò'],
  ['rimanere', 'io rimarrò'],
  ['sapere', 'io saprò'],
  ['stare', 'io starò'],
  ['tenere', 'io terrò'],
  ['vedere', 'io vedrò'],
  ['venire', 'io verrò'],
  ['vivere', 'io vivrò'],
  ['volere', 'io vorrò'],
]

export const weirdParticiples = [
  ['accendere', 'acceso'],
  ['accogersi', 'accorto'],
  ['aprire', 'aperto'],
  ['bere', 'bevuto'],
  ['chiedere', 'chiesto'],
  ['chiudere', 'chiuso'],
  ['correre', 'corso'],
  ['decidere', 'deciso'],
  ['dire', 'detto'],
  ['dividere', 'diviso'],
  ['essere', 'stato'],
  ['fare', 'fatto'],
  ['leggere', 'letto'],
  ['mettere', 'messo'],
  ['morire', 'morto'],
  ['nascere', 'nato'],
  ['offendere', 'offeso'],
  ['offrire', 'offerto'],
  ['perdere', 'perso'],
  ['porre', 'posto'],
  ['prendere', 'preso'],
  ['rimanere', 'rimasto'],
  ['rispondere', 'riposto'],
  ['rompere', 'rotto'],
  ['scegliere', 'scelto'],
  ['scendere', 'sceso'],
  ['scrivere', 'scritto'],
  ['spegnere', 'spento'],
  ['stare', 'stato'],
  ['succedere', 'successo'],
  ['tradurre', 'tradotto'],
  ['vedere', 'visto'],
  ['venire', 'venuto'],
  ['vincere', 'vinto'],
  ['vivere', 'vissuto'],
]

const essere: FullConjugation = {
  indicativo: {
    presente: conj(['sono', 'sei', 'è', 'siamo', 'siete', 'sono']),
    imperfetto: conj(['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano']),
    'passato remoto': conj(['fui', 'fosti', 'fu', 'fummo', 'foste', 'furono']),
    'futuro semplice': conj([
      'sarò',
      'sarai',
      'sarà',
      'saremo',
      'sarete',
      'saranno',
    ]),
    'passato prossimo': conj([
      'sono stat@',
      'sei stat@',
      'è stat@',
      'siamo stati',
      'siete stati',
      'sono stati',
    ]),
    'trapassato prossimo': conj([
      'ero stat@',
      'eri stat@',
      'era stat@',
      'eravamo stati',
      'eravate stati',
      'erano stati',
    ]),
    'trapassato remoto': conj([
      'fui stat@',
      'fosti stat@',
      'fu stat@',
      'fummo stati',
      'foste stati',
      'furono stati',
    ]),
    'futuro anteriore': conj([
      'sarò stat@',
      'sarai stat@',
      'sarà stat@',
      'saremo stati',
      'sarete stati',
      'saranno stati',
    ]),
  },
  congiuntivo: {
    presente: conj(['sia', 'sia', 'sia', 'siamo', 'siate', 'siano']),
    passato: conj([
      'sia stat@',
      'sia stat@',
      'sia stat@',
      'siamo stati',
      'siate stati',
      'siano stati',
    ]),
    imperfetto: conj([
      'fossi',
      'fossi',
      'fosse',
      'fossimo',
      'foste',
      'fossero',
    ]),
    trapassato: conj([
      'fossi stat@',
      'fossi stat@',
      'fosse stat@',
      'fossimo stati',
      'foste stati',
      'fossero stati',
    ]),
  },
  condizionale: {
    presente: conj([
      'sarei',
      'saresti',
      'sarebbe',
      'saremmo',
      'sareste',
      'sarebbero',
    ]),
    passato: conj([
      'sarei stat@',
      'saresti stat@',
      'sarebbe stat@',
      'saremmo stati',
      'sareste stati',
      'sarebbero stati',
    ]),
  },
  imperativo: {
    presente: conj(['--', 'sii', 'sia', 'siamo', 'siate', 'siano']),
    futuro: conj(['--', 'sarai', 'sarà', 'saremo', 'sarete', 'saranno']),
  },
  infinito: { presente: 'essere', passato: 'essere stato' },
  participio: { presente: 'ente', passato: 'stato' },
  gerundio: { presente: 'essendo', passato: 'essendo stato' },
}

export const auxiliars = { essere, avere: {} }
