import { Genre, PEGI } from 'src/movie/entities/movie.entity';

export const moviesData = [
  {
    title: 'Toy Story',
    genres: [Genre.ANIMATION, Genre.COMEDY, Genre.ADVENTURE],
    description:
      "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's room.",
    rating: 95,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg',
    hasOscar: true,
    duration: '1:21:00',
    year: 1995,
    directorData: {
      fullname: 'John Lasseter',
    },
    starsData: [
      { fullname: 'Tom Hanks', hasOscar: true },
      { fullname: 'Tim Allen', hasOscar: false },
    ],
  },
  {
    title: 'The Lion King',
    genres: [Genre.ANIMATION, Genre.DRAMA, Genre.FANTASY],
    description:
      'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    rating: 94,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_FMjpg_UX1000_.jpg',
    hasOscar: true,
    duration: '1:28:00',
    year: 1994,
    directorData: {
      fullname: 'Roger Allers',
    },
    starsData: [
      { fullname: 'Matthew Broderick', hasOscar: false },
      { fullname: 'James Earl Jones', hasOscar: true },
    ],
  },
  {
    title: 'Finding Nemo',
    genres: [Genre.ANIMATION, Genre.COMEDY, Genre.ADVENTURE],
    description:
      'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.',
    rating: 94,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p31890_p_v10_bb.jpg',
    hasOscar: true,
    duration: '1:40:00',
    year: 2003,
    directorData: {
      fullname: 'Andrew Stanton',
    },
    starsData: [
      { fullname: 'Albert Brooks', hasOscar: false },
      { fullname: 'Ellen DeGeneres', hasOscar: false },
    ],
  },
  {
    title: 'WALL·E',
    genres: [Genre.ANIMATION, Genre.SCIENCE_FICTION, Genre.ADVENTURE],
    description:
      'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
    rating: 95,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_FMjpg_UX1000_.jpg',
    hasOscar: true,
    duration: '1:38:00',
    year: 2008,
    directorData: {
      fullname: 'Andrew Stanton',
    },
    starsData: [
      { fullname: 'Ben Burtt', hasOscar: false },
      { fullname: 'Elissa Knight', hasOscar: false },
    ],
  },
  {
    title: 'Frozen',
    genres: [Genre.ANIMATION, Genre.FANTASY, Genre.DRAMA],
    description:
      'When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather.',
    rating: 90,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://cdn.27.ua/sc--media--prod/default/95/0a/fa/950afa91-2fe3-4ed3-9dcd-7aca57a19d12.jpg',
    hasOscar: true,
    duration: '1:42:00',
    year: 2013,
    directorData: {
      fullname: 'Chris Buck',
    },
    starsData: [
      { fullname: 'Kristen Bell', hasOscar: false },
      { fullname: 'Idina Menzel', hasOscar: true },
    ],
  },
  {
    title: 'Shrek',
    genres: [Genre.ANIMATION, Genre.COMEDY, Genre.FANTASY],
    description:
      'A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.',
    rating: 88,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/yj8AAOSwsaFgdFvP/$_57.JPG?set_id=8800005007',
    hasOscar: true,
    duration: '1:30:00',
    year: 2001,
    directorData: {
      fullname: 'Andrew Adamson',
    },
    starsData: [
      { fullname: 'Mike Myers', hasOscar: false },
      { fullname: 'Eddie Murphy', hasOscar: false },
    ],
  },
  {
    title: 'Despicable Me',
    genres: [Genre.ANIMATION, Genre.COMEDY, Genre.SCIENCE_FICTION],
    description:
      'When a criminal mastermind uses a trio of orphan girls as pawns for a grand scheme, he finds their love profoundly changes him.',
    rating: 81,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://m.media-amazon.com/images/I/71M8-CdtLYL._AC_UF894,1000_QL80_.jpg',
    hasOscar: false,
    duration: '1:35:00',
    year: 2010,
    directorData: {
      fullname: 'Pierre Coffin',
    },
    starsData: [
      { fullname: 'Steve Carell', hasOscar: false },
      { fullname: 'Jason Segel', hasOscar: false },
    ],
  },
  {
    title: 'Coco',
    genres: [Genre.ANIMATION, Genre.DRAMA, Genre.FANTASY],
    description:
      'Aspiring musician Miguel, confronted with his family’s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.',
    rating: 92,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_.jpg',
    hasOscar: true,
    duration: '1:45:00',
    year: 2017,
    directorData: {
      fullname: 'Lee Unkrich',
    },
    starsData: [
      { fullname: 'Anthony Gonzalez', hasOscar: false },
      { fullname: 'Gael García Bernal', hasOscar: false },
    ],
  },
  {
    title: 'Up',
    genres: [Genre.ANIMATION, Genre.ADVENTURE, Genre.COMEDY],
    description:
      'Seventy-eight-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.',
    rating: 89,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://m.media-amazon.com/images/I/5182qWG3BFL._AC_UF894,1000_QL80_.jpg',
    hasOscar: true,
    duration: '1:36:00',
    year: 2009,
    directorData: {
      fullname: 'Pete Docter',
    },
    starsData: [
      { fullname: 'Edward Asner', hasOscar: false },
      { fullname: 'Jordan Nagai', hasOscar: false },
    ],
  },
  {
    title: 'Madagascar',
    genres: [Genre.ANIMATION, Genre.COMEDY, Genre.ADVENTURE],
    description:
      'A group of animals who have spent their lives in a New York zoo end up in the jungles of Madagascar, and must adjust to living in the wild.',
    rating: 85,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p87313_p_v10_ax.jpg',
    hasOscar: false,
    duration: '1:26:00',
    year: 2005,
    directorData: {
      fullname: 'Eric Darnell',
    },
    starsData: [
      { fullname: 'Ben Stiller', hasOscar: false },
      { fullname: 'Chris Rock', hasOscar: false },
    ],
  },
  {
    title: 'Kung Fu Panda',
    genres: [Genre.ANIMATION, Genre.COMEDY, Genre.ACTION],
    description:
      'To everyone’s surprise, a clumsy panda is chosen as the Dragon Warrior to defend his homeland from the evil snow leopard.',
    rating: 87,
    pegi: PEGI.SEVEN,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BODJkZTZhMWItMDI3Yy00ZWZlLTk4NjQtOTI1ZjU5NjBjZTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
    hasOscar: false,
    duration: '1:32:00',
    year: 2008,
    directorData: {
      fullname: 'Mark Osborne',
    },
    starsData: [
      { fullname: 'Jack Black', hasOscar: false },
      { fullname: 'Angelina Jolie', hasOscar: true },
    ],
  },
];
