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
    presente: Partial<conjugation>
    futuro: Partial<conjugation>
  }
  infinito: { presente: string; passato: string }
  participio: { presente: string; passato: string }
  gerundio: { presente: string; passato: string }
}

type EssentialConjugation = {
  infinito: string
  gerundio: string
  participio: { presente: string; passato: string }
  indicativo: {
    presente: conjugation
    imperfetto: conjugation
    'passato remoto': conjugation
    'futuro semplice': conjugation
  }
  congiuntivo: {
    presente: conjugation
    imperfetto: conjugation
  }
  condizionale: conjugation
  imperativo: {
    presente: Partial<conjugation>
    futuro: Partial<conjugation>
  }
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

function compose(base: conjugation, participle: string): conjugation {
  return {
    io: base.io + ' ' + participle,
    tu: base.tu + ' ' + participle,
    'lui/lei/Lei': base['lui/lei/Lei'] + ' ' + participle,
    noi: base.noi + ' ' + participle,
    voi: base.voi + ' ' + participle,
    loro: base.loro + ' ' + participle,
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

const avere: EssentialConjugation = {
  infinito: 'avere',
  gerundio: 'avendo',
  participio: { presente: 'avente', passato: 'avuto' },
  indicativo: {
    presente: conj(['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno']),
    imperfetto: conj([
      'avevo',
      'avevi',
      'aveva',
      'avevamo',
      'avevate',
      'avevano',
    ]),
    'passato remoto': conj([
      'ebbi',
      'avesti',
      'ebbe',
      'avemmo',
      'aveste',
      'ebbero',
    ]),
    'futuro semplice': conj([
      'avrò',
      'avrai',
      'avrà',
      'avremo',
      'avrete',
      'avranno',
    ]),
  },
  congiuntivo: {
    presente: conj([
      'abbia',
      'abbia',
      'abbia',
      'abbiamo',
      'abbiate',
      'abbiano',
    ]),
    imperfetto: conj([
      'avessi',
      'avessi',
      'avesse',
      'avessimo',
      'aveste',
      'avessero',
    ]),
  },
  condizionale: conj([
    'avrei',
    'avresti',
    'avrebbe',
    'avremmo',
    'avreste',
    'avrebbero',
  ]),
  imperativo: {
    presente: conj(['--', 'abbi', 'abbia', 'abbiamo', 'abbiate', 'abbiano']),
    futuro: conj(['--', 'avrai', 'avrà', 'avremo', 'avrete', 'avranno']),
  },
}

function composeConjugation(
  aux: EssentialConjugation,
  simpleConjugation: EssentialConjugation,
): FullConjugation {
  let participle = simpleConjugation.participio.passato
  return {
    infinito: {
      presente: simpleConjugation.infinito,
      passato: aux.infinito + ' ' + participle,
    },
    participio: {
      presente: simpleConjugation.participio.presente,
      passato: participle,
    },
    gerundio: {
      presente: simpleConjugation.gerundio,
      passato: aux.gerundio + ' ' + participle,
    },

    indicativo: {
      presente: simpleConjugation.indicativo.presente,
      imperfetto: simpleConjugation.indicativo.imperfetto,
      'passato remoto': simpleConjugation.indicativo['passato remoto'],
      'futuro semplice': simpleConjugation.indicativo['futuro semplice'],
      'passato prossimo': compose(aux.indicativo.presente, participle),
      'trapassato prossimo': compose(aux.indicativo.imperfetto, participle),
      'trapassato remoto': compose(
        aux.indicativo['passato remoto'],
        participle,
      ),
      'futuro anteriore': compose(
        aux.indicativo['futuro semplice'],
        participle,
      ),
    },
    congiuntivo: {
      presente: simpleConjugation.congiuntivo.presente,
      passato: compose(aux.congiuntivo.presente, participle),
      imperfetto: simpleConjugation.congiuntivo.imperfetto,
      trapassato: compose(aux.congiuntivo.imperfetto, participle),
    },
    condizionale: {
      presente: simpleConjugation.condizionale,
      passato: compose(aux.condizionale, participle),
    },
    imperativo: simpleConjugation.imperativo,
  }
}

export const sampleConjugations: Record<string, FullConjugation> = {
  essere,
  avere: composeConjugation(avere, avere),
  amare: composeConjugation(avere, {
    infinito: 'amare',
    gerundio: 'amando',
    participio: { presente: 'amante', passato: 'amato' },
    indicativo: {
      presente: conj(['amo', 'ami', 'ama', 'amiamo', 'amate', 'amano']),
      imperfetto: conj([
        'amavo',
        'amavi',
        'amava',
        'amavamo',
        'amavate',
        'amavano',
      ]),
      'passato remoto': conj([
        'amai',
        'amasti',
        'amò',
        'amammo',
        'amaste',
        'amarono',
      ]),
      'futuro semplice': conj([
        'amerò',
        'amerai',
        'amerà',
        'ameremo',
        'amerete',
        'ameranno',
      ]),
    },
    condizionale: conj([
      'amerei',
      'ameresti',
      'amerebbe',
      'ameremmo',
      'amereste',
      'amerebbero',
    ]),
    congiuntivo: {
      presente: conj(['ami', 'ami', 'ami', 'amiamo', 'amiate', 'amino']),
      imperfetto: conj([
        'amassi',
        'amassi',
        'amasse',
        'amassimo',
        'amaste',
        'amassero',
      ]),
    },
    imperativo: {
      presente: {
        tu: 'ama',
        'lui/lei/Lei': 'ami',
        noi: 'amiamo',
        voi: 'amate',
        loro: 'amino',
      },
      futuro: {
        tu: 'amerai',
        'lui/lei/Lei': 'amerà',
        noi: 'ameremo',
        voi: 'amerete',
        loro: 'ameranno',
      },
    },
  }),
  temere: composeConjugation(avere, {
    infinito: 'temere',
    gerundio: 'temendo',
    participio: { presente: 'temente', passato: 'temuto' },
    indicativo: {
      presente: {
        io: 'temo',
        tu: 'temi',
        'lui/lei/Lei': 'teme',
        noi: 'temiamo',
        voi: 'temete',
        loro: 'temono',
      },
      imperfetto: {
        io: 'temevo',
        tu: 'temevi',
        'lui/lei/Lei': 'temeva',
        noi: 'temevamo',
        voi: 'temevate',
        loro: 'temevano',
      },
      'passato remoto': {
        io: 'temei',
        tu: 'temesti',
        'lui/lei/Lei': 'temette',
        noi: 'tememmo',
        voi: 'temeteste',
        loro: 'temerono',
      },
      'futuro semplice': {
        io: 'temerò',
        tu: 'temerai',
        'lui/lei/Lei': 'temerà',
        noi: 'temeremo',
        voi: 'temerete',
        loro: 'temeranno',
      },
    },
    congiuntivo: {
      presente: {
        io: 'tema',
        tu: 'tema',
        'lui/lei/Lei': 'tema',
        noi: 'temiamo',
        voi: 'temiate',
        loro: 'temano',
      },
      imperfetto: {
        io: 'temessi',
        tu: 'temessi',
        'lui/lei/Lei': 'temesse',
        noi: 'temiamo',
        voi: 'temete',
        loro: 'temono',
      },
    },
    condizionale: {
      io: 'temerei',
      tu: 'temeresti',
      'lui/lei/Lei': 'temerebbe',
      noi: 'temeremmo',
      voi: 'temereste',
      loro: 'temerebbero',
    },
    imperativo: {
      presente: {
        tu: 'temi',
        'lui/lei/Lei': 'tema',
        noi: 'temiamo',
        voi: 'temete',
        loro: 'temano',
      },
      futuro: {
        tu: 'temerai',
        'lui/lei/Lei': 'temerà',
        noi: 'temeremo',
        voi: 'temerete',
        loro: 'temeranno',
      },
    },
  }),
  servire: composeConjugation(avere, {
    infinito: 'servire',
    gerundio: 'servendo',
    participio: { passato: 'servito', presente: 'servente' },
    indicativo: {
      presente: {
        io: 'servo',
        tu: 'servi',
        'lui/lei/Lei': 'serve',
        noi: 'serviamo',
        voi: 'servite',
        loro: 'servono',
      },
      imperfetto: {
        io: 'servivo',
        tu: 'servivi',
        'lui/lei/Lei': 'serviva',
        noi: 'servivamo',
        voi: 'servivate',
        loro: 'servivono',
      },
      'passato remoto': {
        io: 'servii',
        tu: 'servisti',
        'lui/lei/Lei': 'servì',
        noi: 'servimmo',
        voi: 'serviste',
        loro: 'servirono',
      },
      'futuro semplice': {
        io: 'servirò',
        tu: 'servirai',
        'lui/lei/Lei': 'servirà',
        noi: 'serviremo',
        voi: 'servirete',
        loro: 'serviranno',
      },
    },
    congiuntivo: {
      presente: {
        io: 'serva',
        tu: 'serva',
        'lui/lei/Lei': 'serva',
        noi: 'serviamo',
        voi: 'serviate',
        loro: 'servano',
      },
      imperfetto: {
        io: 'servissi',
        tu: 'servissi',
        'lui/lei/Lei': 'servisse',
        noi: 'servissimo',
        voi: 'serviste',
        loro: 'servissero',
      },
    },
    condizionale: {
      io: 'serv',
      tu: 'serv',
      'lui/lei/Lei': 'serv',
      noi: 'serv',
      voi: 'serv',
      loro: 'serv',
    },
    imperativo: {
      presente: {
        tu: 'servi',
        'lui/lei/Lei': 'serva',
        noi: 'serviamo',
        voi: 'servite',
        loro: 'servano',
      },
      futuro: {
        tu: 'servirai',
        'lui/lei/Lei': 'servirà',
        noi: 'serviremo',
        voi: 'servirete',
        loro: 'serviranno',
      },
    },
  }),
}
