import type {Recipe} from './types';

export const spaghettiCarbonara: Recipe = {
    id: 12,
    key: "spaghettiCarbonara",
    pictures: [
        {index: 0, url: "https://blog.giallozafferano.it/allacciateilgrembiule/wp-content/uploads/2018/10/pasta-alla-carbonara5.jpg"},
    ],
    video: "https://youtu.be/_T6jkRvhlkk?si=-ccCZ1p81iW6qR2m",
    i18n: {
        IT: {
            title: "Spaghetti alla Carbonara",
            servings: "4 porzioni",
            ingredients: [
                "150 gr di pancetta",
                "320 gr di spaghetti",
                "6 tuorli",
                "50 gr di pecorino",
            ],
            steps: [
                "Tagliare il guanciale o la pancetta cercando di rimuovere i chicchi di pepe",
                "Mettere la pancetta a rosolare in padella antiaderente a fuoco lento senza olio o burro",
                "Far bollire la pasta",
                "Unire il pecorino con i tuorli e il pepe (opzionale) e rimescolare fino a rimuovere i grumi",
                "Aggiungere qualche cucchiaio di acqua di cottura nel composto (senza esagerare). Quanto basta per amalgamare il tutto",
                "Scolare la pasta in anticipo e metterla in padella con la pancetta e rimescolare fino a cottura ultimata",
                "Togliere la padella dal fuoco",
                "Versare il composto tuorli, pecorino e acqua sulla pasta e rimescolare",
                "Impiattare velocemente onde evitare le uova cuociano formando grumi",
            ],
            notes: "Fare attenzione al tipo di pancetta utilizzata. Rimuovere i chicchi grossi di pepe che potrebbero rendere il sapore troppo amaro e rovinare il piatto. \nAggiungere l'acqua nel composto tuorli e pecorino, serve a renderlo più fluido. \nInoltre, l'acqua tiepida porta a temperatura il composto evitando che faccia i grumi a contatto con la pasta. \nAttenzione al pecorino! La sapidità è importante. Se il pecorino è troppo salato, mescolarlo con il parmigiano.",
        },
        EN: {
            title: "Spaghetti Carbonara",
            servings: "4 servings",
            ingredients: [
                "150 g of pancetta",
                "320 g of spaghetti",
                "6 egg yolks",
                "50 g of pecorino cheese",
            ],
            steps: [
                "Cut the guanciale or pancetta, trying to remove the peppercorns.",
                "Brown the pancetta in a non-stick pan over low heat without oil or butter.",
                "Boil the pasta.",
                "Combine the pecorino with the yolks and (optional) pepper, and mix until smooth.",
                "Add a few tablespoons of cooking water to the mixture (without overdoing it). Just enough to blend everything together.",
                "Drain the pasta early and put it in the pan with the pancetta, stirring until fully cooked.",
                "Remove the pan from the heat.",
                "Pour the yolk, pecorino, and water mixture over the pasta and mix.",
                "Plate quickly to avoid the eggs cooking and forming lumps.",
            ],
            notes: "Be careful with the type of pancetta used. Remove large peppercorns that could make the flavor too bitter and ruin the dish.\nAdding water to the yolk and pecorino mixture makes it more fluid.\nAlso, the warm water brings the mixture to temperature, preventing it from forming lumps when in contact with the pasta.\nWatch out for the pecorino! The saltiness is important. If the pecorino is too salty, mix it with Parmesan.",
        },
        PL: {
            title: "Spaghetti makaron Carbonara",
            servings: "4 porcje",
            ingredients: [
                "150 g pancetty",
                "320 g spaghetti",
                "6 żółtek",
                "50 g sera pecorino",
            ],
            steps: [
                "Pokrój guanciale lub pancettę, starając się usunąć ziarenka pieprzu.",
                "Podsmaż pancettę na nieprzywierającej patelni na małym ogniu, bez oleju czy masła.",
                "Ugotuj makaron.",
                "Połącz pecorino z żółtkami i (opcjonalnie) pieprzem, i mieszaj, aż masa będzie gładka.",
                "Dodaj kilka łyżek wody z gotowania do mieszanki (bez przesady). Tylko tyle, aby wszystko połączyć.",
                "Odcedź makaron wcześniej i włóż go na patelnię z pancettą, mieszając, aż będzie gotowy.",
                "Zdejmij patelnię z ognia.",
                "Wlej mieszankę żółtek, pecorino i wody na makaron i wymieszaj.",
            ],
            notes: "Nałóż na talerze szybko, aby uniknąć ścięcia się jajek i powstawania grudek.\nUważaj na rodzaj używanej pancetty. Usuń duże ziarenka pieprzu, które mogą sprawić, że smak będzie zbyt gorzki i zepsuje danie.\nDodanie wody do mieszanki żółtek i pecorino sprawia, że jest bardziej płynna.\nPonadto ciepła woda podnosi temperaturę mieszanki, zapobiegając powstawaniu grudek w kontakcie z makaronem.\nUważaj na pecorino! Słoność jest ważna. Jeśli pecorino jest zbyt słone, wymieszaj go z parmezanem.",
        },
    },
};
