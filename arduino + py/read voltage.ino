// Solar panel is connected to GPIO 34 (Analog ADC1_CH6) 
const int voltPin = 34;

int voltage = 0;

void setup() {
  Serial.begin(115200);
  delay(1000);
}

void loop() {
  // Reading solar panel value
  voltage = analogRead(voltPin);
  // Serial.print("Voltage: ");
  Serial.println(voltage);

  delay(50);
}
