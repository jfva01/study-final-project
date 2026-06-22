export interface PokemonType{
    slot: number,
    type:{
        name: string,
        url: string
    }
}

export interface PokemonSprites{
    front_default?: string,
    back_default?: string,
    front_shiny?: string,
    back_shiny?: string
}

export interface PokemonData{
    name: string,
    id: number,
    height: number,
    weight: number,
    types: PokemonType[],
    sprites: PokemonSprites
}