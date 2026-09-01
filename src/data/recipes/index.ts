import type {Recipe} from './types';
import {besciamellaLeggera} from './BesciamellaLeggera';
import {budinoAllaVanigliaConMaizena} from './BudinoAllaVanigliaConMaizena';
import {ciambellaBolognese} from './CiambellaBolognese';
import {cremaMascarpone} from './CremaMascarpone';
import {crescenteBolognese} from './CrescenteBolognese';
import {crocchetteDiPatateEProsciutto} from './CrocchetteDiPatateEProsciutto';
import {crostataMarmellata} from './CrostataMarmellata';
import {focacciaConPomodorini} from './FocacciaConPomodorini';
import {focacciaInPadella} from './FocacciaInPadella';
import {muffinAllaBananaECioccolato} from './MuffinAllaBananaECioccolato';
import {paccheriCremaBurrataGuanciale} from './PaccheriCremaBurrataGuanciale';
import {pancakeAllaBanana} from './PancakeAllaBanana';
import {paniniNapoletani} from './PaniniNapoletani';
import {pannaCottaFragole} from './PannaCottaFragole';
import {pastaRaguBianco} from './PastaRaguBianco';
import {patateAlFornoPerfette} from './PatateAlFornoPerfette';
import {piadinaRomagnola} from './PiadinaRomagnola';
import {polloAlPesto} from './PolloAlPesto';
import {rigatoniCipolla} from './RigatoniCipolla';
import {risottoZafferano} from './RisottoZafferano';
import {spaghettiCarbonara} from './SpaghettiCarbonara';
import {spaghettiConBurrataECompostaDiCipolle} from './SpaghettiConBurrataECompostaDiCipolle';
import {tagliataConRucolaEPomodorini} from './TagliataConRucolaEPomodorini';
import {tiramisu} from './Tiramisu';
import {trotaPatateForno} from './TrotaPatateForno';
import {zabaione} from './Zabaione';
import {zucchineRipiene} from './ZucchineRipiene';

export * from './types';

export const recipes: readonly Recipe[] = [
    budinoAllaVanigliaConMaizena,
    cremaMascarpone,
    crostataMarmellata,
    paccheriCremaBurrataGuanciale,
    pancakeAllaBanana,
    paniniNapoletani,
    pannaCottaFragole,
    risottoZafferano,
    tiramisu,
    zucchineRipiene,
    zabaione,
    ciambellaBolognese,
    spaghettiCarbonara,
    crescenteBolognese,
    focacciaConPomodorini,
    piadinaRomagnola,
    spaghettiConBurrataECompostaDiCipolle,
    polloAlPesto,
    crocchetteDiPatateEProsciutto,
    muffinAllaBananaECioccolato,
    tagliataConRucolaEPomodorini,
    pastaRaguBianco,
    rigatoniCipolla,
    trotaPatateForno,
    patateAlFornoPerfette,
    besciamellaLeggera,
    focacciaInPadella,
];

export const recipesById: ReadonlyMap<number, Recipe> = new Map(recipes.map(r => [r.id, r]));
