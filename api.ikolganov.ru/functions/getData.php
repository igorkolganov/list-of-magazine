<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: application/json; charset=utf-8');


$link = mysqli_connect('h005335414.mysql', 'h005335414_mysql', 'HdRr7V-T', 'h005335414_magazine');

if (mysqli_connect_errno()) {
    echo 'Error connection to DB (' . mysqli_connect_errno() . ')' . mysqli_connect_error();
} else {

}

$method = $_SERVER['REQUEST_METHOD'];

$params = explode('/', $_GET['q']);

if ($method === 'GET'){
    if ($params[0] === 'magazine'){
        mysqli_set_charset($link, 'ASCII');

        if ($params[1] !== 'list'){
            $magazines = mysqli_query($link, "SELECT * FROM `magazines` WHERE `magazines`.`id` = $params[1]");
        }else{
            $params[3] ? $limit = (int)$params[3] : $limit = 1000;
            $params[2] ? $offset = ((int)$params[2] * (int)$params[3]) : $offset = 0;

            $magazines = mysqli_query($link, "SELECT * FROM `magazines` LIMIT $limit OFFSET $offset");
        }

        $magazines_list = [];
        while($magazin = mysqli_fetch_assoc($magazines)){
            $magazines_list[] = $magazin;
        }

        if (count($magazines_list) === 0){
            http_response_code(404);
            echo 'Данных с такими параметрами не существует!';
        }else{
            echo json_encode($magazines_list);
        }
    }

    if ($params[0] === 'author'){
        mysqli_set_charset($link, 'ascii');

        if ($params[1] !== 'list'){
            $autors = mysqli_query($link, "SELECT * FROM `autor` WHERE `autor`.`id` = $params[1]");
        }else{
            $params[3] ? $limit = (int)$params[3] : $limit = 1000;
            $params[2] ? $offset = ((int)$params[2] * (int)$params[3]) : $offset = 0;

            $autors = mysqli_query($link, "SELECT * FROM `autor` LIMIT $limit OFFSET $offset");
        }

        $autors_list = [];
        while($autor = mysqli_fetch_assoc($autors)){
            $autors_list[] = $autor;
        }

        if (count($autors_list) === 0){
            http_response_code(404);
            echo 'Данных с такими параметрами не существует!';
        }else{
            echo json_encode($autors_list);
        }
    }

    if($params[0] === 'major'){
        mysqli_set_charset($link, 'ASCII');

        if ($params[1]){
            $records = mysqli_query($link, "SELECT autor.last_name, autor.name, autor.middle_name FROM `autor` JOIN `generall` ON generall.magazine_id = $params[1] AND autor.id = generall.autor_id");
        }else{
            $records = mysqli_query($link, "SELECT * FROM `generall`");
        }

        $records_list = [];
        while($record = mysqli_fetch_assoc($records)){
            $records_list[] = $record;
        }

        if (count($records_list) === 0){
            http_response_code(404);
            echo 'Данных с такими параметрами не существует!';
        }else{
            echo json_encode($records_list);
        }
    }
} else if($method === 'POST'){
    if ($params[0] === 'magazine'){
        switch ($params[1]){
            case 'add':
                $name = $_POST['name'];
                $shname = $_POST['shname'];
                $author = $_POST['author'];
                $image = $_POST['image'];
                $date = $_POST['date'];
                mysqli_query($link, "INSERT INTO `magazines` (`name`, `short_name`, `picture`, `date`) VALUES ('$name', '$shname', '$image', '$date')");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            case 'update':
                $name = $_POST['name'];
                $shname = $_POST['shname'];
                $author = $_POST['author'];
                $image = $_POST['image'];
                $date = $_POST['date'];
                $id = $_POST['id'];
                mysqli_query($link, "UPDATE `magazines` SET `name` = '$name', `short_name` = '$shname', `picture` = '$image', `date` = '$date' WHERE `magazines`.`id` = $id");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            case 'delete':
                $id = $_POST['id'];
                mysqli_query($link, "DELETE FROM `magazines` WHERE `magazines`.`id` = $id");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            default: ''; break;
        }
    }else if($params[0] === 'author'){
        switch ($params[1]){
            case 'add':
                $last_name = $_POST['last_name'];
                $name = $_POST['name'];
                $middle_name = $_POST['middle_name'];
                mysqli_query($link, "INSERT INTO `autor` (`last_name`, `name`, `middle_name`) VALUES ('$last_name', '$name', '$middle_name')");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            case 'update':
                $last_name = $_POST['last_name'];
                $name = $_POST['name'];
                $middle_name = $_POST['middle_name'];
                $id = $_POST['id'];
                mysqli_query($link, "UPDATE `autor` SET `last_name` = '$last_name', `name` = '$name', `middle_name` = '$middle_name' WHERE `autor`.`id` = $id;");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            case 'delete':
                $id = $_POST['id'];
                mysqli_query($link, "DELETE FROM `autor` WHERE `autor`.`id` = $id");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            default: ''; break;
        }
    }else if ($params[0] === 'major'){
        switch ($params[1]){
            case 'add':
                $author_id = $_POST['author_id'];
                $magazine_id = $_POST['magazine_id'];
                mysqli_query($link, "INSERT INTO `generall` (`id`, `magazine_id`, `autor_id`) VALUES (NULL, '$magazine_id', '$author_id')");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            case 'update':
                $author_id = $_POST['author_id'];
                $id = $_POST['id'];
                mysqli_query($link, "UPDATE `generall` SET `autor_id` = '$author_id' WHERE `generall`.`id` = '$id'");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            case 'delete':
                $author_id = $_POST['author_id'];
                $magazine_id = $_POST['magazine_id'];
                //mysqli_query($link, "DELETE FROM `autor` WHERE `autor`.`id` = $id");
                $result = [
                    "status" => true,
                    "magazine_id" => mysqli_insert_id($link),
                ];
                echo json_encode($result);
                ; break;
            default: ''; break;
        }
    }
}