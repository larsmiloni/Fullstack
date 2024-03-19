package org.ntnu.jwt_test.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vi/greetings")
public class GreetingsController {

  @GetMapping
  public ResponseEntity<String> sayHello() {
    return ResponseEntity.ok("Hello fro API");
  }
  @GetMapping("/say-good-bye")
  public ResponseEntity<String> sayGoodBye() {
    return ResponseEntity.ok("Good bye and see you later");
  }
}
