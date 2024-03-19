package edu.ntnu.org.oving_4_backend.controller;

import edu.ntnu.org.oving_4_backend.service.CalculatorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
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
}

