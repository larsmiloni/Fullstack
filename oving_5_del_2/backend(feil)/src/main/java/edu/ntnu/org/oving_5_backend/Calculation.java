package edu.ntnu.org.oving_5_backend;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Entity
public class Calculation {
  @jakarta.persistence.Id
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String expression;
  private String result;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  private LocalDateTime timestamp; // Legg til dette feltet

  public void setId(Long id) {
    this.id = id;
  }
  public Long getId() {
    return id;
  }
  public void setExpression(String expression) {
    this.expression = expression;
  }
  public void setResult(String result) {
    this.result = result;
  }
  public void setUser(User user) {
    this.user = user;
  }
  public String getExpression() {
    return expression;
  }
  public String getResult() {
    return result;
  }
  public User getUser() {
    return user;
  }
  public LocalDateTime getTimestamp() { // Legg til getter for timestamp
    return timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) { // Legg til setter for timestamp
    this.timestamp = timestamp;
  }
  // Getters og setters...
}