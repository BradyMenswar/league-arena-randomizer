import { Component } from '@angular/core';
import champData from '../assets/Champions/championFull.json';
import itemData from '../assets/Items/item.json'
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'league-arena-randomizer';
  champ_name = '';
  champ_id ='';
  champ_title = '';

  spell_name = '';
  spell_bind = '';

  starting_id = '';
  starting_name ='';

  boots_id = '';
  boots_name ='';

  mythic_id='';
  mythic_name='';

  item_build : any;

  augment_1 = '';
  augment_2 = '';
  augment_3 = '';
  augment_4 = '';

  getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
  }

  shuffleArray(array : any) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
  roll() {
    this.rollChampion();
    this.rollItems();
  }

  copyImage() {
    html2canvas(document.querySelector(".quick-info") as HTMLElement, {backgroundColor: "transparent"}).then(canvas => {
      canvas.toBlob(function(blob : any) {
        navigator.clipboard
          .write([
            new ClipboardItem(
              Object.defineProperty({}, blob.type, {
                value: blob,
                enumerable: true
              })
            )
          ])
      
        })

    })
  }

  rollChampion() {
    let num_champs = Object.keys(champData.data).length;
    let random_index = this.getRandomInt(num_champs);
    let random_spell = this.getRandomInt(3);

    let champ = champData.data[Object.keys(champData.data)[random_index] as keyof typeof champData.data];
    this.champ_name = champ.name;
    this.champ_id = champ.id;
    this.champ_title = champ.title;
    this.spell_name = champ.spells[random_spell].id;
    switch(random_spell) {
      case 0: 
        this.spell_bind = "Q";
        break;
      case 1: 
        this.spell_bind = "W";
        break;
      case 2: 
        this.spell_bind = "E";
        break;
    }
  }

  rollItems() {
    let filteredItems = Object.values(itemData.data).filter((item:any) => 
      item.maps["30"] === true && item.description.includes("ornnBonus") === false
    )

    let starting_items = filteredItems.filter((item:any) => 
      item.tags.includes("Lane") === true && item.tags.includes("Vision") === false && item.gold.base === 1000)

    let boots = filteredItems.filter((item:any) => 
      item.tags.includes("Boots")
    )

    let mythics = filteredItems.filter((item:any) =>
      Object.keys(item).includes("into") === true
    )

    let items = filteredItems.filter((item :any) => 
    item.gold.purchasable === true && item.gold.base > 1000 && starting_items.includes(item) === false && boots.includes(item) === false && mythics.includes(item) === false)
    
    
    let random_starting = this.getRandomInt(starting_items.length);
    let random_boots = this.getRandomInt(boots.length);
    let random_mythic = this.getRandomInt(mythics.length);

    this.starting_name = starting_items[random_starting].name;
    this.starting_id = starting_items[random_starting].image.full;
    this.boots_name = boots[random_boots].name;
    this.boots_id = boots[random_boots].image.full;
    this.mythic_name = mythics[random_mythic].name;
    this.mythic_id = mythics[random_mythic].image.full;

    
    this.shuffleArray(items);
    this.item_build = items.slice(0,5);
    
    let directions = ["L", "C", "R"];
    this.augment_1 = directions[this.getRandomInt(3)];
    this.augment_2 = directions[this.getRandomInt(3)];
    this.augment_3 = directions[this.getRandomInt(3)];
    this.augment_4 = directions[this.getRandomInt(3)];
  }
}
