
let skills: string[] = ['Bash', 'Counter Strike', 'Healing'];

skills.push('Fighting');

console.log({ skills });


interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}

const strider: Character = {

    name: 'Strider',
    hp: 100,
    skills: ['Sword', 'Bow', 'Dagger']

}

strider.hometown = 'Rivendell';

console.table(strider);

export { };