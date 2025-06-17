import type { MenuItem, Category, Restaurant } from '../types';

export const restaurant: Restaurant = {
  name: "YumBasket Kitchen",
  description: "Fresh, delicious meals delivered to your doorstep",
  rating: 4.8,
  deliveryTime: "30-45 min",
  deliveryFee: 2.99,
  minOrder: 15,
  image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"
};

export const categories: Category[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemCount: 8
  },
  {
    id: 'burgers',
    name: 'Burgers',
    image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemCount: 6
  },
  {
    id: 'pasta',
    name: 'Pasta',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemCount: 5
  },
  {
    id: 'salads',
    name: 'Salads',
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemCount: 4
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemCount: 6
  },
  {
    id: 'drinks',
    name: 'Drinks',
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=400',
    itemCount: 8
  }
];

export const menuItems: MenuItem[] = [
  // Pizza
  {
    id: 'pizza-1',
    name: 'Margherita Pizza',
    description: 'Classic tomato base with fresh mozzarella and basil',
    price: 16.99,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    ingredients: ['Tomato sauce', 'Mozzarella', 'Fresh basil', 'Olive oil'],
    rating: 4.7,
    preparationTime: 20,
    isVegetarian: true
  },
  {
    id: 'pizza-2',
    name: 'Pepperoni Pizza',
    description: 'Spicy pepperoni with mozzarella cheese and tomato sauce',
    price: 19.99,
    image: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    ingredients: ['Tomato sauce', 'Mozzarella', 'Pepperoni', 'Oregano'],
    rating: 4.8,
    preparationTime: 22,
    isSpicy: true
  },
  {
    id: 'pizza-3',
    name: 'Supreme Pizza',
    description: 'Loaded with pepperoni, sausage, peppers, and mushrooms',
    price: 24.99,
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    ingredients: ['Tomato sauce', 'Mozzarella', 'Pepperoni', 'Sausage', 'Bell peppers', 'Mushrooms', 'Onions'],
    rating: 4.9,
    preparationTime: 25
  },

  // Burgers
  {
    id: 'burger-1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burgers',
    ingredients: ['Beef patty', 'Cheddar cheese', 'Lettuce', 'Tomato', 'Onion', 'Special sauce', 'Brioche bun'],
    rating: 4.6,
    preparationTime: 15
  },
  {
    id: 'burger-2',
    name: 'Chicken Deluxe',
    description: 'Grilled chicken breast with avocado and crispy bacon',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burgers',
    ingredients: ['Grilled chicken', 'Avocado', 'Bacon', 'Lettuce', 'Tomato', 'Mayo', 'Brioche bun'],
    rating: 4.7,
    preparationTime: 18
  },
  {
    id: 'burger-3',
    name: 'Veggie Burger',
    description: 'House-made plant-based patty with fresh vegetables',
    price: 11.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burgers',
    ingredients: ['Plant-based patty', 'Lettuce', 'Tomato', 'Cucumber', 'Onion', 'Hummus', 'Whole grain bun'],
    rating: 4.4,
    preparationTime: 12,
    isVegetarian: true
  },

  // Pasta
  {
    id: 'pasta-1',
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with pancetta, eggs, and parmesan cheese',
    price: 15.99,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pasta',
    ingredients: ['Spaghetti', 'Pancetta', 'Eggs', 'Parmesan', 'Black pepper', 'Olive oil'],
    rating: 4.8,
    preparationTime: 20
  },
  {
    id: 'pasta-2',
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic, chili, and fresh herbs',
    price: 13.99,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pasta',
    ingredients: ['Penne pasta', 'Tomato sauce', 'Garlic', 'Chili flakes', 'Basil', 'Olive oil'],
    rating: 4.5,
    preparationTime: 18,
    isVegetarian: true,
    isSpicy: true
  },

  // Salads
  {
    id: 'salad-1',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'salads',
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
    rating: 4.3,
    preparationTime: 8,
    isVegetarian: true
  },
  {
    id: 'salad-2',
    name: 'Mediterranean Bowl',
    description: 'Mixed greens with feta, olives, tomatoes, and olive oil dressing',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'salads',
    ingredients: ['Mixed greens', 'Feta cheese', 'Kalamata olives', 'Cherry tomatoes', 'Cucumber', 'Red onion', 'Olive oil dressing'],
    rating: 4.6,
    preparationTime: 10,
    isVegetarian: true
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 8.99,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'desserts',
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla ice cream'],
    rating: 4.9,
    preparationTime: 15,
    isVegetarian: true
  },
  {
    id: 'dessert-2',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 7.99,
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'desserts',
    ingredients: ['Ladyfingers', 'Mascarpone', 'Coffee', 'Cocoa powder', 'Sugar', 'Marsala wine'],
    rating: 4.7,
    preparationTime: 5,
    isVegetarian: true
  },

  // Drinks
  {
    id: 'drink-1',
    name: 'Fresh Lemonade',
    description: 'Refreshing house-made lemonade with fresh mint',
    price: 4.99,
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'drinks',
    ingredients: ['Fresh lemons', 'Sugar', 'Water', 'Fresh mint', 'Ice'],
    rating: 4.4,
    preparationTime: 3,
    isVegetarian: true
  },
  {
    id: 'drink-2',
    name: 'Iced Coffee',
    description: 'Cold brew coffee served over ice with your choice of milk',
    price: 3.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'drinks',
    ingredients: ['Cold brew coffee', 'Ice', 'Milk'],
    rating: 4.5,
    preparationTime: 2,
    isVegetarian: true
  }
];