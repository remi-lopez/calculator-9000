<?php 

  class Database 
  {
    private $host = "localhost";
    private $name = "calculator_laplateforme";
    private $username = "root";
    private $pass = "root";

    public $connexion;

    public function startConnexion(){
      $this->connexion = null;
      try{
          $this->connexion = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->name, $this->username, $this->pass);
          $this->connexion->exec("set names utf8");
      }catch(PDOException $exception){
          echo "Database could not be connected: " . $exception->getMessage();
      }
      return $this->connexion;
    }
  }