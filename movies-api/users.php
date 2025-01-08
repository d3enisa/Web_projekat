<?php
$servername = "localhost";  
$username = "root";         
$password = "";             
$dbname = "movies_db";      


$conn = new mysqli($servername, $username, $password, $dbname);

// Provjera konekcije
if ($conn->connect_error) {
    die("Povezivanje s bazom nije uspjelo: " . $conn->connect_error);
}

header("Content-Type: application/json"); 
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Prepoznavanje HTTP metode
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET': // DOHVAT (READ)
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "SELECT * FROM users WHERE id=$id";
        } else {
            $sql = "SELECT * FROM users";
        }

        $result = $conn->query($sql);
        $users = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
        }
        echo json_encode($users);
        break;

    case 'POST': // KREIRANJE (CREATE)
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->ime) && !empty($data->prezime) && !empty($data->korisnicko_ime) && !empty($data->email) && !empty($data->sifra)) {
            $ime = $conn->real_escape_string($data->ime);
            $prezime = $conn->real_escape_string($data->prezime);
            $korisnicko_ime = $conn->real_escape_string($data->korisnicko_ime);
            $email = $conn->real_escape_string($data->email);
            $sifra = $conn->real_escape_string($data->sifra);

            $sql = "INSERT INTO users (ime, prezime, korisnicko_ime, email, sifra) 
                    VALUES ('$ime', '$prezime', '$korisnicko_ime', '$email', '$sifra')";

            if ($conn->query($sql)) {
                echo json_encode(["message" => "Korisnik uspješno dodan."]);
            } else {
                echo json_encode(["error" => "Greška pri dodavanju korisnika."]);
            }
        } else {
            echo json_encode(["error" => "Svi podaci su obavezni."]);
        }
        break;

    case 'PUT': // AŽURIRANJE (UPDATE)
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->id) && !empty($data->ime) && !empty($data->prezime) && !empty($data->korisnicko_ime) && !empty($data->email) && !empty($data->sifra)) {
            $id = intval($data->id);
            $ime = $conn->real_escape_string($data->ime);
            $prezime = $conn->real_escape_string($data->prezime);
            $korisnicko_ime = $conn->real_escape_string($data->korisnicko_ime);
            $email = $conn->real_escape_string($data->email);
            $sifra = $conn->real_escape_string($data->sifra);

            $sql = "UPDATE users 
                    SET ime='$ime', prezime='$prezime', korisnicko_ime='$korisnicko_ime', email='$email', sifra='$sifra' 
                    WHERE id=$id";

            if ($conn->query($sql)) {
                echo json_encode(["message" => "Korisnik uspješno ažuriran."]);
            } else {
                echo json_encode(["error" => "Greška pri ažuriranju korisnika."]);
            }
        } else {
            echo json_encode(["error" => "Svi podaci su obavezni."]);
        }
        break;

    case 'DELETE': // BRISANJE (DELETE)
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->id)) {
            $id = intval($data->id);
            $sql = "DELETE FROM users WHERE id=$id";

            if ($conn->query($sql)) {
                echo json_encode(["message" => "Korisnik uspješno obrisan."]);
            } else {
                echo json_encode(["error" => "Greška pri brisanju korisnika."]);
            }
        } else {
            echo json_encode(["error" => "ID korisnika je obavezan."]);
        }
        break;

    default:
        echo json_encode(["error" => "Nevažeća HTTP metoda."]);
        break;
}


$conn->close();
?>

