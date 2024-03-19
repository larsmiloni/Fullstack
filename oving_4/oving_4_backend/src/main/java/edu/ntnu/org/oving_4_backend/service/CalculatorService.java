package edu.ntnu.org.oving_4_backend.service;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
  public String calculate(String equation) throws Exception {
    try {
      Expression expression = new ExpressionBuilder(equation).build();
      return String.valueOf(expression.evaluate());
    } catch (Exception e) {
      throw new Exception("Error evaluating the equation: " + e.getMessage());
    }
  }
}
