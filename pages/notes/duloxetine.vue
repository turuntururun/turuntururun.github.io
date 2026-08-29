<script setup lang="ts">
import { parseMarkdown } from 'comark'
import { MarkdownDocument } from '@comark/vue'

//language=markdown
const english = `
  # Duloxetine

  ## Description

  A medication used to treat depression, anxiety, nerve pain, and incontinence.

  ### Therapeutic Categories

  - Antidepressive Agents Indicated for Depression
  - Serotonin and Noradrenaline Reuptake Inhibitors

  ### Mechanism of Action

  - Sodium-dependent serotonin transporterInhibitor
  - Sodium-dependent noradrenaline transporterInhibitor

  ### Summary

  Duloxetine is a serotonin norepinephrine reuptake inhibitor used to treat generalized anxiety disorder, neuropathic
  pain, osteoarthritis, and stress incontinence.

  ### Background

  Duloxetine is a dual serotonin and norepinephrine reuptake inhibitor.

  It was originally discovered in 1993 and developed by Eli Lilly and Company as LY248686. Duloxetine first received
  approval from the FDA in August, 2004 as Cymbalta for the treatment of Major Depressive Disorder. It has since
  received approval for a variety of indications including the treatment of neuropathic pain, Generalized Anxiety
  disorder, osteoarthritis, and stress incontinence. Duloxetine continues to be investigated for the treatment of pain
  in cancer, surgery, and more.

  ## Structure

  TODO: Insert SVG

  ## Indication

  - Indicated for:

    1) Management of Major Depressive Disorder.
    2) Management of Generalized Anxiety Disorder.
    3) Management of diabetic peripheral neuropathy.
    4) Management of fibromyalgia.
    5) Management of chronic musculoskeletal pain.
    6) Management of osteoarthritis of the knee in adults.
    7) Management of chronic lower back pain in adults.
    8) Management of stress urinary incontinence in adult women.

  - Off-label uses include:

    1) Management of chemotherapy-induced peripheral neuropathy.
    2) Management of stress urinary incontinence in adult men after prostatectomy until recovery is complete.

  ## Pharmacodynamics

  Duloxetine, through increasing serotonin and norepinephrine concentrations in Onuf's nucleus, enhances glutamatergic
  activation of the pudendal motor nerve which innervates the external urethral sphinter. This enhanced signaling allows
  for stronger contraction. Increased contraction of this sphincter increases the pressure needed to produce an
  incontinence episode in stress urinary incontinence. Duloxetine has been shown to improve Patient Global Impression of
  Improvement and Incontinence Quality of Life scores. It has also been shown to reduce the median incontinence episode
  frequency at doses of 40 and 80 mg.

  Action at the dorsal horn of the spinal cord allows duloxetine to strengthen the the serotonergic and adrenergic
  pathways involved in descending inhibition of pain. This results in an increased threshold of activation necessary to
  transmit painful stimuli to the brain and effective relief of pain, particularly in neuropathic pain. Pain relief has
  been noted in a variety of painful conditions including diabetic peripheral neuropathy, fibromyalgia, and
  osteoarthritis using a range of pain assessment surveys.

  While duloxetine has been shown to be effective in both animal models of mood disorders and in clinical trials for the
  treatment of these disorders in humans, the broad scope of its pharmacodynamic effects on mood regulation in the brain
  has yet to be explained.

  Increased blood pressure is a common side effect with duloxetine due to vasoconstriction mediated by the intended
  increase in norepinephrine signaling.

  ## Mechanism of action

  Duloxetine is a potent inhibitor of neuronal serotonin and norepinephrine reuptake and a less potent inhibitor of
  dopamine reuptake. Duloxetine has no significant affinity for dopaminergic, adrenergic, cholinergic, histaminergic,
  opioid, glutamate, and GABA receptors.

  Action on the external urinary sphincter is mediated via duloxetine's CNS effects. Increased serotonin and
  norepinephrine concentrations in Onuf's nucleus leads to increased activation of 5-HT₂, 5-HT₃, and α₁ adrenergic
  receptors. 5-HT₂ and α₁ are both G<sub>q</sub> coupled and their activation increases the activity of the inositol
  trisphosphate/phospholipase C (IP₃/PLC) pathway. This pathway leads to release of intracellular calcium stores,
  increasing intracellular calcium concentrations, and facilitating neuronal excitability. 5-HT₃ functions as a
  ligand-gated sodium channel which allows sodium to flow into the neuron when activated. Increased flow of sodium into
  the neuron contributes to depolarization and activation of voltage gated channels involved in action potential
  generation. The combined action of these three receptors contributes to increased excitability of the pudendal motor
  nerve in response to glutamate.

  Also related to duloxetine's action at the spinal cord is its modulation of pain. Increasing the concentration of
  serotonin and norepinephrine in the dorsal horn of the spinal cord increases descending inhibition of pain through
  activation of 5-HT1A, 5-HT1B, 5-HT1D, 5-HT₂, 5-HT₃, α₁-adrenergic, and α₂-adrenergic receptors. 5-HT₂, 5-HT₃, and
  α₁-adrenergic mediate neuronal activation as described above. The activated neuron in this case is the GABAergic
  inhibitory interneuron which synapses onto the nociceptive projection neuron to inhibit the transmission of painful
  stimuli to the brain. The 5-HT1 and α₂ receptors are Gi/Go coupled and their activation leads to increased potassium
  current through inward rectifier channels and decreased adenylyl cyclase/protein kinase A signaling which contributes
  to neuronal inhibition. These inhibitory receptors are present on the projection neuron itself as well as the dorsal
  root ganglion which precedes it and serves to directly suppress the transmission of painful stimuli.

  The mechanisms involved in duloxetine's benefits in depression and anxiety have not been fully elucidated.
  Dysfunctional serotonin and norepinephrine signaling are thought to be involved and increases in the availability of
  these neurotransmitters at the synaptic cleft thought to mediate a therapeutic effect. It is postulated that the
  involvement of serotonin and norepinephrine in area responsible for emotional modulation such as the limbic system
  contributes to the effects in mood disorders specifically but this has yet to be confirmed.

  Duloxetine's hypertensive effect is related to its intended pharmacological effect. Increased availability of
  norepinephrine leads to activation of adrenergic receptors on the vascular endothelium. Since the action of α₁
  receptors predominates, vasoconstriction results as the G<sub>q</sub> coupled receptor mediates calcium release from the
  sarcoplasmic reticulum to facilitate smooth muscle contraction.

  | Target                                     | Actions    | Organism |
    |--------------------------------------------|------------|----------|
  | Sodium-dependent serotonin transporter     | inhibitor  | Humans   |
  | Sodium-dependent noradrenaline transporter | inhibitor  | Humans   |
  | Sodium-dependent dopamine transporter      | inhibitor  | Humans   |

  ## Absorption

  Duloxetine is incompletely absorbed with a mean bioavailability of 50% although there is wide variability in the range
  of 30-80%.The population absorption constant (ka) is 0.168 h-1.The molecule is susceptible to hydrolysis in acidic
  environments necessitating the use of an enteric coating to protect it during transit through the stomach. This
  creates a 2 hour lag time from administration to the start of absorption. The T<sub>max</sub> is 6 hours including the lag time.
  Administering duloxetine with food 3 hour delay in T<sub>max</sub> along with an 10% decrease in AUC. Similarly, administering
  the dose at bedtime produces a 4 hour delay and 18% decrease in AUC with a 29% reduction in Cmax. These are attributed
  to delayed gastric emptying in both cases but are not expected to impact therapy to a clinically significant degree.

  ## Route of elimination

  About 70% of duloxetine is excreted in the urine mainly as conjugated metabolites. Another 20% is present in the feces
  as the parent drug, 4-hydroxy metabolite, and an uncharacterized metabolite. Biliary secretion is thought to play a
  role due to timeline of fecal excretion exceeding the time expected of normal GI transit.

  ## Half-life

  Mean of 12 h with a range of 8-17.

  ## Toxicity

  ### Overdose

  Fatalities have been reported with doses of 1000mg involving both mixed drugs as well as duloxetine alone. Signs and
  symptoms of overdose include: somnolence, coma, serotonin syndrome, seizure, syncope, hypo- or hypertension,
  tachycardia, and vomiting. No antidote exists and the drug is unlikely to be cleared by hemodialysis. Supportive care
  is recommended along with activated charcoal and gastric lavage to reduce absorption. If serotonin syndrome occurs
  specific treatment such as temperature control or cyproheptadine may be initiated.

  ### Carcinogenicity & Mutagenicity

  Increased incidence of hepatocellular carcinomas and adenomas were reported in female mice fed 140 mg/kg/day
  duloxetine for 2 years, equivalent to 6 times the maximum recommended human dose (MRHD). No effect was reported with
  doses of 50mg/kg/day (2 time MRHD) in females or 100 mg/kg/day in males (4 times MRHD). Similar investigation in rats
  produced no carcinogenicity at doses of 27 mg/kg/day (2 times MRHD)in females and 36 mg/kg/day in males (4 times
  MRHD).

  No mutagenicity, clastogenicity, induction of sister chromatid exchange, or genotoxicity has been observed in
  toxicology investigations.

  ### Reproductive Toxicity

  Neither male or female rats displayed adverse reproductive effects at doses up to 45 mg/kg/day (4 times MRHD).

  ### Lactation

  An estimated 25% of plasma duloxetine appears in breast milk with the estimated daily infant dose being 0.14% of the
  maternal dose. Breast milk concentrations have been observed to peak 3 hours after administration.

  ## Drug Interactions

  This information should not be interpreted without the help of a healthcare provider. If you believe you are
  experiencing an interaction, contact a healthcare provider immediately. The absence of an interaction does not
  necessarily mean no interactions exist.

  ## Food Interactions

  Avoid excessive or chronic alcohol consumption. Alcohol increases the risk of liver toxicity.

  Take with or without food. Do not sprinkle the contents of the capsules on food/liquids.

`

//language=markdown
const spanish = `
# Duloxetina

## Descripción
Medicamento utilizado para tratar la depresión, la ansiedad, el dolor neuropático y la incontinencia.

### Categorías terapéuticas
- Antidepresivos indicados para la depresión
- Inhibidores de la recaptación de serotonina y noradrenalina

### Mecanismo de acción
- Inhibidor del transportador de serotonina dependiente de sodio
- Inhibidor del transportador de noradrenalina dependiente de sodio

### Resumen
La duloxetina es un inhibidor de la recaptación de serotonina y noradrenalina utilizado para tratar el trastorno de ansiedad generalizada, el dolor neuropático, la osteoartritis y la incontinencia de esfuerzo.

### Antecedentes
La duloxetina es un inhibidor dual de la recaptación de serotonina y noradrenalina.
Fue descubierta originalmente en 1993 y desarrollada por Eli Lilly and Company bajo la denominación LY248686. La duloxetina recibió por primera vez la aprobación de la FDA en agosto de 2004, comercializada como Cymbalta, para el tratamiento del trastorno depresivo mayor. Desde entonces, ha obtenido autorización para diversas indicaciones, incluyendo el tratamiento del dolor neuropático, el trastorno de ansiedad generalizada, la osteoartritis y la incontinencia de esfuerzo. La duloxetina continúa siendo objeto de investigación para el tratamiento del dolor asociado al cáncer, a intervenciones quirúrgicas y más.

## Estructura

![uhhninij](/svg/duloxetine.svg)


## Indicaciones

- Indicada para:

1) Tratamiento del trastorno depresivo mayor.
2) Tratamiento del trastorno de ansiedad generalizada.
3) Tratamiento de la neuropatía periférica diabética.
4) Tratamiento de la fibromialgia.
5) Tratamiento del dolor musculoesquelético crónico.
6) Tratamiento de la osteoartritis de rodilla en adultos.
7) Tratamiento del dolor lumbar crónico en adultos.
8) Tratamiento de la incontinencia urinaria de esfuerzo en mujeres adultas.

- Los usos fuera de indicación (*off-label*) incluyen:

1) Tratamiento de la neuropatía periférica inducida por quimioterapia.
2) Tratamiento de la incontinencia urinaria de esfuerzo en hombres adultos tras una prostatectomía hasta lograr la recuperación completa.

## Farmacodinámica
La duloxetina, al aumentar las concentraciones de serotonina y noradrenalina en el núcleo de Onuf, potencia
la activación glutamatérgica del nervio motor pudendo, que inerva el esfínter uretral externo. Esta señalización
potenciada permite una contracción más fuerte. El aumento de la contracción de este esfínter incrementa la presión necesaria para
provocar un episodio de incontinencia en casos de incontinencia urinaria de esfuerzo. Se ha demostrado que la duloxetina mejora las puntuaciones de la Impresión Global de Mejoría del Paciente y de la Calidad de Vida relacionada con la Incontinencia. También se ha demostrado que reduce la mediana de la frecuencia de episodios de incontinencia a dosis de 40 y 80 mg.

La acción a nivel del asta dorsal de la médula espinal permite a la duloxetina potenciar las vías serotoninérgicas y adrenérgicas implicadas en la inhibición descendente del dolor. Esto da lugar a un aumento del umbral de activación necesario para transmitir estímulos dolorosos al cerebro y a un alivio eficaz del dolor, particularmente en el caso del dolor neuropático. Se ha observado alivio del dolor en diversas afecciones dolorosas, como la neuropatía periférica diabética, la fibromialgia y la osteoartritis, mediante el uso de diversos cuestionarios de evaluación del dolor.

Si bien se ha demostrado que la duloxetina es eficaz tanto en modelos animales de trastornos del estado de ánimo como en ensayos clínicos para el tratamiento de estos trastornos en humanos, aún no se ha explicado el amplio espectro de sus efectos farmacodinámicos sobre la regulación del estado de ánimo en el cerebro.

El aumento de la presión arterial es un efecto secundario frecuente de la duloxetina, debido a la vasoconstricción mediada por el incremento intencional de la señalización de noradrenalina.

## Mecanismo de acción
La duloxetina es un potente inhibidor de la recaptación neuronal de serotonina y noradrenalina, y un inhibidor menos potente de la recaptación de dopamina. La duloxetina no presenta una afinidad significativa por los receptores dopaminérgicos, adrenérgicos, colinérgicos, histaminérgicos, opioides, de glutamato ni GABA.

La acción sobre el esfínter uretral externo está mediada por los efectos de la duloxetina en el sistema nervioso central (SNC). El aumento de las concentraciones de serotonina y noradrenalina en el núcleo de Onuf provoca una mayor activación de los receptores 5-HT₂, 5-HT₃ y adrenérgicos α₁. Tanto los receptores 5-HT₂ como los α₁ están acoplados a proteínas G<sub>q</sub>, y su activación incrementa la actividad de la vía del inositol trifosfato/fosfolipasa C (IP₃/PLC). Esta vía conduce a la liberación de las reservas intracelulares de calcio, lo que aumenta las concentraciones intracelulares de este ion y facilita la excitabilidad neuronal. El receptor 5-HT₃ funciona como un canal de sodio activado por ligando que permite la entrada de sodio en la neurona cuando se activa.
El mayor flujo de sodio hacia el interior de la neurona contribuye a la despolarización y a la activación de los canales dependientes de voltaje que participan en la generación del potencial de acción. La acción combinada de estos tres receptores contribuye a aumentar la excitabilidad del nervio motor pudendo en respuesta al glutamato.

También relacionada con la acción de la duloxetina en la médula espinal se encuentra su modulación del dolor. El aumento de la concentración de serotonina y noradrenalina en el asta dorsal de la médula espinal incrementa la inhibición descendente del dolor mediante la activación de los receptores 5-HT<sub>1A</sub>, 5-HT<sub>1B</sub>, 5-HT<sub>1D</sub>, 5-HT₂, 5-HT₃, α₁-adrenérgicos y α₂-adrenérgicos. Los receptores 5-HT₂, 5-HT₃ y α₁-adrenérgicos intervienen en la activación neuronal tal como se ha descrito anteriormente.
Las neuronas activadas en este caso son las interneuronas inhibitorias GABAérgica, que establecen sinapsis con las neuronas de proyección nociceptiva para inhibir la transmisión de estímulos dolorosos hacia el cerebro.
Los receptores 5-HT₁ y α₂ están acoplados a proteínas G<sub>i</sub>/G<sub>o</sub> y su activación provoca un aumento de la corriente de potasio a través de canales rectificadores de entrada y una disminución de la señalización de la adenilato ciclasa/proteína cinasa A, lo que contribuye a la inhibición neuronal. Estos receptores inhibitorios están presentes tanto en la propia neurona de proyección como en el ganglio de la raíz dorsal que la precede y sirve para suprimir directamente la transmisión de estímulos dolorosos.

No se ha esclarecido completamente el mecanismo por el cual la duloxetina muestra beneficios frente a la depresión y la ansiedad.
La hipótesis asume una alteración sobre la señalización de la serotonina y la noradrenalina, y que el aumento de la disponibilidad de estos neurotransmisores en la hendidura sináptica produce el efecto terapéutico.
Se postula que la participación de la serotonina y la noradrenalina en áreas responsables de la modulación emocional, como el sistema límbico, contribuye específicamente a los efectos sobre los trastornos del estado de ánimo, aunque esto aún no se ha confirmado.

El efecto hipertensor de la duloxetina está relacionado con su efecto farmacológico esperado. La mayor disponibilidad de noradrenalina conduce a la activación de receptores adrenérgicos en el endotelio vascular. Dado que predomina la acción de los receptores α₁, se produce vasoconstricción a la vez que el receptor acoplado a proteínas G<sub>q</sub> señaliza la liberación de calcio desde el retículo sarcoplásmico para facilitar la contracción del músculo liso.

| Blanco                                              | Acciones  | Organismo |
|-----------------------------------------------------|-----------|-----------|
| Transportador de serotonina dependiente de sodio    | Inhibidor | Humanos   |
| Transportador de noradrenalina dependiente de sodio | Inhibidor | Humanos   |
| Transportador de dopamina dependiente de sodio      | Inhibidor | Humanos   |

## Absorción

La duloxetina se absorbe de forma incompleta, con una biodisponibilidad media del 50%, aunque existe una amplia variabilidad en el rango del 30 al 80%.
La constante de absorción poblacional (ka) es de 0.168 h⁻¹. La molécula es susceptible a la hidrólisis en medios ácidos, por lo que requiere una
cubierta entérica para protegerla durante su tránsito por el estómago. Esto genera un tiempo de latencia de 2 horas desde la administración hasta
el inicio de la absorción. El T<sub>max</sub> (momento de mayor concentración sérica) es de 6 horas, incluyendo dicho tiempo de latencia. La administración
de duloxetina con alimentos provoca un retraso de 3 horas en el T<sub>max</sub> y una disminución del 10% en el ABC (exposición total al fármaco). Del mismo
modo, administrar la dosis antes de acostarse produce un retraso de 4 horas y una disminución del 18% en el ABC, con una reducción del 29% en la C<sub>max</sub>
(concentración sérica máxima). Estos efectos se atribuyen al retraso en el vaciado gástrico en ambos casos, pero no se espera que afecten al tratamiento de
manera clínicamente significativa.

## Vía de eliminación

Aproximadamente el 70% de la duloxetina se excreta por la orina, principalmente en forma de metabolitos conjugados. Otro 20% se encuentra en las heces como fármaco inalterado, metabolito 4-hidroxilado y un metabolito no caracterizado. Se considera que la secreción biliar desempeña un papel relevante, dado que el tiempo de excreción fecal supera lo esperado para un tránsito gastrointestinal normal.

## Vida media

Media de 12 horas, con un rango de 8 a 17 horas.

## Toxicidad

### Sobredosis

Se han notificado casos mortales con dosis de 1000 mg, tanto en situaciones de polifarmacia como con duloxetina sola. Los signos y síntomas de sobredosis incluyen: somnolencia, coma, síndrome serotoninérgico, convulsiones, síncope, hipotensión o hipertensión, taquicardia y vómitos. No existe antídoto y es poco probable que el fármaco se elimine mediante hemodiálisis. Se recomienda tratamiento de soporte, junto con la administración de carbón activado y lavado gástrico para reducir la absorción. Si se presenta síndrome serotoninérgico, puede iniciarse un tratamiento específico, como el control de la temperatura corporal o la administración de ciproheptadina.

### Carcinogenicidad y mutagenicidad

Se ha observado una mayor incidencia de carcinomas y adenomas hepatocelulares en ratones hembra tratados con 140 mg/kg/día de duloxetina durante 2 años, dosis equivalente a 6 veces la dosis máxima recomendada en humanos (DMRH). No se observaron efectos con dosis de 50 mg/kg/día (2 veces la DMRH) en hembras o de 100 mg/kg/día en machos (4 veces la DMRH). Un estudio similar en ratas no mostró carcinogenicidad a dosis de 27 mg/kg/día (2 veces la DMRH) en hembras y de 36 mg/kg/día en machos (4 veces la DMRH).

No se ha observado mutagenicidad, clastogenicidad, inducción de intercambio de cromátidas hermanas ni genotoxicidad en los estudios toxicológicos.

### Toxicidad reproductiva

Ni las ratas macho ni las hembras mostraron efectos adversos en la reproducción con dosis de hasta 45 mg/kg/día (4 veces la DMRH).

### Lactancia

Se estima que el 25 % de la duloxetina plasmática pasa a la leche materna; la dosis diaria estimada para el lactante es del 0.14 % de la dosis materna. Se ha observado que las concentraciones en la leche materna alcanzan su valor máximo 3 horas después de la administración.

## Interacciones con alimentos

Evite el consumo excesivo o crónico de alcohol. El alcohol aumenta el riesgo de toxicidad hepática.

Puede tomarse con o sin alimentos. No espolvoree el contenido de las cápsulas sobre alimentos o líquidos.

`
const document = await parseMarkdown(spanish)

useHead({
  title: document.frontmatter.title,
  meta: [{ name: 'description', content: document.frontmatter.description }],
})
</script>

<template>
  <article>
    <MarkdownDocument :value="document" />
  </article>
</template>

<style scoped></style>
