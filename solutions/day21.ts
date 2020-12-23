import { intersection, isEmpty, some, sortBy, union } from "lodash";

export async function solution1(input: string): Promise<number> {
  const lines = input.split('\n').filter(l => !isEmpty(l));

  const foods: { ingredients: string[], alergens: string[] }[] = [];
  const allergens: { [key: string]: string[] } = {};
  let allIngredients: string[] = [];

  lines.forEach(line => {
    const lineParts = /(.+) \(contains (.+)\)/.exec(line)!;
    const foodIngredients = lineParts[1].split(' ');
    const foodAllergens = lineParts[2].split(', ');

    foods.push({ ingredients: foodIngredients, alergens: foodAllergens});

    allIngredients = union(allIngredients, foodIngredients);

    // For each allergen, find all ingredients that _might_ match
    foodAllergens.forEach(allergen => {
      if (allergen in allergens) {
        allergens[allergen] = intersection(allergens[allergen], foodIngredients);
      } else {
        allergens[allergen] = foodIngredients;
      }
    });
  });

  // For each allergen with exactly one ingredient, remove ingredient from all other allergens
  while (some(allergens, (ingredients) => ingredients.length > 1)) {
    for ( const [allergen, ingredients] of Object.entries(allergens)) {
      if (ingredients.length === 1) {
        for(const [_allergen, _ingredients] of Object.entries(allergens)) {
          if (_allergen !== allergen) {
            const index = _ingredients.indexOf(ingredients[0]);

            if (index >= 0) {
              _ingredients.splice(index, 1);
            }
          }
        }
      }
    }
  }

  const safeIngredients: string[] = [];

  allIngredients.forEach(ingredient => {
    let isSafe = true;

    for (const [allergen, ingredients] of Object.entries(allergens)) {
      if (ingredients.length > 1) {
        console.log(`'${allergen}' is in more that one ingredient: ${ingredients} `);
      }

      if (ingredients.length === 1 && ingredient === ingredients[0]) {
        isSafe = false;
        break;
      }
    }

    if (isSafe) {
      safeIngredients.push(ingredient);
    }
  });

  let count = 0;

  for (const food of foods) {
    count += intersection(food.ingredients, safeIngredients).length;
  }

  return count;
}

export async function solution2(input: string): Promise<number> {
  const lines = input.split('\n').filter(l => !isEmpty(l));

  const allergens: { [key: string]: string[] } = {};

  lines.forEach(line => {
    const lineParts = /(.+) \(contains (.+)\)/.exec(line)!;
    const foodIngredients = lineParts[1].split(' ');
    const foodAllergens = lineParts[2].split(', ');

    // For each allergen, find all ingredients that _might_ match
    foodAllergens.forEach(allergen => {
      if (allergen in allergens) {
        allergens[allergen] = intersection(allergens[allergen], foodIngredients);
      } else {
        allergens[allergen] = foodIngredients;
      }
    });
  });

  // For each allergen with exactly one ingredient, remove ingredient from all other allergens
  while (some(allergens, (ingredients) => ingredients.length > 1)) {
    for ( const [allergen, ingredients] of Object.entries(allergens)) {
      if (ingredients.length === 1) {
        for(const [_allergen, _ingredients] of Object.entries(allergens)) {
          if (_allergen !== allergen) {
            const index = _ingredients.indexOf(ingredients[0]);

            if (index >= 0) {
              _ingredients.splice(index, 1);
            }
          }
        }
      }
    }
  }

  let sortedAllergens = sortBy(Object.entries(allergens), [0]);
  console.log(sortedAllergens.map(([_, ingredients]) => ingredients[0]).join(','));
  return 0;
}
