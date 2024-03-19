package edu.ntnu.org.oving_5_backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Entity
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String username;
  private String password;

  public User() {}
  public String getUsername() {
    return username;
  }
  public String getPassword() {
    return password;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public Long getId() {
    return id;
  }
}
