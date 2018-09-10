import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';


export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is a simply test',
      'https://www.goodfreephotos.com/albums/food/fried-and-yummy-food.jpg',
      [
        new Ingredient ('Meat', 1),
        new Ingredient ('French Fries', 20)

      ]
    ),
    new Recipe(
      'Another one',
      'This is yummy',
      'https://www.goodfreephotos.com/albums/food/fried-and-yummy-food.jpg',
      [
        new Ingredient ('Buns', 2),
        new Ingredient ('Meat', 1)

      ]
    ),

  ];
  constructor() {}

  setRecipes (recipes: Recipe[]) {
    this.recipes = recipes;

  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

