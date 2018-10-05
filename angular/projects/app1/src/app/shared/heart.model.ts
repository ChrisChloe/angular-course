export class Heart {
  constructor(
    public full: boolean,
    public urlFullHeart: string = '/assets/full-heart.png',
    public urlEmptyHeart: string = '/assets/empty-heart.png'
    ){}

    public showHeart() :string {
      if(this.full) {
        return this.urlFullHeart;
      } else {
        return this.urlEmptyHeart;
      }
    }
}
