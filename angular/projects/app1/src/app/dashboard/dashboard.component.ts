import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Sentence } from '../shared/sentence.model';
import { SENTENCES } from './sentences-mock';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public sentences: Sentence[] = SENTENCES;
  public instruction: string = 'Traduza a frase:';

  public answer: string = '';
  public round: number = 0;

  public roundSentence: Sentence;
  public progress: number = 0;
  public attempts: number = 3;

  @Output() public endGame: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.updateRound();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Dashboard was destroyed');
  }

  public updateAnswer(answer: Event): void {
    this.answer = ((<HTMLInputElement>answer.target).value);
  }

  public checkAnswer(): void {
    if (this.roundSentence.sentencePtBr === this.answer.toLowerCase()) {
      alert('Right Answer!');
      this.round++;

      this.progress = this.progress + (100 / this.sentences.length);

      if (this.round === 4) {
        this.endGame.emit('victory');
      }

      this.updateRound();
    } else {
      this.attempts--;

      if (this.attempts === -1) {
        this.endGame.emit('defeat');
      }
      this.answer = '';
    }
  }

  public updateRound(): void {
    this.roundSentence = this.sentences[this.round];
    this.answer = '';
  }
}
