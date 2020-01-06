CREATE TABLE recommendres (
  id int PRIMARY KEY,
  genre text,
  title text,
  price text,
  description text,
  recommendrestaurant list<int>,
  images list<int>
);