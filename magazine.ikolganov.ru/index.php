<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="styles/index.css">

    <script src="ajax/jquery351.min.js"></script>

    <title>Тестовое задание компания: СКАИД</title>
</head>
<body>

<div class="buttons-block">
    <button name="show-magazines">Журналы</button>
    <button name="show-authors">Авторы</button>
</div>

<p id="show-all-data"></p>

<?include "elements/magazines.php"?>
<?include "elements/authors.php"?>


<script src="js/getData.js"></script>
<script src="js/downloadimg.js"></script>
</body>
</html>