import {Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              ) {}

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer djeheiweh');


    // return this.httpClient.put('https://foodstore-59d31.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers;
    //   }
    // );

    const req = new HttpRequest('PUT', 'https://foodstore-59d31.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {

    // this.authService.getIdToken();

    // this.httpClient.get<Recipe[]>('https://foodstore-59d31.firebaseio.com/recipes.json?auth=' + token)

    this.httpClient.get<Recipe[]>('https://foodstore-59d31.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
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
