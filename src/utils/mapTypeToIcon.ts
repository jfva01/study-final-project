import { PokemonType } from "../interfaces/PokemonData";
import { PokemonTypes } from "../constants/types"
import normal from "../assets/types/normal.svg"
import fighting from "../assets/types/fighting.svg"
import flying from "../assets/types/flying.svg"
import poison from "../assets/types/poison.svg"
import ground from "../assets/types/ground.svg"
import rock from "../assets/types/rock.svg"
import bug from "../assets/types/bug.svg"
import ghost from "../assets/types/ghost.svg"
import steel from "../assets/types/steel.svg"
import fire from "../assets/types/fire.svg"
import water from "../assets/types/water.svg"
import grass from "../assets/types/grass.svg"
import electric from "../assets/types/electric.svg"
import psychic from "../assets/types/psychic.svg"
import ice from "../assets/types/ice.svg"
import dragon from "../assets/types/dragon.svg"
import dark from "../assets/types/dark.svg"
import fairy from "../assets/types/fairy.svg"

export const mapTypeToIcon = (type: PokemonType) => {
    switch (type.type.name){
        case PokemonTypes.bug:
            return bug;
        case PokemonTypes.dark:
            return dark;
        case PokemonTypes.dragon:
            return dragon;
        case PokemonTypes.electric:
            return electric;
        case PokemonTypes.fairy:
            return fairy;
        case PokemonTypes.fighting:
            return fighting;
        case PokemonTypes.fire:
            return fire;
        case PokemonTypes.flying:
            return flying;
        case PokemonTypes.ghost:
            return ghost;
        case PokemonTypes.grass:
            return grass;
        case PokemonTypes.ground:
            return ground;
        case PokemonTypes.ice:
            return ice;
        case PokemonTypes.normal:
            return normal;
        case PokemonTypes.poison:
            return poison;
        case PokemonTypes.psychic:
            return psychic;
        case PokemonTypes.rock:
            return rock;
        case PokemonTypes.steel:
            return steel;
        case PokemonTypes.water:
            return water;
        default:
            return "";
    }
}