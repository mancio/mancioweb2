import type {Recipe} from './types';

export const pancakeAllaBanana: Recipe = {
    id: 4,
    key: "pancakeAllaBanana",
    pictures: [
        {index: 0, url: "https://www.giallozafferano.it/images/174-17475/Pancake-alla-banana_450x300.jpg"},
    ],
    i18n: {
        IT: {
            title: "Pancake alla banana",
            servings: "Porzione per 1 persona",
            ingredients: [
                "Punta di 1 cucchiaino di lievito per dolci",
                "2 cucchiai colmi di farina",
                "1 uovo ",
                "1 banana",
                "Olio di oliva",
            ],
            steps: [
                "In un piatto schiaccia una banana con una forchetta e lascia un pezzo di banana da parte per la guarnizione finale",
                "Unisci un uovo, la farina e il lievito e mischia",
                "Ungi con un po' d'olio una padella e asciuga con la carta assorbente l'olio in eccesso o in alternativa usa l'olio spray",
                "Metti il composto sulla padella calda disponendolo a forma di cerchio",
                "Cuoci coperto da entrambi i lati il pancake ricordando di girarlo",
            ],
            notes: "Puoi servire il pancake con frutta di stagione, yogurt e sciroppo d'acero",
        },
        EN: {
            title: "Banana Pancake",
            servings: "Portion for 1 person",
            ingredients: [
                "Pinch of 1 teaspoon baking powder",
                "2 heaping tablespoons of flour",
                "1 egg",
                "1 banana",
                "Olive oil",
            ],
            steps: [
                "On a plate, mash a banana with a fork and set aside a piece of banana for the final garnish",
                "Combine an egg, flour, and baking powder and mix",
                "Grease a pan with a bit of oil and blot excess oil with a paper towel, or alternatively, use spray oil",
                "Pour the mixture onto the hot pan, forming it into a circle",
                "Cook the pancake covered on both sides, remembering to flip it",
            ],
            notes: "You can serve the pancake with seasonal fruit, yogurt, and maple syrup",
        },
        PL: {
            title: "Bananowy naleśnik",
            servings: "Porcja dla 1 osoby",
            ingredients: [
                "Szczypta proszku do pieczenia",
                "2 pełne łyżki mąki",
                "1 jajko",
                "1 banan",
                "Oliwa z oliwek",
            ],
            steps: [
                "Na talerzu rozgnieć banana widelcem i odłóż kawałek banana na końcową dekorację",
                "Połącz jajko, mąkę i proszek do pieczenia i wymieszaj",
                "Posmaruj patelnię odrobiną oliwy i usuń nadmiar papierowym ręcznikiem, ewentualnie użyj sprayu olejowego",
                "Umieść mieszankę na gorącej patelni formując okrągły kształt",
                "Smaż naleśnik pod przykryciem z obu stron, pamiętając o przewróceniu",
            ],
            notes: "Naleśnik można podać z sezonowymi owocami, jogurtem i syropem klonowym",
        },
    },
};
