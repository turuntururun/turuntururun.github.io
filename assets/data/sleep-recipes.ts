export interface Recipe {
  picUrl: string
  name: string
  description: string
  ingredients: {
    name: string
    number: number
  }[]
}

const curry: Recipe[] = [
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/fancyapplecurry.png',
    name: 'Fancy Apple Curry',
    description:
      'A simple curry that lets the natural sweetness of its apples shine.',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/grilledtailcurry.png',
    name: 'Grilled Tail Curry',
    description:
      'The tasty tail elevates the flavor of the curry roux to the next level.',
    ingredients: [
      {
        name: 'Slowpoke Tail',
        number: 8,
      },
      {
        name: 'Fiery Herb',
        number: 25,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/solarpowertomatocurry.png',
    name: 'Solar Power Tomato Curry',
    description:
      'A curry made using tomatoes that have turned bright red in the sun.',
    ingredients: [
      {
        name: 'Snoozy Tomato',
        number: 10,
      },
      {
        name: 'Fiery Herb',
        number: 5,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/dreameaterbuttercurry.png',
    name: 'Dream Eater Butter Curry',
    description:
      'The ingredients in this curry all share a connection to deep sleep.',
    ingredients: [
      {
        name: 'Soft Potato',
        number: 18,
      },
      {
        name: 'Snoozy Tomato',
        number: 15,
      },
      {
        name: 'Soothing Cacao',
        number: 12,
      },
      {
        name: 'Moomoo Milk',
        number: 10,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/spicyleekcurry.png',
    name: 'Spicy Leek Curry',
    description:
      'The roasted leeks are fragrant and sweet as fruit, perfectly balancing the spicy roux.',
    ingredients: [
      {
        name: 'Large Leek',
        number: 14,
      },
      {
        name: 'Warming Ginger',
        number: 10,
      },
      {
        name: 'Fiery Herb',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/sporemushroomcurry.png',
    name: 'Spore Mushroom Curry',
    description:
      'A curry that puts you to sleep just as surely as the move Spore.',
    ingredients: [
      {
        name: 'Tasty Mushroom',
        number: 14,
      },
      {
        name: 'Soft Potato',
        number: 9,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/eggbombcurry.png',
    name: 'Egg Bomb Curry',
    description:
      'A curry made with oodles of love. Its ingredients are geared toward kids.',
    ingredients: [
      {
        name: 'Honey',
        number: 12,
      },
      {
        name: 'Fancy Apple',
        number: 11,
      },
      {
        name: 'Fancy Egg',
        number: 8,
      },
      {
        name: 'Soft Potato',
        number: 4,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/heartycheeseburgercurry.png',
    name: 'Hearty Cheeseburger Curry',
    description:
      'This voluminous curry is large enough to astound even a Snorlax.',
    ingredients: [
      {
        name: 'Moomoo Milk',
        number: 8,
      },
      {
        name: 'Bean Sausage',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/softpotatochowder.png',
    name: 'Soft Potato Chowder',
    description:
      'A thick chowder made from potatoes boiled until practically melting.',
    ingredients: [
      {
        name: 'Moomoo Milk',
        number: 10,
      },
      {
        name: 'Soft Potato',
        number: 8,
      },
      {
        name: 'Tasty Mushroom',
        number: 4,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/simplechowder.png',
    name: 'Simple Chowder',
    description:
      'You can really taste the richness of the milk in this simple chowder.',
    ingredients: [
      {
        name: 'Moomoo Milk',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/beanburgercurry.png',
    name: 'Beanburger Curry',
    description:
      'The tender bean patties are the stars of the show in this curry.',
    ingredients: [
      {
        name: 'Bean Sausage',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/mildhoneycurry.png',
    name: 'Mild Honey Curry',
    description:
      'A mild curry containing plenty of honey. Kids gobble it down!',
    ingredients: [
      {
        name: 'Honey',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/ninjacurry.png',
    name: 'Ninja Curry',
    description:
      'This tofu curry is said to have been a favorite dish of ninjas.',
    ingredients: [
      {
        name: 'Greengrass Soybeans',
        number: 24,
      },
      {
        name: 'Bean Sausage',
        number: 9,
      },
      {
        name: 'Large Leek',
        number: 12,
      },
      {
        name: 'Tasty Mushroom',
        number: 5,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/droughtkatsucurry.png',
    name: 'Drought Katsu Curry',
    description: 'The freshly-fried cutlet has a nice sparkle to it.',
    ingredients: [
      {
        name: 'Bean Sausage',
        number: 10,
      },
      {
        name: 'Pure Oil',
        number: 5,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/meltyomelettecurry.png',
    name: 'Melty Omelette Curry',
    description:
      'This curry is topped with a masterfully-cooked omelette that simply melts in the mouth.',
    ingredients: [
      {
        name: 'Fancy Egg',
        number: 10,
      },
      {
        name: 'Snoozy Tomato',
        number: 6,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/bulkupbeancurry.png',
    name: 'Bulk Up Bean Curry',
    description: 'A hearty curry packed with nutrients needed for bulking up.',
    ingredients: [
      {
        name: 'Greengrass Soybeans',
        number: 12,
      },
      {
        name: 'Bean Sausage',
        number: 6,
      },
      {
        name: 'Fiery Herb',
        number: 4,
      },
      {
        name: 'Fancy Egg',
        number: 4,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/limbercornstew.png',
    name: 'Limber Corn Stew',
    description:
      'The milk and corn in this creamy stew have a mild, gentle sweetness.',
    ingredients: [
      {
        name: 'Greengrass Corn',
        number: 14,
      },
      {
        name: 'Moomoo Milk',
        number: 8,
      },
      {
        name: 'Soft Potato',
        number: 8,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/infernocornkeemacurry.png',
    name: 'Inferno Corn Keema Curry',
    description:
      "This curry's infernal spiciness kicks in after the sweetness of the corn.",
    ingredients: [
      {
        name: 'Fiery Herb',
        number: 27,
      },
      {
        name: 'Bean Sausage',
        number: 24,
      },
      {
        name: 'Greengrass Corn',
        number: 14,
      },
      {
        name: 'Warming Ginger',
        number: 12,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/dizzypunchspicycurry.png',
    name: 'Dizzy Punch Spicy Curry',
    description:
      'A rhythmic one-two punch of sweet and spicy flavors attacks your taste buds, finishing with a hint of bitterness.',
    ingredients: [
      {
        name: 'Rousing Coffee',
        number: 11,
      },
      {
        name: 'Fiery Herb',
        number: 11,
      },
      {
        name: 'Honey',
        number: 11,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/hiddenpowerperk-upstew.png',
    name: 'Hidden Power Perk-Up Stew',
    description: 'A chunky tomato stew for a decadent start to your day.',
    ingredients: [
      {
        name: 'Greengrass Soybeans',
        number: 28,
      },
      {
        name: 'Snoozy Tomato',
        number: 25,
      },
      {
        name: 'Tasty Mushroom',
        number: 23,
      },
      {
        name: 'Rousing Coffee',
        number: 16,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/cutsukiyakicurry.png',
    name: 'Cut Sukiyaki Curry',
    description:
      'A salty-sweet curry with a side of roughly cut leeks and a soft-boiled egg.',
    ingredients: [
      {
        name: 'Large Leek',
        number: 27,
      },
      {
        name: 'Bean Sausage',
        number: 26,
      },
      {
        name: 'Honey',
        number: 26,
      },
      {
        name: 'Fancy Egg',
        number: 22,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/roleplaypumpkaboostew.png',
    name: 'Role Play Pumpkaboo Stew',
    description:
      'Not only does this stew look adorable, but its nutritional balance is perfect.',
    ingredients: [
      {
        name: 'Plump Pumpkin',
        number: 10,
      },
      {
        name: 'Bean Sausage',
        number: 16,
      },
      {
        name: 'Soft Potato',
        number: 18,
      },
      {
        name: 'Tasty Mushroom',
        number: 25,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/overgrowavocadogratin.png',
    name: 'Overgrow Avocado Gratin',
    description:
      'The rich white sauce and creamy avocado melt together perfectly.',
    ingredients: [
      {
        name: 'Glossy Avocado',
        number: 22,
      },
      {
        name: 'Soft Potato',
        number: 20,
      },
      {
        name: 'Moomoo Milk',
        number: 41,
      },
      {
        name: 'Pure Oil',
        number: 32,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/greengrasscurrybun.png',
    name: 'Greengrass Curry Bun',
    description:
      'A curry bun packed full of Greengrass Isle\'s goodness. It\'s crispy on the outside, and chunky on the inside.',
    ingredients: [
      {
        name: 'Warming Ginger',
        number: 20
      },
      {
        name: 'Fiery Herb',
        number: 20
      },
      {
        name: 'Greengrass Soybeans',
        number: 8
      },
      {
        name: 'Pure Oil',
        number: 15
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/bouncecurryudon.png',
    name: 'Bounce Curry Udon',
    description:
      'The burst of flavor from the spices bring excitement, but be careful not to splash curry on yourself',
    ingredients: [
      {
        name: 'Warming Ginger',
        number: 39,
      },
      {
        name: 'Tasty Mushroom',
        number: 31,
      },
      {
        name: 'Fiery Herb',
        number: 22,
      },
      {
        name: 'Bean Sausage',
        number: 20,
      },
    ],
  },
]

const salads: Recipe[] = [
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/slowpoketailpeppersalad.png',
    name: 'Slowpoke Tail Pepper Salad',
    description:
      'The mouth-tinglingly spicy pepper highlights the sweetness of the tail.',
    ingredients: [
      {
        name: 'Slowpoke Tail',
        number: 10,
      },
      {
        name: 'Fiery Herb',
        number: 10,
      },
      {
        name: 'Pure Oil',
        number: 15,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/sporemushroomsalad.png',
    name: 'Spore Mushroom Salad',
    description: 'A salad rich in minerals that improve the quality of sleep.',
    ingredients: [
      {
        name: 'Tasty Mushroom',
        number: 17,
      },
      {
        name: 'Snoozy Tomato',
        number: 8,
      },
      {
        name: 'Pure Oil',
        number: 8,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/snowcloakcaesarsalad.png',
    name: 'Snow Cloak Caesar Salad',
    description:
      'A bacon salad topped with a generous snowy sprinkling of cheese.',
    ingredients: [
      {
        name: 'Moomoo Milk',
        number: 10,
      },
      {
        name: 'Bean Sausage',
        number: 6,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/gluttonypotatosalad.png',
    name: 'Gluttony Potato Salad',
    description:
      'This potato salad contains just a hint of flavor from the Fancy Apples.',
    ingredients: [
      {
        name: 'Soft Potato',
        number: 14,
      },
      {
        name: 'Fancy Egg',
        number: 9,
      },
      {
        name: 'Bean Sausage',
        number: 7,
      },
      {
        name: 'Fancy Apple',
        number: 6,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/waterveiltofusalad.png',
    name: 'Water Veil Tofu Salad',
    description: 'A salad topped with wobbly cubes of tofu.',
    ingredients: [
      {
        name: 'Greengrass Soybeans',
        number: 15,
      },
      {
        name: 'Snoozy Tomato',
        number: 9,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/superpowerextremesalad.png',
    name: 'Superpower Extreme Salad',
    description:
      'A hefty salad that provides all your daily nutrients at once.',
    ingredients: [
      {
        name: 'Bean Sausage',
        number: 9,
      },
      {
        name: 'Warming Ginger',
        number: 6,
      },
      {
        name: 'Fancy Egg',
        number: 5,
      },
      {
        name: 'Soft Potato',
        number: 3,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/beanhamsalad.png',
    name: 'Bean Ham Salad',
    description: 'This simple salad features ham made from Bean Sausages.',
    ingredients: [
      {
        name: 'Bean Sausage',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/snoozytomatosalad.png',
    name: 'Snoozy Tomato Salad',
    description:
      'The Snoozy Tomatoes in this simple salad are a great aid for sleep.',
    ingredients: [
      {
        name: 'Snoozy Tomato',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/moomoocapresesalad.png',
    name: 'Moomoo Caprese Salad',
    description:
      'A basic salad containing only cheese, tomatoes, and a splash of oil.',
    ingredients: [
      {
        name: 'Moomoo Milk',
        number: 12,
      },
      {
        name: 'Snoozy Tomato',
        number: 6,
      },
      {
        name: 'Pure Oil',
        number: 5,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/contrarychocolatemeatsalad.png',
    name: 'Contrary Chocolate Meat Salad',
    description:
      'The savory sauce and sweet chocolate sauce let you enjoy a mix of flavors.',
    ingredients: [
      {
        name: 'Soothing Cacao',
        number: 14,
      },
      {
        name: 'Bean Sausage',
        number: 9,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/overheatgingersalad.png',
    name: 'Overheat Ginger Salad',
    description:
      "This salad's special ginger dressing warms you through and through.",
    ingredients: [
      {
        name: 'Fiery Herb',
        number: 17,
      },
      {
        name: 'Warming Ginger',
        number: 10,
      },
      {
        name: 'Snoozy Tomato',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/fancyapplesalad.png',
    name: 'Fancy Apple Salad',
    description: 'A simple salad accentuated by a mashed apple dressing.',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/immunityleeksalad.png',
    name: 'Immunity Leek Salad',
    description:
      'The crisp leeks in this salad do wonders for the immune system.',
    ingredients: [
      {
        name: 'Large Leek',
        number: 10,
      },
      {
        name: 'Warming Ginger',
        number: 5,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/dazzlingapplecheesesalad.png',
    name: 'Dazzling Apple Cheese Salad',
    description:
      'The simple seasoning keeps the focus on the sublime pairing of ingredients.',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 15,
      },
      {
        name: 'Moomoo Milk',
        number: 5,
      },
      {
        name: 'Pure Oil',
        number: 3,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/ninjasalad.png',
    name: 'Ninja Salad',
    description:
      "Ninjas cannot resist the flavor of this tofu salad. It's eaten in a flash!",
    ingredients: [
      {
        name: 'Large Leek',
        number: 15,
      },
      {
        name: 'Greengrass Soybeans',
        number: 19,
      },
      {
        name: 'Tasty Mushroom',
        number: 12,
      },
      {
        name: 'Warming Ginger',
        number: 11,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/heatwavetofusalad.png',
    name: 'Heat Wave Tofu Salad',
    description: 'A tofu salad covered in bright red spicy sauce.',
    ingredients: [
      {
        name: 'Greengrass Soybeans',
        number: 10,
      },
      {
        name: 'Fiery Herb',
        number: 6,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/greengrasssalad.png',
    name: 'Greengrass Salad',
    description:
      'A salad made of fresh vegetables - all harvested on Greengrass Isle.',
    ingredients: [
      {
        name: 'Pure Oil',
        number: 22,
      },
      {
        name: 'Greengrass Corn',
        number: 17,
      },
      {
        name: 'Snoozy Tomato',
        number: 14,
      },
      {
        name: 'Soft Potato',
        number: 9,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/calmmindfruitsalad.png',
    name: 'Calm Mind Fruit Salad',
    description:
      'The refreshing sweetness of this fruit salad soothes the soul.',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 21,
      },
      {
        name: 'Honey',
        number: 16,
      },
      {
        name: 'Greengrass Corn',
        number: 12,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/furyattackcornsalad.png',
    name: 'Fury Attack Corn Salad',
    description:
      'When eating this salad, you should start by attacking the mound of corn.',
    ingredients: [
      {
        name: 'Greengrass Corn',
        number: 9,
      },
      {
        name: 'Pure Oil',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/crosschopsalad.png',
    name: 'Cross Chop Salad',
    description: 'A chopped salad delicately made with fine repeated cuts.',
    ingredients: [
      {
        name: 'Fancy Egg',
        number: 20,
      },
      {
        name: 'Bean Sausage',
        number: 15,
      },
      {
        name: 'Greengrass Corn',
        number: 11,
      },
      {
        name: 'Snoozy Tomato',
        number: 10,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/defiantcoffee-dressedsalad.png',
    name: 'Defiant Coffee-Dressed Salad',
    description:
      'A chef worked defiantly to perfect this salad with coffee dressing, tweaking the recipe again and again.',
    ingredients: [
      {
        name: 'Rousing Coffee',
        number: 28,
      },
      {
        name: 'Bean Sausage',
        number: 28,
      },
      {
        name: 'Pure Oil',
        number: 22,
      },
      {
        name: 'Soft Potato',
        number: 22,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/petalblizzardlayeredsalad.png',
    name: 'Petal Blizzard Layered Salad',
    description:
      'The sprinkling of egg-fluffy like flower petals-has a delicate texture.',
    ingredients: [
      {
        name: 'Fancy Egg',
        number: 25,
      },
      {
        name: 'Pure Oil',
        number: 17,
      },
      {
        name: 'Soft Potato',
        number: 15,
      },
      {
        name: 'Bean Sausage',
        number: 12,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/appleacidyogurt-dressedsalad.png',
    name: 'Apple Acid Yogurt-Dressed Salad',
    description:
      'The acidity of the apple vinegar and the yogurt make this salad temptingly tasty.',
    ingredients: [
      {
        name: 'Fancy Egg',
        number: 35,
      },
      {
        name: 'Fancy Apple',
        number: 28,
      },
      {
        name: 'Snoozy Tomato',
        number: 23,
      },
      {
        name: 'Moomoo Milk',
        number: 18,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/lusciousavocadosalad.png',
    name: 'Luscious Avocado Salad',
    description: 'The soft ingredients gently crumble in your mouth.',
    ingredients: [
      {
        name: 'Glossy Avocado',
        number: 14,
      },
      {
        name: 'Greengrass Soybeans',
        number: 18,
      },
      {
        name: 'Pure Oil',
        number: 10,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/bulldozeguacamoleandchips.png',
    name: 'Bulldoze Guacamole and Chips',
    description:
      "You can enjoy the crunchy, aromatic corn chips with the dip's smooth texture.",
    ingredients: [
      {
        name: 'Glossy Avocado',
        number: 28,
      },
      {
        name: 'Greengrass Corn',
        number: 25,
      },
      {
        name: 'Fiery Herb',
        number: 30,
      },
      {
        name: 'Greengrass Soybeans',
        number: 22,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/scaldchunkysalad.png',
    name: 'Scald Chunky Salad',
    description:
      'Slowly steamed, thick-cut ingredients form a warm salad with a fluffy texture.',
    ingredients: [
      {
        name: 'Plump Pumpkin',
        number: 20,
      },
      {
        name: 'Soft Potato',
        number: 30,
      },
      {
        name: 'Greengrass Corn',
        number: 18,
      },
      {
        name: 'Tasty Mushroom',
        number: 27,
      },
    ],
  },
]

const desserts: Recipe[] = [
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/fluffysweetpotatoes.png',
    name: 'Fluffy Sweet Potatoes',
    description:
      "These perfectly ripe potatoes don't rely on honey to deliver a sweet kick.",
    ingredients: [
      {
        name: 'Soft Potato',
        number: 9,
      },
      {
        name: 'Moomoo Milk',
        number: 5,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/steadfastgingercookies.png',
    name: 'Steadfast Ginger Cookies',
    description:
      'These cookies give you the power to tackle hardships without crumbling.',
    ingredients: [
      {
        name: 'Honey',
        number: 14,
      },
      {
        name: 'Warming Ginger',
        number: 12,
      },
      {
        name: 'Soothing Cacao',
        number: 5,
      },
      {
        name: 'Fancy Egg',
        number: 4,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/fancyapplejuice.png',
    name: 'Fancy Apple Juice',
    description: 'A rich juice containing only the very best apples.',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/craftsodapop.png',
    name: 'Craft Soda Pop',
    description: 'A highly carbonated artisan soda.',
    ingredients: [
      {
        name: 'Honey',
        number: 9,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/embergingertea.png',
    name: 'Ember Ginger Tea',
    description:
      'Apples have been added to the spicy ginger, helping the tea go down easily.',
    ingredients: [
      {
        name: 'Warming Ginger',
        number: 9,
      },
      {
        name: 'Fancy Apple',
        number: 7,
      },
    ],
  },
  {
    picUrl:
      "https://www.serebii.net/pokemonsleep/meals/jigglypuff'sfruityflan.png",
    name: "Jigglypuff's Fruity Flan",
    description: "A very special flan that's as springy as a balloon.",
    ingredients: [
      {
        name: 'Honey',
        number: 20,
      },
      {
        name: 'Fancy Egg',
        number: 15,
      },
      {
        name: 'Moomoo Milk',
        number: 10,
      },
      {
        name: 'Fancy Apple',
        number: 10,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/lovelykisssmoothie.png',
    name: 'Lovely Kiss Smoothie',
    description:
      'A relaxing drink that soothes your weariness and envelops you in sleep.',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 11,
      },
      {
        name: 'Moomoo Milk',
        number: 9,
      },
      {
        name: 'Honey',
        number: 7,
      },
      {
        name: 'Soothing Cacao',
        number: 8,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/luckychantapplepie.png',
    name: 'Lucky Chant Apple Pie',
    description: 'The chunky pieces of apple in this pie are lucky finds!',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 12,
      },
      {
        name: 'Moomoo Milk',
        number: 4,
      },
    ],
  },
  {
    picUrl:
      "https://www.serebii.net/pokemonsleep/meals/neroli'srestorativetea.png",
    name: "Neroli's Restorative Tea",
    description: 'A special restorative tea made by Professor Neroli.',
    ingredients: [
      {
        name: 'Warming Ginger',
        number: 11,
      },
      {
        name: 'Fancy Apple',
        number: 15,
      },
      {
        name: 'Tasty Mushroom',
        number: 9,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/sweetscentchocolatecake.png',
    name: 'Sweet Scent Chocolate Cake',
    description:
      "Neither people nor Pokémon can resist the lure of this cake's sweet aroma.",
    ingredients: [
      {
        name: 'Honey',
        number: 9,
      },
      {
        name: 'Soothing Cacao',
        number: 8,
      },
      {
        name: 'Moomoo Milk',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/warmmoomoomilk.png',
    name: 'Warm Moomoo Milk',
    description:
      'Moomoo Milk that has been heated to further draw out its sweetness.',
    ingredients: [
      {
        name: 'Moomoo Milk',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/cloudninesoycake.png',
    name: 'Cloud Nine Soy Cake',
    description: 'A soy cake with a nice, light texture.',
    ingredients: [
      {
        name: 'Fancy Egg',
        number: 8,
      },
      {
        name: 'Greengrass Soybeans',
        number: 7,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/hustleproteinsmoothie.png',
    name: 'Hustle Protein Smoothie',
    description:
      'A glass of this sweet smoothie goes down a treat after a training session.',
    ingredients: [
      {
        name: 'Greengrass Soybeans',
        number: 15,
      },
      {
        name: 'Soothing Cacao',
        number: 8,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/stalwartvegetablejuice.png',
    name: 'Stalwart Vegetable Juice',
    description: 'An easy-to-make juice with natural sweet and sour flavors.',
    ingredients: [
      {
        name: 'Snoozy Tomato',
        number: 9,
      },
      {
        name: 'Fancy Apple',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/bigmalasada.png',
    name: 'Big Malasada',
    description:
      'A special fried bread made using a recipe from the Alola region.',
    ingredients: [
      {
        name: 'Pure Oil',
        number: 10,
      },
      {
        name: 'Moomoo Milk',
        number: 7,
      },
      {
        name: 'Honey',
        number: 6,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/hugepowersoydonuts.png',
    name: 'Huge Power Soy Donuts',
    description:
      "Soy donuts fried to crisp perfection. They're bodybuilders' friends.",
    ingredients: [
      {
        name: 'Pure Oil',
        number: 12,
      },
      {
        name: 'Greengrass Soybeans',
        number: 16,
      },
      {
        name: 'Soothing Cacao',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/explosionpopcorn.png',
    name: 'Explosion Popcorn',
    description:
      'Prepared in an instant with enough heat to cause an explosion',
    ingredients: [
      {
        name: 'Greengrass Corn',
        number: 15,
      },
      {
        name: 'Pure Oil',
        number: 14,
      },
      {
        name: 'Moomoo Milk',
        number: 7,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/teatimecornscones.png',
    name: 'Teatime Corn Scones',
    description:
      'This flaky scone is most delicious when paired with an equal amount of apple ginger jam.',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 20,
      },
      {
        name: 'Warming Ginger',
        number: 20,
      },
      {
        name: 'Greengrass Corn',
        number: 18,
      },
      {
        name: 'Moomoo Milk',
        number: 9,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/petaldancechocolatetart.png',
    name: 'Petal Dance Chocolate Tart',
    description: 'A tricksy tart that scatters flower petals when you eat it',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 11,
      },
      {
        name: 'Soothing Cacao',
        number: 11,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/flowergiftmacarons.png',
    name: 'Flower Gift Macarons',
    description:
      'These macarons are perfect to give as a gift - they always make the recipient smile',
    ingredients: [
      {
        name: 'Soothing Cacao',
        number: 25,
      },
      {
        name: 'Fancy Egg',
        number: 25,
      },
      {
        name: 'Honey',
        number: 17,
      },
      {
        name: 'Moomoo Milk',
        number: 10,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/earlybirdcoffeejelly.png',
    name: 'Early Bird Coffee Jelly',
    description:
      'This slightly bitter coffee jelly can help wake you up faster.',
    ingredients: [
      {
        name: 'Rousing Coffee',
        number: 16,
      },
      {
        name: 'Moomoo Milk',
        number: 14,
      },
      {
        name: 'Honey',
        number: 12,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/zingzapspicedcola.png',
    name: 'Zing Zap Spiced Cola',
    description: 'This cola’s strong bite will jolt you awake!',
    ingredients: [
      {
        name: 'Fancy Apple',
        number: 35,
      },
      {
        name: 'Warming Ginger',
        number: 20,
      },
      {
        name: 'Large Leek',
        number: 20,
      },
      {
        name: 'Rousing Coffee',
        number: 12,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/moldbreakercorntiramisu.png',
    name: 'Mold Breaker Corn Tiramisu',
    description:
      'This tiramisu recipe defies precedent by relying on the sweetness of corn alone.',
    ingredients: [
      {
        name: 'Rousing Coffee',
        number: 14,
      },
      {
        name: 'Greengrass Corn',
        number: 14,
      },
      {
        name: 'Moomoo Milk',
        number: 12,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/clodsireeclair.png',
    name: 'Clodsire Eclair',
    description:
      'A generously filled, bitter éclair with a cheery Clodsire design.',
    ingredients: [
      {
        name: 'Soothing Cacao',
        number: 30,
      },
      {
        name: 'Moomoo Milk',
        number: 26,
      },
      {
        name: 'Rousing Coffee',
        number: 24,
      },
      {
        name: 'Honey',
        number: 22,
      },
    ],
  },
  {
    picUrl: 'https://www.serebii.net/pokemonsleep/meals/scaryfacepancakes.png',
    name: 'Scary Face Pancakes',
    description:
      'The sweetness from the vegetables is nice, but making eye contact with this dish will give you a fright.',
    ingredients: [
      {
        name: 'Plump Pumpkin',
        number: 18,
      },
      {
        name: 'Fancy Egg',
        number: 24,
      },
      {
        name: 'Honey',
        number: 32,
      },
      {
        name: 'Snoozy Tomato',
        number: 29,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/leaftornadosmoothie.png',
    name: 'Leaf Tornado Smoothie',
    description:
      "This dish is full of nutrients thanks to the sun. It's perfect for breakfast too!",
    ingredients: [
      {
        name: 'Glossy Avocado',
        number: 18,
      },
      {
        name: 'Snoozy Tomato',
        number: 16,
      },
      {
        name: 'Moomoo Milk',
        number: 14,
      },
    ],
  },
  {
    picUrl:
      'https://www.serebii.net/pokemonsleep/meals/honeygatherchocolatewaffles.png',
    name: 'Honey Gather Chocolate Waffles',
    description:
      'A sweet treat made with bitter batter mixed with cacao, covered in heaps of honey.',
    ingredients: [
      {
        name: 'Honey',
        number: 38,
      },
      {
        name: 'Greengrass Corn',
        number: 28,
      },
      {
        name: 'Pure Oil',
        number: 28,
      },
      {
        name: 'Soothing Cacao',
        number: 21,
      },
    ],
  },
]

export const recipes: { [key: string]: Recipe[] } = { curry, salads, desserts }

export const ingredientList: string[] = [
  'Bean Sausage',
  'Fancy Apple',
  'Fancy Egg',
  'Fiery Herb',
  'Glossy Avocado',
  'Greengrass Corn',
  'Greengrass Soybeans',
  'Honey',
  'Large Leek',
  'Moomoo Milk',
  'Plump Pumpkin',
  'Pure Oil',
  'Rousing Coffee',
  'Slowpoke Tail',
  'Snoozy Tomato',
  'Soft Potato',
  'Soothing Cacao',
  'Tasty Mushroom',
  'Warming Ginger',
]
