import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  public card: any[] = [];
  public number: number[] = [];
  public cards: number[] = [];
  public counter: number = 0;
  public cardMount: number;
  public decision: string;
  public isChecking: boolean = false;

  ngOnInit(): void {
    this.cardMount = parseInt(prompt('CUANTAS CARTAS QUIERES? (NÚMERO PAR-MAXIMO 24)'));
    while (this.cardMount % 2 == 1 || this.cardMount == 0 || isNaN(this.cardMount)) {
      this.cardMount = parseInt(prompt('NÚMERO PAR!'));
    }
    if (this.cardMount >= 24) this.cardMount = 24;
    for (let w = 1; w <= this.cardMount / 2; w++) {
      this.cards.push(w);
      this.cards.push(w);
    }
    let i, j, k;
    for (i = this.cards.length; i; i--) {
      j = Math.floor(Math.random() * i);
      k = this.cards[i - 1];
      this.cards[i - 1] = this.cards[j];
      this.cards[j] = k;
    }
  }

  getId(event, e) {
    if (!this.isChecking) {
      this.card.push(e.path[0]);
      e.path[0].classList.add('clicked');
      this.number.push(event);
      if (this.number.length == 2) {
        this.isChecking = true;
        setTimeout(() => {
          if (this.number[0] == this.number[1]) {
            this.card[0].classList.add('got');
            this.card[1].classList.add('got');
            this.decision = 'Bien!';
            this.counter++;
            this.card = []
          } else {
            this.card[0].classList.remove('clicked');
            this.card[1].classList.remove('clicked');
            this.decision = 'Sigue intentándolo';
            this.card = [];
          }
          this.number = [];
          if (this.counter == this.cardMount / 2) {
            this.decision = 'Muy bien terminaste!';
            let result = confirm('Volver a jugar?');
            if (result) {
              location.assign('htttp://castillodeoropesa.es/cards.html');
            }
          }
          this.isChecking = false;
        }, 400);
      }
    }
  }


}
