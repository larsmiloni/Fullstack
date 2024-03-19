package edu.ntnu.org.oving_5_backend.service;

import edu.ntnu.org.oving_5_backend.Calculation;
import edu.ntnu.org.oving_5_backend.CalculationRepository;
import edu.ntnu.org.oving_5_backend.User;
import edu.ntnu.org.oving_5_backend.UserRepository;
import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

  @Autowired
  private CalculationRepository calculationRepository;

  @Autowired
  private UserRepository userRepository;

  public Calculation saveCalculation(String equation, String username) throws Exception {
    User user = userRepository.findByUsername(username)
      .orElseThrow(() -> new Exception("User not found"));
    String result = calculate(equation);
    Calculation calculation = new Calculation();
    return calculationRepository.save(calculation);
  }

  // Metode for å hente de siste 10 beregningene for en bruker
  public List<Calculation> getRecentCalculations(String username) {
    User user = userRepository.findByUsername(username)
      .orElseThrow(() -> new IllegalArgumentException("User not found"));
    return calculationRepository.findTop10ByUserOrderByTimestampDesc(user);
  }
}
