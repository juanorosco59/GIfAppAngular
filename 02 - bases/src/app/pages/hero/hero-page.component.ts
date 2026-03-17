import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({

    templateUrl: './hero-page.component.html',
    imports: [UpperCasePipe],
    styles:
        `
    button {padding: 5px; margin-right: 5px;}
    `
})

export class HeroPageComponent {

    name = signal('Ironman');
    age = signal(45);

    //Dependecias computadas (solo lectura a partir de otras señales)

    heroDescription = computed(() => {
        const description = `${this.name()} - ${this.age()} años`;
        return description;
    });

    capitalizedName = computed(() => this.name().toUpperCase());    


    getHeroDescription() {
        return `${this.name()} - ${this.age()} años`;
    }
    changeHero() {
        return this.name.set('Spiderman');
    }
    changeAge() {
        this.age.set(60);
    }

    resetForm() {
        return this.name.set('Ironman'), this.age.set(45);
    }


}