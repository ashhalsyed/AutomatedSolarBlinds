#include <WiFi.h>
#include <HTTPClient.h>

#define ONBOARD_LED 2

const char* ssid = "****";
const char* password = "****";

// how motor queues requests
// updating app angle after limit switch calibration

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

const long HTTPtimeInterval = 1000;
unsigned long previousHTTPtime = 0;

const long delayedSweepFlagInterval = (3.8)*1000;
bool delayedSweepFlag = false;
unsigned long previousDelayedSweepFlagtime = 0;

const long getVoltageFlagInterval = (3.8/90)*1000;
bool getVoltageFlag = false;
unsigned long previousGetVoltageFlagTime = 0;
int voltageCounter = 0;

void loop() {

  if (delayedSweepFlag == true) {
    unsigned long currentDelayedSweepFlagtime = millis();
    if (currentDelayedSweepFlagtime - previousDelayedSweepFlagtime >= delayedSweepFlagInterval) {
      Serial.println("Motor Moving to 0");
      delayedSweepFlag = false;

      previousGetVoltageFlagTime = millis();
      getVoltageFlag = true;


      // previousDelayedSweepFlagtime = currentDelayedSweepFlagtime;
    }
  }

  if (getVoltageFlag == true) {
    unsigned long currentGetVoltageFlagTime = millis();
    if (currentGetVoltageFlagTime - previousGetVoltageFlagTime >= getVoltageFlagInterval) {

      if (voltageCounter <= 90) {
      Serial.print("Voltage at ");
      Serial.print(voltageCounter);
      Serial.print(" degrees is: ");
      Serial.println(random(0,30));
      // measured every 0.42 seconds
      voltageCounter=voltageCounter+1;
      }
      else {
        HTTPClient http;

        http.begin("https://automated-solar-blinds-default-rtdb.firebaseio.com/optimalAngle.json");  //Specify the URL
        http.addHeader("Content-Type", "application/json");

        int optimalAngle=random(0,91);
        // random number from 0 to 90
        int httpOptimalAngleResponseCode = http.PUT(String(optimalAngle));

        Serial.print("Updated server angle to ");
        Serial.println(optimalAngle);

        http.end();  //Free the resources

        voltageCounter=0;
        getVoltageFlag = false;
      }

      previousGetVoltageFlagTime = currentGetVoltageFlagTime;
    }
  }

  if (millis() - previousHTTPtime >= HTTPtimeInterval && getVoltageFlag == false) {
    if ((WiFi.status() == WL_CONNECTED)) {  //Check the current connection status
      HTTPClient http;

      http.begin("https://automated-solar-blinds-default-rtdb.firebaseio.com/optimalAngleFlag/FlagSet.json");  //Specify the URL
      int httpCode = http.GET();                                                                               //Make the request

      if (httpCode > 0) {  //Check for the returning code

        String payload = http.getString();
        // Serial.println(httpCode); //200 if successful

        Serial.print("Flag is: ");
        Serial.println(payload);

        if (payload == "true") {

          previousDelayedSweepFlagtime = millis();
          delayedSweepFlag = true;
          Serial.println("Motor Moving to 90");


          http.addHeader("Content-Type", "application/json");
          int httpFlagResponseCode = http.PUT("false");
          // change server flag back to false if it is true
          http.end();  //Free the resources

        }
      } else {
        Serial.println("Error on HTTP request");
      }

      http.end();  //Free the resources
    }

    previousHTTPtime = millis();
  }
}
