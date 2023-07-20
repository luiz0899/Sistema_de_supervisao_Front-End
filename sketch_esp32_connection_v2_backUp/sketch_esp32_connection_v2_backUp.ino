#include <WiFi.h>;
#include <HTTPClient.h>;
#include <ArduinoJson.h>;

#include <Ultrasonic.h>
Ultrasonic ultrassom(33, 34);


int analogValue;
const char* ssid = "nitro5";
const char* password = "nitro5luiz";
char jsonOutput[128];

unsigned long millisTarefa1 = millis();
double distancia;

bool bomba;
bool solenoide;
bool manualAcionamento;

int releBomba = 26;
int releSolenoide = 27;
int botaoSolenoide = 17;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  pinMode(releBomba, OUTPUT);
  pinMode(releSolenoide, OUTPUT);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
}

void loop() {
  
  GET();

  analogValue = analogRead(32);
  analogValue = map(analogValue, 0 , 4095, 0, 100);
  Serial.print("Potenciômetro = ");
  Serial.print(analogValue);
  Serial.println("cm");
  
  distancia = ultrassom.Ranging(CM);
  Serial.print("Distância = ");
  Serial.print(distancia);
  Serial.println("cm");
  
  if ((millis() - millisTarefa1) > 20000) {
     POST();
     millisTarefa1 = millis();
  }

  if(manualAcionamento){
    Serial.print("Bomba");
    Serial.println(!bomba);
     Serial.print("Solenoide");
    Serial.println(!solenoide);
    digitalWrite(releBomba,!bomba);
    digitalWrite(releSolenoide,!solenoide);
    Serial.print("Manual");
  }else{
    if(distancia > 15){
      digitalWrite(releBomba,LOW);
      Serial.print("Automatico Bomba ligada");
    }else if(distancia < 10){
      digitalWrite(releBomba,HIGH);
      Serial.print("Automatico Bomba desligada");
    }
    digitalWrite(releSolenoide,!digitalRead(botaoSolenoide));
  }

  delay(1000);

}//end void loop

void GET() {
  if (WiFi.status() == WL_CONNECTED) {
    long rnd = random(1, 10);
    HTTPClient client;

    client.begin("http://localhost:8080/operation_water_pump");
    int httpCode = client.GET();

    if (httpCode > 0) {
      String payload = client.getString();
      Serial.println("\nStatuscode: " + String(httpCode));
      Serial.println(payload);

      char json[500];
      payload.replace("", "");
      payload.replace("\n", "");
      payload.trim();
      payload.remove(0,1);
      payload.toCharArray(json, 500);

      StaticJsonDocument<200> doc;
      deserializeJson(doc, json);

      int id = doc["id"];
      boolean waterPump = doc["waterPump"];
      boolean solenoid = doc["solenoid"];
      boolean manual = doc["manual"];

      Serial.println(String(id) + " - " + String(waterPump) + " - " + String(solenoid) + " - " + String(manual) + "\n");

      client.end();
      bomba = waterPump;
      solenoide = solenoid;
      manualAcionamento = manual;
      if (manual != false) {
       // variavelSolenoid = solenoid; //Lógica se ligado e desligado ??????
       // variavelWaterPump = waterPump;
      }

      if (manual == true) {
       // logicaLigado;
      } else {
       // logicaDesligado;
      }
      
    } else {
      Serial.println("Error on HTTP request");
    }
  } else {
    Serial.print("Connection lost!");
  }
 }

//Requisição POST
 void POST() {
  
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient client;

    client.begin("http://localhost:8080/water_level");
    client.addHeader("Content-Type", "application/json");

    const size_t CAPACITY = JSON_OBJECT_SIZE(2);
    StaticJsonDocument<CAPACITY> doc;       

    JsonObject object = doc.to<JsonObject>();
    object["waterLevelReading"] = distancia;
    object["fluxostatoReading"] = analogValue;

    serializeJson(doc, jsonOutput);
    
    int httpCode = client.POST(String(jsonOutput));

    if (httpCode > 0) {
      String payload = client.getString();
      Serial.println("\nStatuscode: " + String(httpCode));
      Serial.println(payload);

      client.end();
      
    } else {
      Serial.println("Error on HTTP request");
    }
  } else {
    Serial.print("Connection lost!");
  }
 }
