<?php

header('Content-type: application/json');

echo json_encode($_REQUEST, JSON_PRETTY_PRINT);
