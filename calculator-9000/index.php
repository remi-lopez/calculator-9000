<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Accept: application/json");

include './Database/Database.php';

$objDb = new Database;
$con = $objDb->startConnexion();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
  case "GET":
    $get_all = "SELECT * FROM calcul";
    $stmt = $con->prepare($get_all);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    echo jsonEncode($res);
    break;
  case "POST":
    $request_body = file_get_contents("php://input");
    $data = json_decode($request_body);
    $name = $data->user;
    $operation = $data->operation;
    $result = $data->result;
    $set_calcul = "INSERT INTO calcul (user, operation, result) VALUES ('$name', '$operation', '$result')";
    $stmt = $con->prepare($set_calcul);

    if($stmt->execute()) {
      $response = ['status' => 1, 'message' => 'data added'];
    } else {
      $response = ['status' => 0, 'message' => 'data failed', "data" => $stmt];
    }
    echo json_encode($stmt);
    break;
}

function jsonEncode($var) {
  header('Content-Type: application.json');
  echo json_encode($var, JSON_PRETTY_PRINT);
}

// http://localhost/Calculator-9000/index.php