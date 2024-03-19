package edu.ntnu.org.oving_5_backend.controller;

import edu.ntnu.org.oving_5_backend.Calculation;
import edu.ntnu.org.oving_5_backend.User;
import edu.ntnu.org.oving_5_backend.UserRepository;
import edu.ntnu.org.oving_5_backend.service.CalculatorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CalculatorController {

  private static final Logger logger = LoggerFactory.getLogger(CalculatorController.class);

  private final CalculatorService calculatorService;

  // Autowire the CalculatorService
  public CalculatorController(CalculatorService calculatorService) {
    this.calculatorService = calculatorService;
  }

  @GetMapping("/calculate")
  @CrossOrigin
  public Map<String, String> calculate(@RequestParam String equation) {
    logger.info("Received calculation request for equation: {}", equation);
    Map<String, String> response = new HashMap<>();
    try {
      String result = calculatorService.calculate(equation);
      logger.info("Calculation successful for equation: {}", equation);
      response.put("result", result);
    } catch (Exception e) {
      logger.error("Error evaluating the equation: {}", equation);
      response.put("error", e.getMessage());
    }
    return response;
  }

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/register")
  @CrossOrigin
  public ResponseEntity<?> registerUser(@RequestParam String username, @RequestParam String password) {

    User newUser = new User();

    System.out.println("User registerd!!!!, Username: " + username + ", Password: " + password);
    return ResponseEntity.ok("User registered successfully.");
  }

  @PostMapping("/login")
  @CrossOrigin
  public ResponseEntity<?> loginUser(@RequestParam String username, @RequestParam String password) {

    System.out.println("User logged in!!!!, Username: " + username + ", Password: " + password);
    return ResponseEntity.ok("User login successfully.");
  }
}

