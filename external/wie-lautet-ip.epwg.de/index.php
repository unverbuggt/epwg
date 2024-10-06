<?php
if (strpos($_SERVER['HTTP_REFERER'], 'https://epwg.de') !== 0
    && strpos($_SERVER['HTTP_REFERER'], 'https://tauri.localhost') !== 0) {
   //header('Access-Control-Allow-Origin: *', false);
   //echo($_SERVER['HTTP_REFERER']);
   exit();
}

require '../geoip/geoip2.phar';
use GeoIp2\Database\Reader;

if (strpos($_SERVER['HTTP_REFERER'], 'https://tauri.localhost') === 0) {
   header('Access-Control-Allow-Origin: https://tauri.localhost', false);
} else {
   header('Access-Control-Allow-Origin: https://epwg.de', false);
}

if ( isset($_GET['city']) or isset($_GET['asn']) ) {
   if ( isset($_GET['city']) ) {
      $reader = new Reader('../geoip/GeoLite2-City.mmdb');
      if ($_GET['city'] == "") {
         $record = $reader->city($_SERVER["REMOTE_ADDR"]);
      } else {
         $record = $reader->city($_GET['city']);
      }
   }
   elseif ( isset($_GET['asn']) ) {
      $reader = new Reader('../geoip/GeoLite2-ASN.mmdb');
      if ( $_GET['asn'] == "") {
         $record = $reader->asn($_SERVER["REMOTE_ADDR"]);
      } else {
         $record = $reader->asn($_GET['asn']);
      }
   }
   header('Content-type: application/json');
   //if ( isset($_GET['city']) ) {
   //readfile("test2.json");
   //} else {
   echo json_encode($record);
   //}
   exit;
} else {
   header('Content-Type: text/plain');
   echo $_SERVER["REMOTE_ADDR"];
   exit;
}
?>