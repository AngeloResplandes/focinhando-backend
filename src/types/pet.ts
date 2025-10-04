export type Pet = {
    name: string;
    img: string;
    age: Date;
    city: string;
    state: string;
    sex: string;
    vaccinated: boolean;
    about: string;
    specie: string;
    race: string;
    weight: number;
}

export type PetFilters = {
    sex?: string;
    specie?: string;
    race?: string;
}