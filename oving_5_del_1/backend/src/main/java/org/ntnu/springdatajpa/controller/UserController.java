package org.ntnu.springdatajpa.controller;

import org.ntnu.springdatajpa.model.User;
import org.ntnu.springdatajpa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class UserController {
  private final UserService userService;
  boolean isLoggedIn = false;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  @CrossOrigin
  public ResponseEntity<?> registerUser(@RequestParam String username, @RequestParam String password) {
    System.out.println(username + password);
    if (userService.getUserRepository().findUserByUsername(username) != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
    }
    userService.addUser(new User(username, password));
    System.out.println("New user registered");
    if (!isLoggedIn) {
      isLoggedIn = true;
      return ResponseEntity.ok("User registered successfully.");
    }
    else {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already logged in");
    }
  }

  @PostMapping("/login")
  @CrossOrigin
  public ResponseEntity<?> loginUser(@RequestParam String username, @RequestParam String password) {
    User user = userService.getUserRepository().findUserByUsername(username);
    if (user == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username not found");
    }
    if (!isLoggedIn) {
      if(Objects.equals(password, user.getPassword())) {
        isLoggedIn = true;
        System.out.println("User logged in");
        return ResponseEntity.ok("OK");
      }
      else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong password");
      }
    }
    else {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already logged in");
    }
  }

  @PostMapping("/logout")
  @CrossOrigin
  public ResponseEntity<?> logout() {
    isLoggedIn = false;
    System.out.println("Logged out");
    return ResponseEntity.ok("Logged out");
  }
}
