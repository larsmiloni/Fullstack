package edu.ntnu.org.oving_5_backend;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalculationRepository extends JpaRepository<Calculation, Long> {
  List<Calculation> findTop10ByUserOrderByTimestampDesc(User user);
}

