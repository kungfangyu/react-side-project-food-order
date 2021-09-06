/*
 * @Date: 2021-08-30 10:07:29
 * @LastEditors: Fane Kung
 * @LastEditTime: 2021-09-05 22:27:00
 * @FilePath: /food-order/src/components/Meals/AvailableMeals.js
 */
import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-308d4-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      
      if(!response.ok){
        throw new Error('有東西出錯了！')
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for(const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
    setHttpError(error.message)
    });

  }, []);
  
  if(isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError) {
    return (
      <section className={classes['meals-error']}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id} 
      key={meal.id} 
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return(
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )

}

export default AvailableMeals;