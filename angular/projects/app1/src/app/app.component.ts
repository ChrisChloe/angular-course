import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public gameInProgress: boolean = true;
  public endType: string;

  public endGame(type: string): void {
    this.gameInProgress = false;
    this.endType = type;
  }

  public restartGame(): void {
    this.gameInProgress = true;
    this.endType = undefined;
  }
}
