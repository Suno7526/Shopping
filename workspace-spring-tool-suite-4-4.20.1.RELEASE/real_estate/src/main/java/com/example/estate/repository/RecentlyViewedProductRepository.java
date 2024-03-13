package com.example.estate.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.estate.entity.RecentlyViewedProduct;
import com.example.estate.entity.User;

public interface RecentlyViewedProductRepository extends JpaRepository<RecentlyViewedProduct, Long> {
    List<RecentlyViewedProduct> findTop5ByUserOrderByViewCodeDesc(User user);
}
