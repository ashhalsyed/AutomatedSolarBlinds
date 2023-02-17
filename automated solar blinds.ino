#include <WiFi.h>
#include <HTTPClient.h>

#define ONBOARD_LED 2

const char* ssid = "****";
const char* password = "****";

void setup() {
  pinMode(ONBOARD_LED, OUTPUT);

  Serial.begin(115200);
  delay(1000);

  WiFi.mode(WIFI_STA);  //Optional
  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }

  Serial.println("\nConnected to Blinds!\n");
  // Serial.print("Local ESP32 IP: ");
  // Serial.println(WiFi.localIP());
}

void loop() {
  if ((WiFi.status() == WL_CONNECTED)) {  //Check the current connection status
    HTTPClient http;

    http.begin("https://automated-solar-blinds-default-rtdb.firebaseio.com/angle.json");  //Specify the URL
    int httpCode = http.GET();                                                            //Make the request

    if (httpCode > 0) {  //Check for the returning code

      String payload = http.getString();
      // Serial.println(httpCode); //200 if successful

      Serial.print("The current angle is: ");
      Serial.println(payload);
    }

    else {
      Serial.println("Error on HTTP request");
    }

    http.end();  //Free the resources

    digitalWrite(ONBOARD_LED, HIGH);
    delay(500);
    digitalWrite(ONBOARD_LED, LOW);
  }

  delay(4500);
}