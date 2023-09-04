import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@shared/interfaces/data.interface';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = 'myFavorites';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();
  charactersFav = [];
  constructor(
    private toastrSvc: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initStorage();
  }

  initStorage() {
    if (this.platformId === 'browser') {
      localStorage.setItem('mykey', 'localStorage working');
      this.initialStorage();
    }
  }

  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentsFav = this.getFavoritesCharacters();
    const found = !!currentsFav.find((fav: Character) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      if (this.platformId === 'browser') {
        localStorage.setItem(
          MY_FAVORITES,
          JSON.stringify([...currentsFav, character])
        );
      }

      this.charactersFavSubject.next([...currentsFav, character]);
      this.toastrSvc.success(
        `${character.name} added to favorite`,
        'RickAndMortyAPP'
      );
    } catch (error) {
      console.log('Error saving localStorage', error);
      this.toastrSvc.error(
        `Error saving localStorage ${error} `,
        'RickAndMortyAPP'
      );
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      const characters = currentsFav.filter((item) => item.id !== id);
      if (this.platformId === 'browser') {
        localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      }
      this.charactersFavSubject.next([...characters]);
      this.toastrSvc.warning(`Removed from favorite`, 'RickAndMortyAPP');
    } catch (error) {
      console.log('Error removing localStorage', error);
      this.toastrSvc.error(
        `Error removing localStorage ${error} `,
        'RickAndMortyAPP'
      );
    }
  }

  getFavoritesCharacters(): any {
    try {
      if (this.platformId === 'browser') {
        this.charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
      }
      this.charactersFavSubject.next(this.charactersFav);
      return this.charactersFav;
    } catch (error) {
      console.log('Error getting favorites from localStorage', error);
    }
  }

  clearStorage(): void {
    try {
      if (this.platformId === 'browser') {
        localStorage.clear();
      }
    } catch (error) {
      console.log('Error cleaning localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));
    if (this.platformId === 'browser' && !currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesCharacters();
  }
}
