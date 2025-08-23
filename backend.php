<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "edwin";
$pass = "edwinalvarez2002";
$db = "ropa_control";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

// Función para sanitizar y validar datos
function limpiarDato($dato) {
    return htmlspecialchars(strip_tags($dato));
}

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM prendas");
        $rows = [];
        while ($row = $result->fetch_assoc()) $rows[] = $row;
        echo json_encode($rows);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) { 
            echo json_encode(["error"=>"Datos inválidos", "raw" => file_get_contents("php://input")]); 
            exit; 
        }

        // Sanitizar y convertir tipos
        $tipo = limpiarDato($data['tipo']);
        $talla = limpiarDato($data['talla']);
        $precio = floatval($data['precio']);
        $cantidad = intval($data['cantidad']);
        $descripcion = limpiarDato($data['descripcion']);

        $stmt = $conn->prepare("INSERT INTO prendas (tipo, talla, precio, cantidad, descripcion) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdis", $tipo, $talla, $precio, $cantidad, $descripcion);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "id" => $stmt->insert_id]);
        } else {
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['id'])) { 
            echo json_encode(["error"=>"Datos inválidos"]); 
            exit; 
        }

        // Sanitizar y convertir tipos
        $id = intval($data['id']);
        $tipo = limpiarDato($data['tipo']);
        $talla = limpiarDato($data['talla']);
        $precio = floatval($data['precio']);
        $cantidad = intval($data['cantidad']);
        $descripcion = limpiarDato($data['descripcion']);

        $stmt = $conn->prepare("UPDATE prendas SET tipo=?, talla=?, precio=?, cantidad=?, descripcion=? WHERE id=?");
        $stmt->bind_param("ssdisi", $tipo, $talla, $precio, $cantidad, $descripcion, $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) { 
            echo json_encode(["error"=>"ID no especificado"]); 
            exit; 
        }
        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM prendas WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    default:
        echo json_encode(["error"=>"Método no soportado"]);
}

$conn->close();
?>
