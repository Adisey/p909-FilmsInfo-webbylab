## Веб-приложение для хранения информации о фильмах.

![внешний вид](https://raw.githubusercontent.com/Adisey/p909-FilmsInfo-webbylab/master/Docs/cards.png)

### Функции, поддерживающие системой:

1. Добавить фильм
2. Удалить фильм
3. Показать информацию о фильме
4. Показать список фильмов отсортированных по названию в алфавитном порядке
   Режим показа: A-карточки, B-Таблица
5. Найти фильм по названию.
6. Найти фильм по имени актера.
7. Импорт фильмов с текстового файла (пример файла прилагается [sample_movies.txt](https://github.com/Adisey/p909-FilmsInfo-webbylab/blob/master/Docs/sample_movies.txt) ).

### Приложение состоит из:

1. Сервера на NodeJS в директории [nodeServer](https://github.com/Adisey/p909-FilmsInfo-webbylab/tree/master/nodeServer)
   Для запуска сервера в директории _nodeServer_ выполнить _**npm start**_
   Сервер отдаёт API на 5000 порту

![API](https://raw.githubusercontent.com/Adisey/p909-FilmsInfo-webbylab/master/Docs/API.png)

2. Облачный MongoDB на [mlab.com](https://mlab.com)
   Запускать не нужно, она работает. :) Ключи от неё не прятал, секретной инфы там нет.

3. Одностраничного приложение на ReactJS директории [webReact](https://github.com/Adisey/p909-FilmsInfo-webbylab/tree/master/webReact)
   Для запуска сервера в директории _webReact_ выполнить _**npm start**_
   В приложении используется:
    - ReactJS
    - Redux
    - Redux-Saga
    - Less
    - Ant Design для рисования кнопочек
    - ... и стандартные вещи из create-react-app для React 16.10

Тестов для приложения пока нет (
Возможно когда то появятся

Само задание - [JavaScript тестовое.pdf](https://github.com/Adisey/p909-FilmsInfo-webbylab/blob/master/Docs/JavaScript%20%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5.pdf)

Макет на коленке [myLayout.png](https://github.com/Adisey/p909-FilmsInfo-webbylab/blob/master/Docs/myLayout.png)
