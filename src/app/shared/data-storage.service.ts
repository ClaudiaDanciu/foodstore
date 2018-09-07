import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getIdToken();
    // const headers = new HttpHeaders().set('Authorization', 'Bearer djeheiweh');


    // return this.httpClient.put('https://foodstore-59d31.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers;
    //   }
    // );

    const req = new HttpRequest()
  }

  getRecipes() {
    const token = this.authService.getIdToken();

    // this.authService.getIdToken();

    // this.httpClient.get<Recipe[]>('https://foodstore-59d31.firebaseio.com/recipes.json?auth=' + token)

    this.httpClient.get<Recipe[]>('https://foodstore-59d31.firebaseio.com/recipes.json?auth=' + token), {
      observe: 'body',
      responseType: 'json'
    }
      .map(
        (recipes) => {
          console.log(recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
          // return [];
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
